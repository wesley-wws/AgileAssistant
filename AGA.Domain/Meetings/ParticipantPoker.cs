using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Domain.Meetings;
public class ParticipantPoker : AbstractEntity<Guid>
{
    public string ParticipantName { get; init; }

    public Guid PokerId { get; init; }

    public string OriginalPokerValue { get; init; }

    public string PokerValue { get; set; }

    public bool IsPokerValueChanged => PokerValue == OriginalPokerValue;

    public ParticipantPoker(string participantName, Guid pokerId, string pokerValue, Guid? id)
        : base(id ?? Guid.NewGuid())
    {
        ParticipantName = participantName;
        PokerId = pokerId;
        PokerValue = pokerValue;
        OriginalPokerValue = pokerValue;
    }


}
