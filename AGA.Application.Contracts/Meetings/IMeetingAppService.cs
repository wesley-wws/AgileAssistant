using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Application.Contracts.Meetings;

public interface IMeetingAppService
{
    Task<List<MeetingDto>> GetMeetingsAsync(CancellationToken token = default);

    Task<MeetingDto?> FindMeetingAsync(Guid meetingId, CancellationToken token = default);

    Task<MeetingDto> StartAsync(AddMeetingDto dto, CancellationToken token = default);

    Task JoinAsync(Guid meetingId, string userName, CancellationToken token = default);

    Task SelectPokersAsync(SelectPokersDto dto, CancellationToken token = default);

    Task<List<string>> GetRecentLogsAsync();
}
