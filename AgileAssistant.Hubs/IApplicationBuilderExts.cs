using AgileAssistant.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.AspNetCore.Builder
{
    public static class IApplicationBuilderExts
    {
        public static IApplicationBuilder UseAgileAssistantHubs(this IApplicationBuilder app)
        {
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<GroomingHub>("/groominghub");
            });
            return app;
        }
    }
}
