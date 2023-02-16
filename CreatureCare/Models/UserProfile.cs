using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CreatureCare.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Telephone { get; set; }

        public string ImageLocation { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        public int SpecialtyId { get; set; }
        public Specialty Specialty { get; set; }

        public int UserTypeId { get; set; }
        public UserType UserType { get; set; }

        public Creature Creature { get; set; }
        public List<Creature> Creatures { get; set; }
    }
}
