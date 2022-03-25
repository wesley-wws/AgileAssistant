using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Application.Contracts.Decks;

public interface IDeckAppService
{
    Task<List<DeckDto>> GetAllDecksAsync(CancellationToken cancellationToken);

    Task<DeckDto?> FindDeckAsync(Guid id, CancellationToken cancellationToken);
}
