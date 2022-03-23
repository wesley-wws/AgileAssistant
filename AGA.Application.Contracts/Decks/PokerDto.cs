using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Application.Contracts.Decks;

public record PokerDto
{
    public Guid Id { get; init; }

    public string Value { get; init; } = null!;

}
