using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgileAssistant.Meeting
{
    public class PokerDeck
    {
        private readonly List<Poker> _pokers;


        public Guid Key { get; init; }

        public string Description { get; set; }

        public IReadOnlyCollection<Poker> Pokers => _pokers.AsReadOnly();


        public PokerDeck(Guid key, string description = null, IEnumerable<Poker> pokers = null)
        {
            Key = key;
            Description = description ?? string.Empty;
            _pokers = pokers?.ToList() ?? new List<Poker>();
        }


        public void Add(Poker poker)
        {
            if (poker is null)
            {
                throw new ArgumentNullException(nameof(poker));
            }

            _pokers.Add(poker);
        }
    }
}
