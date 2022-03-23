using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AGA.Domain.Decks;
using AGA.Repository.EFCore;
using Microsoft.Extensions.DependencyInjection;

namespace Microsoft.AspNetCore.Builder;

public static class IApplicationBuilderExts
{
    public static IApplicationBuilder AddDbContextSeed(this IApplicationBuilder app)
    {
        // TODO: move
        using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>()!.CreateScope())
        {
            var context = serviceScope.ServiceProvider.GetRequiredService<AgileAssistantDBContext>();
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            var deck = new Deck(Guid.NewGuid(), "Predefined-1");
            deck.SetPokers(new List<Poker>
                    {
                        new Poker("1").SetSequence(100),
                        new Poker("2").SetSequence(200),
                        new Poker("3").SetSequence(300),
                        new Poker("5").SetSequence(400),
                        new Poker("8").SetSequence(500),
                        new Poker("13").SetSequence(600),
                        new Poker("20").SetSequence(700),
                        new Poker("40").SetSequence(800),
                        new Poker("100").SetSequence(900),
                        new Poker("infinite").SetSequence(1000),
                        new Poker("brownie").SetSequence(1100),
                        new Poker("dragons").SetSequence(1200),
                        new Poker("yak_shaving").SetSequence(1300),
                        new Poker("cover").SetSequence(1400),
                    });
            context.Decks.Add(deck);
            context.SaveChanges();
        }

        return app;
    }
}
