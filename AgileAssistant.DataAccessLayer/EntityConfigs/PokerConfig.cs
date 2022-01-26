using AgileAssistant.DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgileAssistant.DataAccessLayer.EntityConfigs
{
    internal class PokerConfig : BaseConfig<Poker, Guid>
    {
        public override void ConfigureEntity(EntityTypeBuilder<Poker> builder)
        {
            builder.Property(p => p.Value).HasMaxLength(20).IsRequired();
            builder.HasOne<PokerDeck>().WithMany(p=>p.Pokers).HasForeignKey(p => p.PokerDeckId);
        }
    }
}
