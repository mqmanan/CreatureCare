using System.Security.Claims;
using CreatureCare.Models;
using CreatureCare.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CreatureCare.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly ICreatureRepository _creatureRepository;

        public UserProfileController(
            IUserProfileRepository userProfileRepository,
            IAppointmentRepository appointmentRepository,
            ICreatureRepository creatureRepository)
        {
            _userProfileRepository = userProfileRepository;
            _appointmentRepository = appointmentRepository;
            _creatureRepository = creatureRepository;

        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("Me")]
        public IActionResult Me()
        {
            var userProfile = GetCurrentUserProfile();
            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }

        [HttpGet ("GetStaff")]
        public IActionResult GetAllAdmin()
        {
            return Ok(_userProfileRepository.GetAllAdmin());
        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetAll()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Register(UserProfile userProfile)
        {
            // All newly registered users start out as a "user" user type (i.e. they are not admins)
            userProfile.UserTypeId = UserType.USER_TYPE_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetByFirebaseUserId), new { firebaseUserId = userProfile.FirebaseUserId }, userProfile);
        }

        [HttpGet("GetUserByIdWithUserType/{id}")]
        public IActionResult GetUserByIdWithUserType(int id)
        {
            return Ok(_userProfileRepository.GetUserByIdWithUserType(id));
        }

        [HttpGet("GetUserByIdWithCreatures")]
        public IActionResult GetUserByIdWithCreatures()
        {
            var currentUserProfile = GetCurrentUserProfile();            

            return Ok(_userProfileRepository.GetUserByIdWithCreatures(currentUserProfile.Id));
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
