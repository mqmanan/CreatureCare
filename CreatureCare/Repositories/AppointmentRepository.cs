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
        //ask instructor to explain this line
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
                            a.DateRequested, a.AmountDue, a.DateDue, a.PaidAmount, a.InvoiceSentOnDate
                        FROM Appointment a
                        LEFT JOIN UserProfile up ON up.Id = a.UserProfileDocId
                        LEFT JOIN Creature c ON c.Id = a.CreatureId;   
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
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "DocId"),
                                FullName = DbUtils.GetString(reader, "DocName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                Telephone = DbUtils.GetString(reader, "Telephone"),
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


    }
}
