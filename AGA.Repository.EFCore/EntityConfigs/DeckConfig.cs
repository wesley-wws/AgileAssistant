using AGA.Domain.Decks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Repository.EFCore.EntityConfigs
{
    internal class DeckConfig : AbstractConfig<Deck, Guid, int>
    {
        public override void ConfigureEntity(EntityTypeBuilder<Deck> builder)
        {
            builder.Property(x => x.Description).IsRequired();
            builder.HasMany(x => x.Pokers).WithOne().HasForeignKey(x => x.DeckId).HasPrincipalKey(x => x.Id);
            builder.Navigation(x => x.Pokers).HasField("_pokers");
        }
    }
}
