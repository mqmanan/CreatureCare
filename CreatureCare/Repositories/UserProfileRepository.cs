using Microsoft.Extensions.Configuration;
using CreatureCare.Models;
using CreatureCare.Utils;

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
                        SELECT  Id, FirebaseUserId, FirstName, LastName, Email, Address, Telephone, UserTypeId, SpecialtyId 
                        FROM UserProfile
                        WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Address = DbUtils.GetString(reader, "Address"),
                            Telephone = DbUtils.GetString(reader, "Telephone"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            //UserType = new UserType()
                            //{
                            //    Id = DbUtils.GetInt(reader, "UserTypeId"),
                            //    Name = DbUtils.GetString(reader, "UserTypeName"),
                            //}
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
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, Email, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @Name, @Email, @UserTypeId)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Name", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@Name", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


    }
}
