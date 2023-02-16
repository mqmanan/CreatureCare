using System;
using System.Collections.Generic;
using Azure;
using CreatureCare.Models;
using CreatureCare.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace CreatureCare.Repositories
{
    public class AppointmentRepository : BaseRepository, IAppointmentRepository
    {

        public AppointmentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Appointment> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT  a.Id 'AId', a.CreatureId, c.Name 'CName', a.UserProfileDocId 'DocId', up.FullName 'DocName', up.Telephone, up.Email, 
                            up.ImageLocation, a.DateRequested, a.AmountDue, a.DateDue, a.PaidAmount, a.InvoiceSentOnDate
                        FROM Appointment a
                        LEFT JOIN UserProfile up ON up.Id = a.UserProfileDocId
                        LEFT JOIN Creature c ON c.Id = a.CreatureId
                        ORDER BY c.Name;
                    ";

                    var reader = cmd.ExecuteReader();

                    var appointments = new List<Appointment>();

                    while (reader.Read())
                    {
                        appointments.Add(new Appointment()
                        {
                            Id = DbUtils.GetInt(reader, "AId"),
                            CreatureId = DbUtils.GetInt(reader, "CreatureId"),
                            UserProfileDocId = DbUtils.GetInt(reader, "DocId"),
                            DateRequested = DbUtils.GetString(reader, "DateRequested"),
                            AmountDue = DbUtils.GetNullableInt(reader, "AmountDue"),
                            DateDue = DbUtils.GetString(reader, "DateDue"),
                            PaidAmount = DbUtils.GetNullableInt(reader, "PaidAmount"),
                            InvoiceSentOnDate = DbUtils.GetString(reader, "InvoiceSentOnDate"),
                            User = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "DocId"),
                                FullName = DbUtils.GetString(reader, "DocName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                Telephone = DbUtils.GetString(reader, "Telephone"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            },
                            Creature = new Creature()
                            {
                                Id = DbUtils.GetInt(reader, "CreatureId"),
                                Name = DbUtils.GetString(reader, "CName"),
                            },
                        });
                    }
                    return appointments;
                }
            }
        }

        public void Add(Appointment appointment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Appointment (
                            CreatureId, UserProfileDocId, DateRequested, AmountDue,
                            DateDue, PaidAmount, InvoiceSentOnDate)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @CreatureId, @UserProfileDocId, @DateRequested, @AmountDue, 
                            @DateDue, @PaidAmount, @InvoiceSentOnDate)";

                    DbUtils.AddParameter(cmd, "@CreatureId", appointment.CreatureId);
                    DbUtils.AddParameter(cmd, "@UserProfileDocId", appointment.UserProfileDocId);
                    DbUtils.AddParameter(cmd, "@DateRequested", appointment.DateRequested);
                    DbUtils.AddParameter(cmd, "@AmountDue", appointment.AmountDue);
                    DbUtils.AddParameter(cmd, "@DateDue", appointment.DateDue);
                    DbUtils.AddParameter(cmd, "@PaidAmount", appointment.PaidAmount);
                    DbUtils.AddParameter(cmd, "@InvoiceSentOnDate", appointment.InvoiceSentOnDate);

                    appointment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        // returns an empty array in swagger.. still needs work
        public List<Appointment> Search(string criterion, bool sortDescending)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = $@"
                        SELECT a.Id 'AId', a.DateRequested, up.Id 'UPId', up.FullName, c.Id 'CId', c.Name, up.ImageLocation 'UPImage', c.ImageLocation 'CImage'
                        FROM Appointment a
                        JOIN UserProfile up ON a.UserProfileDocId = up.Id
                        JOIN Creature c ON a.CreatureId = c.Id
                    ";

                    //! First space is important to keep from creating unintended words
                    if (criterion != null)
                    {
                        cmd.CommandText += " WHERE up.FullName LIKE @Criterion OR c.Name LIKE @Criterion OR a.DateRequested LIKE @Criterion";
                        DbUtils.AddParameter(cmd, "@Criterion", criterion);
                    }

                    if (sortDescending)
                    {
                        cmd.CommandText += " ORDER BY a.DateRequested DESC";
                    }
                    else
                    {
                        cmd.CommandText += " ORDER BY a.DateRequested";
                    }

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Appointment> appointment = new();

                        while (reader.Read())
                        {
                            appointment.Add(new Appointment()
                            {
                                Id = DbUtils.GetInt(reader, "AId"),
                                DateRequested = DbUtils.GetString(reader, "DateRequested"),
                                User = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UPId"),
                                    FullName = DbUtils.GetString(reader, "FullName"),
                                    ImageLocation = DbUtils.GetString(reader, "UPImage"),
                                },
                                Creature = new Creature()
                                {
                                    Id = DbUtils.GetInt(reader, "CId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    ImageLocation = DbUtils.GetString(reader, "CImage"),
                                }
                            });
                        }

                        return appointment;
                    }
                }
            }
        } 

      



    }
}
