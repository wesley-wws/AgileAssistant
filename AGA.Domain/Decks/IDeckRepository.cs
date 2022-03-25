using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Domain.Decks;

public interface IDeckRepository
{
    Task<List<Deck>> GetAllAsync(CancellationToken cancellationToken);

    Task<Deck?> FindAsync(Guid id, CancellationToken cancellationToken);
}
