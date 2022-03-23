using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;

namespace AGA.Domain.Meetings;

public class MeetingManager
{
    private readonly IMeetingRepository _meetingRepository;


    public MeetingManager(IMeetingRepository meetingRepository)
    {
        _meetingRepository = meetingRepository;
    }

    public Task<Meeting> StartOne(string topic, Guid pokerDeckId, CancellationToken token)
    {
        var meetingId = Guid.NewGuid();
        var meeting = new Meeting(meetingId, topic, pokerDeckId);
        return _meetingRepository.AddAsync(meeting, token);
    }
}

