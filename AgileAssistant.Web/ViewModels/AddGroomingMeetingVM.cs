using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AgileAssistant.Web.ViewModels
{
    public record AddGroomingMeetingVM
    {
        [Required]
        public string Topic { get; init; }

        [Required]
        public Guid PokerDeckKey { get; init; }
    }
}
