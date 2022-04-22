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
        using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>()!.CreateScope())
        {
            var context = serviceScope.ServiceProvider.GetRequiredService<AgileAssistantDBContext>();
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            var deck = new Deck(Guid.Parse("6fdf6ffc-ed77-94fa-407e-a7b86ed9e591"), "Predefined");
            deck.SetPokers(new List<Poker>
                    {
                        new Poker(Guid.NewGuid(),"1").SetSequence(100),
                        new Poker(Guid.NewGuid(),"2").SetSequence(200),
                        new Poker(Guid.NewGuid(),"3").SetSequence(300),
                        new Poker(Guid.NewGuid(),"5").SetSequence(400),
                        new Poker(Guid.NewGuid(),"8").SetSequence(500),
                        new Poker(Guid.NewGuid(),"13").SetSequence(600),
                        new Poker(Guid.NewGuid(),"20").SetSequence(700),
                        new Poker(Guid.NewGuid(),"40").SetSequence(800),
                        new Poker(Guid.NewGuid(),"100").SetSequence(900),
                        new Poker(Guid.NewGuid(),"infinite").SetSequence(1000),
                        new Poker(Guid.NewGuid(),"brownie").SetSequence(1100),
                        new Poker(Guid.NewGuid(),"dragons").SetSequence(1200),
                        new Poker(Guid.NewGuid(),"yak_shaving").SetSequence(1300),
                        new Poker(Guid.NewGuid(),"cover").SetSequence(1400),
                    });
            context.Decks.Add(deck);

            deck = new Deck(Guid.Parse("6fdf6ffc-ed77-94fa-407e-a7b86ed9e592"), "Blue");
            deck.SetPokers(new List<Poker>
                    {
                        new Poker(Guid.NewGuid(),"0").SetSequence(0),
                        new Poker(Guid.NewGuid(),"1/2").SetSequence(50),
                        new Poker(Guid.NewGuid(),"1").SetSequence(100),
                        new Poker(Guid.NewGuid(),"2").SetSequence(200),
                        new Poker(Guid.NewGuid(),"3").SetSequence(300),
                        new Poker(Guid.NewGuid(),"5").SetSequence(400),
                        new Poker(Guid.NewGuid(),"8").SetSequence(500),
                        new Poker(Guid.NewGuid(),"13").SetSequence(600),
                        new Poker(Guid.NewGuid(),"20").SetSequence(700),
                        new Poker(Guid.NewGuid(),"40").SetSequence(800),
                        new Poker(Guid.NewGuid(),"100").SetSequence(900),
                        new Poker(Guid.NewGuid(),"infinite").SetSequence(1000),
                        new Poker(Guid.NewGuid(),"coffee").SetSequence(1100),
                        new Poker(Guid.NewGuid(),"?").SetSequence(1200),
                    });
            context.Decks.Add(deck);

            deck = new Deck(Guid.Parse("6fdf6ffc-ed77-94fa-407e-a7b86ed9e593"), "Custom");
            deck.SetPokers(new List<Poker>
                    {
                        new Poker(Guid.NewGuid()," ").SetSequence(0),
                    });
            context.Decks.Add(deck);

            context.SaveChanges();
        }

        return app;
    }
}
