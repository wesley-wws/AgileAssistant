using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json.Linq;
using AgileAssistant.Hubs;
using AgileAssistant.Meeting;
using AgileAssistant.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AgileAssistant.DataAccessLayer;
using Microsoft.EntityFrameworkCore;

namespace AgileAssistant.Web.Controllers
{
    [Route("api/[controller]")]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ApiController]
    public class GroomingMeetingsController : ControllerBase
    {
        private readonly GroomingMeetingManager _meetingManager;
        private readonly IHubContext<GroomingHub, IGroomingHubClient> _groomingHubContext;
        private readonly AgileAssistantDBContext _dbContext;

        public GroomingMeetingsController(
            GroomingMeetingManager meetingManager, 
            IHubContext<GroomingHub, IGroomingHubClient> groomingHubContext, 
            AgileAssistantDBContext dbContext)
        {
            _meetingManager = meetingManager;
            _groomingHubContext = groomingHubContext;
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<GroomingMeeting> GetGroomingMeetings()
        {
            return _meetingManager.All();
        }

        [HttpGet("{meetingId}")]
        public GroomingMeeting GetGroomingMeeting(string meetingId)
        {
            return _meetingManager.Get(meetingId);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult AddGroomingMeeting([FromBody] AddGroomingMeetingVM parameter)
        {
            // TODO fix it
            var pokerDeck = _dbContext.PokerDecks.Include(pd => pd.Pokers).ToList().Select(pd=>new PokerDeck(pd.Id,pokers: pd.Pokers.Select(p => new Poker(p.Value)).ToList())
            {
                 Description=pd.Description,
            }).FirstOrDefault(pd => pd.Key == parameter.PokerDeckKey);

            var meeting = _meetingManager.StartOne(parameter.Topic, pokerDeck);
            return Ok(meeting);
        }

        [HttpPost("{meetingId}/join/{userName}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult AddParticipant(string meetingId, string userName)
        {
            var meeting = _meetingManager.Get(meetingId);
            if (meeting == null)
            {
                return BadRequest("The meeting does not exist!");
            }

            var isSucceed = meeting.Join(userName);
            if (isSucceed)
            {
                _groomingHubContext.AddParticipant_BroadcastGroup(meetingId, userName);
            }

            return Ok();
        }

        [HttpPost("{meetingId}/participants/{userName}/selectedPoker/{selectedPokerKey}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult UpdateSelectedPoker(string meetingId, string userName, string selectedPokerKey)
        {
            var meeting = _meetingManager.Get(meetingId);
            if (meeting == null)
            {
                return BadRequest("The meeting does not exist!");
            }

            var isSucceed = meeting.UpdateParticipantPoker(userName, selectedPokerKey);
            if (!isSucceed)
            {
                return BadRequest("The user does not exist!");
            }

            _groomingHubContext.SelectPoker_BroadcastGroup(meetingId, userName, selectedPokerKey);

            return Ok();
        }

        [HttpPost("{meetingId}/participants/{userName}/selectedPokers")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult UpdateSelectedPokers(string meetingId, string userName, [FromBody]string[] selectedPokerKeys)
        {
            var meeting = _meetingManager.Get(meetingId);
            if (meeting == null)
            {
                return BadRequest("The meeting does not exist!");
            }

            var isSucceed = meeting.UpdateParticipantPokers(userName, selectedPokerKeys);
            if (!isSucceed)
            {
                return BadRequest("The user does not exist!");
            }

            _groomingHubContext.SelectPokers_BroadcastGroup(meetingId, userName, selectedPokerKeys);

            return Ok();
        }
    }
}
