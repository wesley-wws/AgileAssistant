using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaningPoker.Meeting
{
    public class GroomingParticipant
    {
        public string Name { get; init; }

        public string SelectedPokerKey { get; set; }

        public GroomingParticipant(string name)
        {
            Name = name;
        }
    }
}
