using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Application.Contracts.Meetings;

public record MeetingDto
{
    public Guid Id { get; init; }

    public string Topic { get; init; } = null!;

    public Guid PokerDeckId { get; init; }

    public List<ParticipantDto> Participants { get; init; } = null!;
}
