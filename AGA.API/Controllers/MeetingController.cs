using AGA.Application.Contracts.Meetings;
using AgileAssistant.Hubs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

namespace AGA.API.Controllers
{
    [Route("api/[controller]")]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ApiController]
    public class MeetingController : ControllerBase
    {
        private readonly IMeetingAppService _meetingAppService;
        private readonly IHubContext<MeetingHub, IMeetingHubClient> _meetingHubContext;

        public MeetingController(
            IMeetingAppService meetingAppService,
            IHubContext<MeetingHub, IMeetingHubClient> meetingHubContext)
        {
            _meetingAppService = meetingAppService;
            _meetingHubContext = meetingHubContext;
        }

        [HttpGet]
        [Route("api/[controller]s")]
        public async Task<ActionResult<List<MeetingDto>>> GetMeetings()
        {
            return await _meetingAppService.GetMeetingsAsync();
        }

        [HttpGet("{meetingId}")]
        public async Task<ActionResult<MeetingDto?>> FindMeeting(Guid meetingId)
        {
            return await _meetingAppService.FindMeetingAsync(meetingId);
        }

        [HttpPost("start")]
        public async Task<ActionResult<MeetingDto>> Start([FromBody] AddMeetingDto dto)
        {
            return await _meetingAppService.StartAsync(dto);
        }

        [HttpPost("{meetingId}/join/{userName}")]
        public async Task<ActionResult> Join(Guid meetingId, string userName)
        {
            await _meetingAppService.JoinAsync(meetingId, userName);
            await _meetingHubContext.AddParticipantAsync_BroadcastGroup(meetingId,userName);
            return Ok();
        }

        [HttpPost("{meetingId}/participant/selectPokers")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> SelectedPokers(SelectPokersDto dto)
        {
            await _meetingAppService.SelectPokersAsync(dto);
            await _meetingHubContext.SelectPokersAsync_BroadcastGroup(dto.MeetingId, dto.UserName, dto.SelectedPokerIds);
            return Ok();
        }

        [HttpGet("logs")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<string>>> GetRecentLogs()
        {
            return await _meetingAppService.GetRecentLogsAsync();
        }
    }
}
