using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Domain.Meetings;

public class Participant : AbstractEntity<string, int>
{
    /// <summary>
    /// Logic Id
    /// </summary>
    public string Name => Id;

    public Guid DeckId { get; set; }

    public ParticipantPoker? SelectedPoker
    {
        get => SelectedPokers.FirstOrDefault();
        set
        {
            SelectedPokers = new List<ParticipantPoker>();
            if (value != null)
            {
                SelectedPokers.Add(value);
            }
        }
    }

    public List<ParticipantPoker> SelectedPokers { get; set; } = new List<ParticipantPoker>();

    public bool IsPokerShown { get; set; }

    public Participant(string name,Guid deckId)
        : base(name)
    {
        DeckId = deckId;
    }
}
