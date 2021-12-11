using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PlaningPoker.Hubs;
using PlaningPoker.MeetingManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

namespace PlaningPoker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroomingMeetingsController : ControllerBase
    {
        private readonly GroomingMeetingManager _meetingManager;
        private readonly IHubContext<GroomingHub,IGroomingHubClient> _groomingHubContext;

        public GroomingMeetingsController(GroomingMeetingManager meetingManager, IHubContext<GroomingHub,IGroomingHubClient> groomingHubContext)
        {
            _meetingManager = meetingManager;
            _groomingHubContext = groomingHubContext;
        }

        [HttpGet]
        [Consumes(MediaTypeNames.Application.Json)]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IEnumerable<GroomingMeeting> GetGroomingMeetings()
        {
            return _meetingManager.All();
        }

        [HttpGet("{meetingId}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public GroomingMeeting GetGroomingMeeting(string meetingId)
        {
            return _meetingManager.Get(meetingId);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult AddGroomingMeeting(string meetingId, string topic)
        {
            var isSucceed = _meetingManager.Add(new GroomingMeeting(meetingId, topic));
            if (!isSucceed)
            {
                return BadRequest("Meeting exists!");
            }
            return Ok();
        }

        [HttpGet("{meetingId}/join")]
        [Consumes(MediaTypeNames.Application.Json)]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult AddParticipant(string meetingId, string userName)
        {
            var meeting = _meetingManager.Get(meetingId);
            if (meeting == null)
            {
                return BadRequest("The meeting does not exist!");
            }

            var isSucceed = meeting.Join(userName);
            if (!isSucceed)
            {
                return BadRequest("The user already exist!");
            }

            _groomingHubContext.Clients.All.AddParticipant(userName, meetingId);

            return Ok();
        }
    }
}
