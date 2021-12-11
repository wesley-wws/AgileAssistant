using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PlaningPoker.Web.ViewModels.GroomingMeetings
{
    public record AddGroomingMeeting
    {
        [Required]
        public string Topic { get; init; }
    }
}
