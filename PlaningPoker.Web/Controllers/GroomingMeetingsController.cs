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
        private readonly IHubContext<GroomingHub> _groomingHubContext;

        public GroomingMeetingsController(GroomingMeetingManager meetingManager, IHubContext<GroomingHub> groomingHubContext)
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

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult AddGroomingMeeting(string id, string topic)
        {
            var isSucceed = _meetingManager.Add(new GroomingMeeting(id, topic));
            if (!isSucceed)
            {
                return BadRequest("Meeting exists!");
            }
            return Ok();
        }
    }
}
