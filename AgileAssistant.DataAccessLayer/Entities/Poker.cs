using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgileAssistant.DataAccessLayer.Entities
{
    public class Poker : BaseEntity<Guid>
    {
        public Guid? PokerDeckId { get; set; }

        public string Value { get; set; }
    }
}
