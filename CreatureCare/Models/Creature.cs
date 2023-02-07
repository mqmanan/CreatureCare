using System;
using System.ComponentModel.DataAnnotations;

namespace CreatureCare.Models
{
    public class Creature
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string Origin { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public DateTime Birthdate { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public string ImageLocation { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
