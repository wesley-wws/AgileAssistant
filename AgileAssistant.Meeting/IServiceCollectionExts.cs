using Microsoft.Extensions.DependencyInjection;
using AgileAssistant.Meeting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class MyConfigServiceCollectionExtensions
    {
        public static IServiceCollection AddMeetingManager(this IServiceCollection services, Func<IServiceProvider,GroomingMeetingManagerOptions> optionProvider )
        {
            services.AddSingleton<GroomingMeetingManager, GroomingMeetingManager>(serviceProvider=>
            {
                var options = optionProvider(serviceProvider);
                return new GroomingMeetingManager(options);
            });
            return services;
        }
    }
}
