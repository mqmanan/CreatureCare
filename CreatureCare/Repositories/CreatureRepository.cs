using System;
using System.Collections.Generic;
using System.Linq;
using Azure;
using CreatureCare.Models;
using CreatureCare.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace CreatureCare.Repositories
{
    public class CreatureRepository : BaseRepository, ICreatureRepository
    {
        //ask instructor to explain this line
        public CreatureRepository(IConfiguration configuration) : base(configuration) { }

        public List<Creature> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id 'CreatureId', c.UserProfileId 'UPId', c.Name, c.Type, c.Origin, c.Gender, c.Birthdate, UserProfile.FullName, UserProfile.Email, UserProfile.Telephone, c.ImageLocation, c.Description
                        FROM Creature c
                        JOIN UserProfile ON UserProfile.Id = c.UserProfileId
                        WHERE IsActive = 1
                        ORDER BY C.Name;";

                    var reader = cmd.ExecuteReader();

                    var creatures = new List<Creature>();

                    while (reader.Read())
                    {
                        creatures.Add(new Creature()
                        {
                            Id = DbUtils.GetInt(reader, "CreatureId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Type = DbUtils.GetString(reader, "Type"),
                            Origin = DbUtils.GetString(reader, "Origin"),
                            Gender = DbUtils.GetString(reader, "Gender"),
                            Birthdate = DbUtils.GetString(reader, "Birthdate"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            Description = DbUtils.GetString(reader, "Description"),
                            User = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UPId"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                Telephone = DbUtils.GetString(reader, "Telephone"),
                            },
                        });
                    }
                    return creatures;
                }
            }
        }

        public void Add(Creature creature)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Creature (
                            Name, Type, Origin, Gender, Birthdate, 
                            ImageLocation, Description, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Name, @Type, @Origin, @Gender, @Birthdate, 
                            @ImageLocation, @Description, @UserProfileId)";

                    DbUtils.AddParameter(cmd, "@Name", creature.Name);
                    DbUtils.AddParameter(cmd, "@Type", creature.Type);
                    DbUtils.AddParameter(cmd, "@Origin", creature.Origin);
                    DbUtils.AddParameter(cmd, "@Gender", creature.Gender);
                    DbUtils.AddParameter(cmd, "@Birthdate", creature.Birthdate);
                    DbUtils.AddParameter(cmd, "@ImageLocation", creature.ImageLocation);
                    DbUtils.AddParameter(cmd, "@Description", creature.Description);
                    cmd.Parameters.AddWithValue("@UserProfileId", creature.UserProfileId);

                    creature.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Creature creature)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Creature
                            SET 
                                Name = @Name,
                                Type = @Type,
                                Origin = @Origin,
                                Gender = @Gender,
                                Birthdate = @Birthdate,
                                ImageLocation = @ImageLocation,
                                Description = @Description
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", creature.Name);
                    DbUtils.AddParameter(cmd, "@Type", creature.Type);
                    DbUtils.AddParameter(cmd, "@Origin", creature.Origin);
                    DbUtils.AddParameter(cmd, "@Gender", creature.Gender);
                    DbUtils.AddParameter(cmd, "@Birthdate", creature.Birthdate);
                    DbUtils.AddParameter(cmd, "@ImageLocation", creature.ImageLocation);
                    DbUtils.AddParameter(cmd, "@Description", creature.Description);
                    DbUtils.AddParameter(cmd, "@Id", creature.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Creature GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.UserProfileId 'UPId', c.Name, c.Type, c.Origin, c.Gender, c.Birthdate, UserProfile.FullName, UserProfile.Email, UserProfile.Telephone, c.ImageLocation, c.Description, c.IsActive
                        FROM Creature c
                        JOIN UserProfile ON UserProfile.Id = c.UserProfileId
                        WHERE c.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Creature creature = null;

                        if (reader.Read())
                        {
                            creature = new Creature()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Type = DbUtils.GetString(reader, "Type"),
                                Origin = DbUtils.GetString(reader, "Origin"),
                                Gender = DbUtils.GetString(reader, "Gender"),
                                Birthdate = DbUtils.GetString(reader, "Birthdate"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                Description = DbUtils.GetString(reader, "Description"),
                                IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                User = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UPId"),
                                    FullName = DbUtils.GetString(reader, "FullName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    Telephone = DbUtils.GetString(reader, "Telephone"),
                                },
                            };
                        }

                        return creature;
                    }
                }
            }
        }

        public Creature GetOneCreature(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.Name, c.Type, c.Origin, c.Gender, c.Birthdate, c.ImageLocation, c.UserProfileId, c.Description, c.IsActive
                        FROM Creature c
                        WHERE c.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Creature creature = null;

                        if (reader.Read())
                        {
                            creature = new Creature()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Type = DbUtils.GetString(reader, "Type"),
                                Origin = DbUtils.GetString(reader, "Origin"),
                                Gender = DbUtils.GetString(reader, "Gender"),
                                Birthdate = DbUtils.GetString(reader, "Birthdate"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                Description = DbUtils.GetString(reader, "Description"),
                                IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                            };
                        }

                        return creature;
                    }
                }
            }
        }

        public Appointment GetCreatureWithDoctors(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Distinct up.fullName, c.Name, c.Id
                        FROM Appointment a
                        LEFT JOIN UserProfile up ON a.UserProfileDocId = up.Id
                        LEFT JOIN Creature c ON a.CreatureId = c.Id
                        WHERE c.Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader()) // reads thru columns of data table
                    {

                        Appointment appointment = null;
                        while (reader.Read()) //reads thru rows of data table and pulls out different data
                        {
                            if (appointment == null)
                            {
                                appointment = new Appointment()
                                {
                                    Id = id,
                                    Creature = new Creature()
                                    {
                                        Id = DbUtils.GetInt(reader, "Id"),
                                        Name = DbUtils.GetString(reader, "Name"),
                                    },
                                    UserProfiles = new List<UserProfile>()
                                };
                            }

                            if (DbUtils.IsNotDbNull(reader, "Id")) // pull out userProfile data
                            {
                                appointment.UserProfiles.Add(new UserProfile()
                                {
                                    FullName = DbUtils.GetString(reader, "FullName"),
                                });
                            }
                        }

                        return appointment;
                    }
                }
            }
        }

        //public List<Appointment> GetCreatureWithAssociatedDoctors()
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                SELECT DISTINCT a.CreatureId, a.UserProfileDocId, up.Id, up.fullName, c.Name
        //                FROM Appointment a
        //                LEFT JOIN UserProfile up ON a.UserProfileDocId = up.Id
        //                LEFT JOIN Creature c ON a.CreatureId = c.Id
        //                WHERE c.Id=1 // EDIT THIS
        //            ";

        //            using (SqlDataReader reader = cmd.ExecuteReader())
        //            {

        //                var appointments = new List<Appointment>();
        //                while (reader.Read())
        //                {
        //                    var appointmentId = DbUtils.GetInt(reader, "appointmentId");

        //                    var existingAppointment = appointments.FirstOrDefault(a => a.Id == appointmentId);
        //                    if (existingAppointment == null)
        //                    {
        //                        existingVideo = new Video()
        //                        {
        //                            Id = videoId,
        //                            Title = DbUtils.GetString(reader, "Title"),
        //                            Description = DbUtils.GetString(reader, "Description"),
        //                            DateCreated = DbUtils.GetDateTime(reader, "VideoDateCreated"),
        //                            Url = DbUtils.GetString(reader, "Url"),
        //                            UserProfileId = DbUtils.GetInt(reader, "VideoUserProfileId"),
        //                            UserProfile = new UserProfile()
        //                            {
        //                                Id = DbUtils.GetInt(reader, "VideoUserProfileId"),
        //                                Name = DbUtils.GetString(reader, "Name"),
        //                                Email = DbUtils.GetString(reader, "Email"),
        //                                DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
        //                                ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl"),
        //                            },
        //                            Comments = new List<Comment>()
        //                        };

        //                        videos.Add(existingVideo);
        //                    }

        //                    if (DbUtils.IsNotDbNull(reader, "CommentId"))
        //                    {
        //                        existingVideo.Comments.Add(new Comment()
        //                        {
        //                            Id = DbUtils.GetInt(reader, "CommentId"),
        //                            Message = DbUtils.GetString(reader, "Message"),
        //                            VideoId = videoId,
        //                            UserProfileId = DbUtils.GetInt(reader, "CommentUserProfileId")
        //                        });
        //                    }
        //                }

        //                return videos;
        //            }
        //        }
        //    }
        //}


        public void Deactivate(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Creature
                        SET IsActive = 0 
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}