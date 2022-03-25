using AGA.Application.Contracts.Decks;
using AGA.Domain.Decks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Application;

public class DeckAppService : IDeckAppService
{
    private readonly IDeckRepository _deckRepository;

    public DeckAppService(IDeckRepository deckRepository)
    {
        _deckRepository = deckRepository;
    }

    public async Task<List<DeckDto>> GetAllDecksAsync(CancellationToken cancellationToken)
    {
        var decks = await _deckRepository.GetAllAsync(cancellationToken);
        return ObjectMapper.Map<List<DeckDto>>(decks);
    }


    public async Task<DeckDto?> FindDeckAsync(Guid id, CancellationToken cancellationToken)
    {
        var deck = await _deckRepository.FindAsync(id, cancellationToken);
        if (deck == null)
        {
            return null;
        }
        return ObjectMapper.Map<DeckDto>(deck);
    }
}
