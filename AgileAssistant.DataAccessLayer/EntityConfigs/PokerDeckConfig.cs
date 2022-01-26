using AgileAssistant.DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgileAssistant.DataAccessLayer.EntityConfigs
{
    internal class PokerDeckConfig : BaseConfig<PokerDeck, Guid>
    {
        public override void ConfigureEntity(EntityTypeBuilder<PokerDeck> builder)
        {
            builder.Property(pd => pd.Description).IsRequired();
            builder.HasMany(pd => pd.Pokers).WithOne();
            builder.Navigation(pd => pd.Pokers).UsePropertyAccessMode(PropertyAccessMode.Property);
        }
    }
}
