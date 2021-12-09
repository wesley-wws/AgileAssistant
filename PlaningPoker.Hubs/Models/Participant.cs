using System;
using System.Collections.Generic;
using System.Text;

namespace PlaningPoker.Hubs.Models
{
    public record Participant
    {
        public string Id { get; init; }

        public string Name { get; init; }

        public string SelectedPokerKey { get; init; }
    }
}
