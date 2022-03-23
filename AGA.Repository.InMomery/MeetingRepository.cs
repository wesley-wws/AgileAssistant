using AGA.Domain.Meetings;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Repository.InMomery;

public class MeetingRepository : IMeetingRepository
{
    private readonly ConcurrentDictionary<Guid, Meeting> _id_meeting_mapping = new ConcurrentDictionary<Guid, Meeting>();

    private readonly ConcurrentQueue<string> _clearMeetingLogQueue = new ConcurrentQueue<string>();

    // TODO: Move to Domain Event
    private readonly System.Timers.Timer _timer;

    public MeetingRepository()
    {
        _timer = new System.Timers.Timer(1000 * 60 * 5);
        _timer.Elapsed += (obj, Event) =>
        {
            foreach (var meeting in ClearInactivedMeetings(12))
            {
                _clearMeetingLogQueue.Enqueue($"{DateTime.Now} - {meeting} was cleared.");
                while (_clearMeetingLogQueue.Count > 30)
                {
                    _clearMeetingLogQueue.TryDequeue(out string _);
                }
            };
        };
        _timer.AutoReset = true;
        _timer.Start();
    }

    public Task<List<Meeting>> GetAllAsync(CancellationToken token = default)
    {
        ClearInactivedMeetings(12);
        return Task.FromResult(_id_meeting_mapping.Values.ToList());
    }


    public Task<Meeting?> FindAsync(Guid id, CancellationToken token = default)
    {
        _id_meeting_mapping.TryGetValue(id, out Meeting? result);
        return Task.FromResult(result);
    }

    public Task<Meeting> AddAsync(Meeting meeting, CancellationToken token = default)
    {
        var retryCount = 5;
        for (int i = 0; i < retryCount; i++)
        {
            token.ThrowIfCancellationRequested();

            if (_id_meeting_mapping.TryAdd(meeting.Id, meeting))
            {
                return Task.FromResult(meeting);
            }
        }

        //TODO: throw new meeting start fail exception.
        throw new Exception();
    }

    public Task RemoveAsync(Guid id, CancellationToken token = default)
    {
        _id_meeting_mapping.TryRemove(id, out _);
        return Task.CompletedTask;
    }

    public Task<List<string>> GetClearMeetingLogsAsync(CancellationToken token = default)
    {
        return Task.FromResult(_clearMeetingLogQueue.ToList());
    }

    private List<Meeting> ClearInactivedMeetings(int idleHours)
    {
        var clearedMeetings = new List<Meeting>();
        foreach (var meetingId in _id_meeting_mapping.Keys.ToList())
        {
            if (!_id_meeting_mapping.TryGetValue(meetingId, out Meeting? meeting) ||
                meeting.IsParticipantExists() ||
                !meeting.IsExpired(idleHours))
            {
                continue;
            }

            if (_id_meeting_mapping.TryRemove(meetingId, out _))
            {
                clearedMeetings.Add(meeting);
            }
        }
        return clearedMeetings;
    }
}
