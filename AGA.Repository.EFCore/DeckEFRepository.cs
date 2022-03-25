using AGA.Domain.Decks;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Repository.EFCore;

public class DeckEFRepository : IDeckRepository
{
    private readonly AgileAssistantDBContext _dBContext;

    public DeckEFRepository(AgileAssistantDBContext dBContext)
    {
        _dBContext = dBContext;
    }

    public Task<List<Deck>> GetAllAsync(CancellationToken cancellationToken)
    {
        return _dBContext.Decks.Include(d => d.Pokers).ToListAsync(cancellationToken);
    }

    public Task<Deck?> FindAsync(Guid id, CancellationToken cancellationToken)
    {
        return _dBContext.Decks.Include(d => d.Pokers).FirstOrDefaultAsync(d => d.Id == id, cancellationToken);
    }
}
