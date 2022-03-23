using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Application.Contracts.Meetings;

public record AddMeetingDto
{
    public string Topic { get; init; } = null!;

    public Guid PokerDeckId { get; init; }
}
