using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Domain.Meetings;

public interface IMeetingRepository
{
    Task<List<Meeting>> GetAllAsync(CancellationToken token = default);

    Task<Meeting?> FindAsync(Guid id, CancellationToken token = default);

    Task<Meeting> AddAsync(Meeting meeting, CancellationToken token = default);

    Task RemoveAsync(Guid id, CancellationToken token = default);

    Task<List<string>> GetClearMeetingLogsAsync(CancellationToken token = default);
}
