using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Application.Contracts.Meetings;

public record ParticipantDto
{
    public string Name { get; init; } = null!;

    public bool IsPokerShown { get; set; }

    public List<Guid> SelectedPokerIds { get; set; } = new List<Guid>();

    public string? SelectedPokerId { get; set; }
}
