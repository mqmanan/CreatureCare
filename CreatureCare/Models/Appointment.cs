﻿using System.ComponentModel.DataAnnotations;

namespace CreatureCare.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required]
        public string DateRequested { get; set; }

        public decimal ?AmountDue{ get; set; }

        public string ?DateDue { get; set; }

        public decimal ?PaidAmount { get; set; }

        public string ?InvoiceSentOnDate { get; set; }

        [Required]
        public int UserProfileDocId { get; set; }
        public UserProfile UserProfile { get; set; }

        [Required]
        public int CreatureId { get; set; }
        public Creature Creature { get; set; }
    }
}
