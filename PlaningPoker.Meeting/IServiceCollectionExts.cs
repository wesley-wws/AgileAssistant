using Microsoft.Extensions.DependencyInjection;
using PlaningPoker.MeetingManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class MyConfigServiceCollectionExtensions
    {
        public static IServiceCollection AddMeetingManager(this IServiceCollection services)
        {
            services.AddSingleton<GroomingMeetingManager, GroomingMeetingManager>();
            return services;
        }
    }
}
