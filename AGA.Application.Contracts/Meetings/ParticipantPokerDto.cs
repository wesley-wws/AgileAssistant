using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Application.Contracts.Meetings;

public record ParticipantPokerDto
{
    public Guid Id { get; set; }

    public string ParticipantName { get; init; } = null!;

    public Guid PokerId { get; init; }

    public string OriginalPokerValue { get; init; } = null!;

    public string PokerValue { get; set; } = null!;
}
