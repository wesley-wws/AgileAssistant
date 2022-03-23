using AGA.Domain.Decks;
using AGA.Repository.EFCore.EntityConfigs;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgileAssistant.DataAccessLayer.EntityConfigs
{
    internal class PokerConfig : AbstractConfig<Poker>
    {
        public override void ConfigureEntity(EntityTypeBuilder<Poker> builder)
        {
            builder.Property(p => p.Value).HasMaxLength(20).IsRequired();
        }
    }
}
