using AGA.Domain.Decks;
using AGA.Repository.EFCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection
{
    public class AGADBContextConfiguration
    {
        public string? SqliteDirectory { get; set; }
    }

    public static class IServiceCollectionExts
    {
        public static IServiceCollection AddAgileAssistantDbContextSqlite(this IServiceCollection services, Action<IServiceProvider, AGADBContextConfiguration>? configure=null)
        {
            var config = new AGADBContextConfiguration();

            services.AddDbContext<AgileAssistantDBContext>((serviceProvider, options) =>
            {
                configure?.Invoke(serviceProvider, config);

                if (config.SqliteDirectory is null)
                {
                    options.UseInMemoryDatabase("AgileAssistant");
                }
                else
                {
                    var filePath = Path.Combine(config.SqliteDirectory, @"AgileAssistant.sqlite3");
                    if (!File.Exists(filePath))
                    {
                        File.Create(filePath).Dispose();
                    }

                    options.UseSqlite("Data Source = " + filePath);
                }
            });


            return services;
        }
    }
}
