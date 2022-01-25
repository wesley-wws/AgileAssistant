using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AgileAssistant.Web.ViewModels.GroomingMeetings
{
    public record AddGroomingMeetingVM
    {
        [Required]
        public string Topic { get; init; }
    }
}
