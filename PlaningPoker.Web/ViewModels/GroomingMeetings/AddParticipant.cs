using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PlaningPoker.Web.ViewModels.GroomingMeetings
{
    public record AddParticipant
    {
        [Required]
        public string MeetingId { get; init; }

        [Required]
        public string UserName { get; init; }
    }
}
