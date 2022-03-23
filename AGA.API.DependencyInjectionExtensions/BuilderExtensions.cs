using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.AspNetCore.Builder;

public static class BuilderExtensions
{
    public static IApplicationBuilder UseAGA(this IApplicationBuilder app)
    {
        app.UseAgileAssistantHubs();

        app.AddDbContextSeed();

        return app;
    }
}
