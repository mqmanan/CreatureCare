using CreatureCare.Models;
using CreatureCare.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CreatureCare.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CreatureController : ControllerBase
    {
        private readonly ICreatureRepository _creatureRepository;

        public CreatureController(ICreatureRepository creatureRepository)
        {
           _creatureRepository = creatureRepository;
        }

        // GET: api/<CreatureController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_creatureRepository.GetAll());
        }
    }
}
