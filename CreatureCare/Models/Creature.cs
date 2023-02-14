using System;
using System.Collections.Generic;
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
        public string Birthdate { get; set; }

        public string ImageLocation { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }

        public int UserProfileId { get; set; }
        public UserProfile User { get; set; }
        public List<UserProfile> UserProfiles { get; set; }

        public Appointment Appointment { get; set; }
    }
}
