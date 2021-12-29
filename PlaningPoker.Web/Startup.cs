using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using PlaningPoker.Hubs;
using PlaningPoker.Meeting;
using System;
using System.Linq;
using System.Text;

namespace PlaningPoker.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging(configure =>
            {
                configure.AddConsole();
            });

            services.AddControllers();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSignalR();

            services.AddMeetingManager(serviceProvider =>
            {
                var hubContext = serviceProvider.GetRequiredService<IHubContext<GroomingHub>>();
                var logger = serviceProvider.GetRequiredService<ILogger<GroomingMeetingManager>>();
                return new GroomingMeetingManagerOptions
                {
                    MaxMeetingIdleTime = new TimeSpan(2, 0, 0),
                    MeetingClearInterval = new TimeSpan(1, 0, 0),
                    OnMeetingClearedAsync = async (meetings) =>
                    {
                        await hubContext.Clients.All.SendAsync("clearMeeting", meetings);

                        var message = new StringBuilder();
                        meetings.ForEach(meeting => message.AppendLine($"{meeting.Id} - {meeting.Topic} - {meeting.LastActiveDate}"));
                        logger.LogInformation(message.ToString());
                    }
                };
            });

            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                app.UseExceptionHandler("/error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            app.UsePlaningPokerHubs();
        }
    }
}
