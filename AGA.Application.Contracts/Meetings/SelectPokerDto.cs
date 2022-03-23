using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Application.Contracts.Meetings;

public record SelectPokersDto
{
    public Guid MeetingId { get; init; }

    public string UserName { get; init; } = null!;

    public Guid[] SelectedPokerIds { get; init; } = null!;
}
