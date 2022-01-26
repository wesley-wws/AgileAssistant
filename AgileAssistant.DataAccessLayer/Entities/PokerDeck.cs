using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgileAssistant.DataAccessLayer.Entities
{
    public class PokerDeck : BaseEntity<Guid>
    {
        public string Description { get; set; }

        public ICollection<Poker> Pokers { get; set; }
    }
}
