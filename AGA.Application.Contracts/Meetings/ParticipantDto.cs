using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Application.Contracts.Meetings;

public record ParticipantDto
{
    public string Name { get; init; } = null!;

    public Guid DeckId { get; set; }

    public bool IsPokerShown { get; set; }

    public List<ParticipantPokerDto> SelectedPokers { get; set; } = new List<ParticipantPokerDto>();

    public ParticipantPokerDto? SelectedPoker { get; set; }
}
