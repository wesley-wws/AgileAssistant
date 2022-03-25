using AGA.Application.Contracts.Decks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;

namespace AgileAssistant.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public class DeckController : ControllerBase
    {
        private readonly IDeckAppService _deckAppService;

        public DeckController(IDeckAppService deckAppService)
        {
            _deckAppService = deckAppService;
        }


        [HttpGet]
        [Route("/api/[controller]s")]
        public async Task<ActionResult<List<DeckDto>>> GetPokerDecks(CancellationToken cancellationToken)
        {
            return await _deckAppService.GetAllDecksAsync(cancellationToken);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DeckDto>> GetPokerDeck(Guid id, CancellationToken cancellationToken)
        {
            return await _deckAppService.FindDeckAsync(id, cancellationToken);
        }
    }
}
