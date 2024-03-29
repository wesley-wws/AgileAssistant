﻿using AGA.Application.Contracts.Meetings;
using AGA.Domain.Meetings;
using AGA.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Application;

public class MeetingAppService : IMeetingAppService
{
    private readonly IMeetingRepository _meetingRepository;

    public MeetingAppService(
        IMeetingRepository meetingRepository
        )
    {
        _meetingRepository = meetingRepository;
    }


    public async Task<List<MeetingDto>> GetMeetingsAsync(CancellationToken token = default)
    {
        var meetings = await _meetingRepository.GetAllAsync(token);
        return ObjectMapper.Map<List<MeetingDto>>(meetings);
    }

    public async Task<MeetingDto?> FindMeetingAsync(Guid meetingId, CancellationToken token = default)
    {
        var meeting = await _meetingRepository.FindAsync(meetingId, token);
        if (meeting is null)
        {
            return null;
        }

        return ObjectMapper.Map<MeetingDto>(meeting);
    }

    public async Task<MeetingDto> StartAsync(AddMeetingDto dto, CancellationToken token = default)
    {
        var meeting = new Meeting(Guid.NewGuid(), dto.Topic, dto.DeckId);
        meeting = await _meetingRepository.AddAsync(meeting, token);
        return ObjectMapper.Map<MeetingDto>(meeting);
    }


    public async Task<ParticipantDto> JoinAsync(Guid meetingId, string userName, CancellationToken token = default)
    {
        var meeting = await _meetingRepository.FindAsync(meetingId, token);
        if (meeting is null)
        {
            throw new ArgumentException($"Can't find meeting {meetingId}", nameof(meetingId));
        }

        var participant = meeting.Join(userName);
        return ObjectMapper.Map<ParticipantDto>(participant);
    }


    public async Task SelectPokersAsync(SelectPokersDto dto, CancellationToken token = default)
    {
        var meeting = await _meetingRepository.FindAsync(dto.MeetingId, token);
        if (meeting is null)
        {
            throw new DominEntityNotFoundException(nameof(meeting));
        }
        
        var participantPokers = ObjectMapper.Map<List<ParticipantPoker>>(dto.SelectedPokers);
        meeting.UpdateParticipantPokers(dto.UserName, participantPokers);
    }


    public Task<List<string>> GetRecentLogsAsync()
    {
        return _meetingRepository.GetClearMeetingLogsAsync();
    }
}
