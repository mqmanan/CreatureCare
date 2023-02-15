using CreatureCare.Models;
using System.Collections.Generic;

namespace CreatureCare.Repositories
{
    public interface IAppointmentRepository
    {
        List<Appointment> GetAll();
        void Add(Appointment appointment);
        List<Appointment> Search(string criterion, bool sortDescending);


    }
}
