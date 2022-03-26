using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Application.Contracts.Meetings;
public record SelectPokersDto
{
    public Guid MeetingId { get; set; }

    public string UserName { get; set; } = null!;

    public ParticipantPokerDto[] SelectedPokers { get; set; } = null!;
}
