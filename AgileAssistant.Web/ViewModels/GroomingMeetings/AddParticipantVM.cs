using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AgileAssistant.Web.ViewModels.GroomingMeetings
{
    public record AddParticipantVM
    {
        [Required]
        public string MeetingId { get; init; }

        [Required]
        public string UserName { get; init; }
    }
}
