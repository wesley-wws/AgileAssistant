using AGA.Application;
using AGA.Application.Contracts.Decks;
using AGA.Application.Contracts.Meetings;
using AGA.Domain.Decks;
using AGA.Domain.Meetings;
using AGA.Repository.EFCore;
using AGA.Repository.InMomery;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddAGA(this IServiceCollection services, Action<IServiceProvider, AGADBContextConfiguration>? configureDb = null)
    {
        services.AddSignalR();

        services.AddAgileAssistantDbContextSqlite(configureDb);

        services.AddScoped<IDeckRepository, DeckEFRepository>();
        services.AddSingleton<IMeetingRepository, MeetingRepository>();

        services.AddScoped<IDeckAppService, DeckAppService>();
        services.AddScoped<IMeetingAppService, MeetingAppService>();

        return services;
    }
}
