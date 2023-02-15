using Microsoft.Extensions.Configuration;
using CreatureCare.Models;
using CreatureCare.Utils;
using System.Collections.Generic;

namespace CreatureCare.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        //ask instructor to explain this line
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  up.Id 'UserId', up.FirebaseUserId, up.FullName,up.Email, up.Address, up.Telephone, up.ImageLocation, 
                            up.UserTypeId, ut.Id 'TypeId', up.DateCreated, ut.Name
                        FROM UserProfile up
                        LEFT JOIN UserType ut ON up.UserTypeId = ut.Id
                        WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FullName = DbUtils.GetString(reader, "FullName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Address = DbUtils.GetString(reader, "Address"),
                            Telephone = DbUtils.GetString(reader, "Telephone"),
                            ImageLocation= DbUtils.GetString(reader, "ImageLocation"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "TypeId"),
                                Name = DbUtils.GetString(reader, "Name")
                            }
                        };
                    }

                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FullName, Email, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @Name, @Email, @UserTypeId)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Name", userProfile.FullName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public UserProfile GetUserByIdWithUserType(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id 'UserId', up.FullName, up.Email, up.Address, up.Telephone, up.ImageLocation, up.DateCreated, up.UserTypeId 'TypeId', up.SpecialtyId 'SpecialtyId', c.Name 'CName', c.Type 'CType', c.Origin 'COrigin', c.Gender, c.Birthdate 'CDOB', c.ImageLocation 'CImage', c.Description
                        FROM UserProfile up
                        JOIN UserType ut ON up.UserTypeId = ut.Id
                        LEFT JOIN Specialty s ON up.SpecialtyId = s.Id
                        LEFT JOIN Creature c ON up.Id = c.UserProfileId
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = id,
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FullName = DbUtils.GetString(reader, "FirstName"),
                            Email = DbUtils.GetString(reader, "DisplayName"),
                            Address = DbUtils.GetString(reader, "Email"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "TypeId"),
                                Name = DbUtils.GetString(reader, "Name"),
                            },
                            Specialty = new Specialty()
                            {
                                Id = DbUtils.GetInt(reader, "SpecialtyId"),
                                Name = DbUtils.GetString(reader, "Name"),
                            },
                            Creature = new Creature()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                Name = DbUtils.GetString(reader, "CName"),
                                Type= DbUtils.GetString(reader, "CType"),
                                Origin = DbUtils.GetString(reader, "COrigin"),
                                Gender = DbUtils.GetString(reader, "Gender"),
                                Birthdate = DbUtils.GetString(reader, "CDOB"),
                                ImageLocation = DbUtils.GetString(reader, "CImage"),
                                Description = DbUtils.GetString(reader, "Description"),
                            }

                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public List<UserProfile> GetAllAdmin()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id 'UserId', up.FullName, up.Email, up.Address, up.Telephone, up.ImageLocation, up.DateCreated, up.UserTypeId 'TypeId'
                        FROM UserProfile up
                        LEFT JOIN Specialty s ON up.SpecialtyId = s.Id
                        WHERE up.UserTypeId = 1
                        ORDER BY up.FullName
                    ";

                    List<UserProfile> profiles = new List<UserProfile>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        UserProfile profile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FullName = DbUtils.GetString(reader, "FirstName"),
                            Email = DbUtils.GetString(reader, "DisplayName"),
                            Address = DbUtils.GetString(reader, "Email"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "TypeId"),
                                Name = DbUtils.GetString(reader, "Name"),
                            }
                        };
                               
                        profiles.Add(profile);
                    }
                    reader.Close();

                    return profiles;
                }
            }
        }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id 'UserId', up.FullName, up.Email, up.Address, up.Telephone, up.ImageLocation, up.DateCreated
                        FROM UserProfile up
                        LEFT JOIN Specialty s ON up.SpecialtyId = s.Id
                        ORDER BY up.FullName
                    ";

                    List<UserProfile> profiles = new List<UserProfile>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        UserProfile profile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            FullName = DbUtils.GetString(reader, "FullName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Address = DbUtils.GetString(reader, "Address"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                        };
                        profiles.Add(profile);
                    }
                    reader.Close();

                    return profiles;
                }
            }
        }


    }
}
