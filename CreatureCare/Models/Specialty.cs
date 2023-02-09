using System.ComponentModel.DataAnnotations;

namespace CreatureCare.Models
{
    public class Specialty
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
    }
}