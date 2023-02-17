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
    public class CreatureController : ControllerBase
    {
        private readonly ICreatureRepository _creatureRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IAppointmentRepository _appointmentRepository;

        public CreatureController(
            ICreatureRepository creatureRepository,
            IUserProfileRepository userProfileRepository,
            IAppointmentRepository appointmentRepository)
        {
            _creatureRepository = creatureRepository;
            _userProfileRepository = userProfileRepository;
            _appointmentRepository = appointmentRepository;
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
            return Ok(_creatureRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var creature = _creatureRepository.GetById(id);
            if (creature == null)
            {
                return NotFound();
            }
            return Ok(creature);
        }

        [HttpGet("edit/{id}")]
        public IActionResult GetCreature(int id)
        {
            var creature = _creatureRepository.GetOneCreature(id);
            if (creature == null)
            {
                return NotFound();
            }
            return Ok(creature);
        }

        [HttpGet("CreatureWithDoctors/{id}")]
        public IActionResult GetCreatureDoctors(int id)
        {
            var doctors = _creatureRepository.GetCreatureWithDoctors(id);
            return Ok(doctors);
        }

        // POST: new creature info
        [HttpPost]
        public IActionResult Post(Creature creature)
        {
            // var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value; //gets cookie data
            // var user = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);

           // creature.UserProfileId = user.Id;

            _creatureRepository.Add(creature);

            return CreatedAtAction(nameof(Get), new { id = creature.Id }, creature);
         }

        [HttpPut("{id}/edit")]
        public IActionResult Put(Creature creature)
        {
            _creatureRepository.Update(creature);
            return Ok(creature);
        }

        [HttpPatch("{id}/deactivate")]
        public IActionResult SoftDeleteCreature(int id)
        {
            try
            {
                _creatureRepository.Deactivate(id);
            }
            catch
            { 
                return BadRequest();
            }

            return Ok();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
