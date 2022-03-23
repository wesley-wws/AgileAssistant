using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Domain.Decks;

public class Deck : AbstractEntity, IAggregateRoot
{
    private List<Poker> _pokers = new();

    public Guid Id { get; init; }

    public string Description { get; set; }

    public IReadOnlyList<Poker> Pokers => _pokers.OrderBy(p => p.Sequence).ToList().AsReadOnly();

    public Deck(Guid id, string description)
    {
        Id = id;
        Description = description;
    }

    public void SetPokers(List<Poker> pokers)
    {
        this._pokers = pokers;
    }
}
