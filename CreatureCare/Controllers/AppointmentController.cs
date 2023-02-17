using System.Security.Claims;
using Azure;
using CreatureCare.Models;
using CreatureCare.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace CreatureCare.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly ICreatureRepository _creatureRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public AppointmentController(
            IAppointmentRepository appointmentRepository,
            ICreatureRepository creatureRepository,
            IUserProfileRepository userProfileRepository)
        {
            _appointmentRepository = appointmentRepository;
            _creatureRepository = creatureRepository;
            _userProfileRepository = userProfileRepository;
        }

        // GET: api/<CreatureController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile.UserType.Name != "Doctor")
            {
                return Unauthorized();
            }

            return Ok(_appointmentRepository.GetAll());
        }

        [HttpGet("search")]
        public IActionResult Search(string q, bool sortDesc)
        {
            return Ok(_appointmentRepository.Search(q, sortDesc));
        }

        // POST: new appointment info
        [HttpPost]
        public IActionResult Post(Appointment appointment)
        {
            // this will allow the server side to attach the current userProfile.Id to the appointment
            // var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value; //gets cookie data
            // var user = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);

            // appointment.UserProfileDocId = user.Id;

            _appointmentRepository.Add(appointment);

            return Ok(appointment);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
