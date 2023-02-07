using System.Collections.Generic;
using CreatureCare.Models;
using CreatureCare.Utils;
using Microsoft.Extensions.Configuration;

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
                        SELECT c.Id 'CreatureId', c.UserProfileId 'UPId', c.Name, c.Type, c.Origin, c.Gender, c.Birthdate, UserProfile.FirstName 'UPFirstName', UserProfile.LastName 'UPLastName', UserProfile.Email, UserProfile.Telephone, c.ImageLocation, c.Description
                        FROM Creature c
                        JOIN UserProfile ON UserProfile.Id = c.UserProfileId;";

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
                            Birthdate = DbUtils.GetDateTime(reader, "Birthdate"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            Description = DbUtils.GetString(reader, "UPLastName"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UPId"),
                                FirstName = DbUtils.GetString(reader, "UPFirstName"),
                                LastName = DbUtils.GetString(reader, "UPLastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                Telephone = DbUtils.GetString(reader, "Telephone"),
                            },
                        });
                    }
                    return creatures;
                }
            }
        }



    }
}
