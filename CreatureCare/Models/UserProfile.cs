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
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Telephone { get; set; }

        //[Required]
        //public string ImageLocation { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        [Required]
        public int SpecialtyId { get; set; }

        //public UserType UserType { get; set; }

    }
}
