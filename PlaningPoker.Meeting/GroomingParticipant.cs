using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaningPoker.MeetingManager
{
    public class GroomingParticipant
    {
        public string Name { get; init; }

        public string SelectedPoker { get; set; }

        public GroomingParticipant(string name)
        {
            Name = name;
        }
    }
}
