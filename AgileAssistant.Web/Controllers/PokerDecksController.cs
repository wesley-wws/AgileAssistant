using AgileAssistant.DataAccessLayer;
using AgileAssistant.Meeting;
using AgileAssistant.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;

namespace AgileAssistant.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokerDecksController : ControllerBase
    {
        private readonly AgileAssistantDBContext _dbContext;

        public PokerDecksController(AgileAssistantDBContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet]
        [Consumes(MediaTypeNames.Application.Json)]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IEnumerable<PokerDeck> GetPokerDecks()
        {
            return _dbContext.PokerDecks.Include(pd => pd.Pokers).Select(pd => new PokerDeck(pd.Id, pd.Description, pd.Pokers.Select(p => new Poker(p.Value)).ToList()));
        }
    }
}
