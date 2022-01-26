using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using AgileAssistant.Hubs;
using AgileAssistant.Meeting;
using System;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AgileAssistant.Web
{
    public class Startup
    {
        public IWebHostEnvironment HostingEnvironment { get; }

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment hostingEnvironment)
        {
            Configuration = configuration;
            HostingEnvironment = hostingEnvironment;
        }

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

            services.AddGroomingMeetingManager(serviceProvider =>
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

            services.AddDbContext<DataAccessLayer.AgileAssistantDBContext>(options =>
            {
                options.UseSqlite("Data Source = " + System.IO.Path.Combine(HostingEnvironment.ContentRootPath, "AgileAssistant.sqlite3"));
            });
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

            app.UseAgileAssistantHubs();

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<DataAccessLayer.AgileAssistantDBContext>();
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                context.PokerDecks.Add(new DataAccessLayer.Entities.PokerDeck
                {
                    Description = "Default",
                    Pokers = new List<DataAccessLayer.Entities.Poker>
                    {
                         new DataAccessLayer.Entities.Poker
                         {
                             Value = "1",
                         }
                    }
                });
                context.PokerDecks.Add(new DataAccessLayer.Entities.PokerDeck
                {
                    Description = "Custom-1",
                    Pokers = new List<DataAccessLayer.Entities.Poker>
                    {
                         new DataAccessLayer.Entities.Poker
                         {
                             Value = "1/2",
                         }
                    }
                });

                context.SaveChanges();
            }
        }
    }
}
