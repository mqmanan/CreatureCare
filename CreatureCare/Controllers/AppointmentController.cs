using System.Security.Claims;
using Azure;
using CreatureCare.Models;
using CreatureCare.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace CreatureCare.Controllers
{
    // [Authorize]
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

        //[HttpGet("{id}")]
        //public IActionResult Get(int id)
        //{
        //    var creature = _creatureRepository.GetById(id);
        //    if (creature == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(creature);
        //}

        //[HttpGet("edit/{id}")]
        //public IActionResult GetCreature(int id)
        //{
        //    var creature = _creatureRepository.GetOneCreature(id);
        //    if (creature == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(creature);
        //}

        // POST: new appointment info
        [HttpPost]
        public IActionResult Post(Appointment appointment)
        {
            // this will allow the server side to attach the current userProfile.Id to the appointment
            //var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value; //gets cookie data
            //var user = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);

            //creature.UserProfileId = user.Id;

            _appointmentRepository.Add(appointment);

            return CreatedAtAction("Get", new { id = appointment.Id }, appointment);
        }

        //[HttpPut("{id}/edit")]
        //public IActionResult Put(Creature creature)
        //{
        //    _creatureRepository.Update(creature);
        //    return Ok(creature);
        //}

        //[HttpPatch("{id}/deactivate")]
        //public IActionResult SoftDeleteCreature(int id)
        //{
        //    try
        //    {
        //        _creatureRepository.Deactivate(id);
        //    }
        //    catch
        //    {
        //        return BadRequest();
        //    }

        //    return Ok();
        //}

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
