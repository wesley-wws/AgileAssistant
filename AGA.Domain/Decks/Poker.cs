﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Domain.Decks;

public class Poker : AbstractEntity<Guid, int>
{
    public Guid DeckId { get; private set; }

    public string Value { get; init; }

    public int Sequence { get; private set; }

    public Poker(Guid id, string value)
        : base(id)
    {
        Value = value;
    }


    public Poker SetSequence(int sequence)
    {
        Sequence = sequence;
        return this;
    }
}
