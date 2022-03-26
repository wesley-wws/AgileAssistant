using AGA.Application.Contracts.Meetings;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AgileAssistant.Hubs
{
    public class MeetingHub : Hub<IMeetingHubClient>
    {
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var meetingId = httpContext?.Request.Query["meetingId"];
            if (meetingId is not null)
            {
                Context.Items["meetingId"] = meetingId;
                await Groups.AddToGroupAsync(Context.ConnectionId, meetingId);
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var meetingId = Context.Items["meetingId"]?.ToString();
            if (meetingId is not null)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, meetingId);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }

    public interface IMeetingHubClient
    {
        Task AddParticipant(Guid meetingId, ParticipantDto participant);

        Task SelectPoker(Guid meetingId, string userName, ParticipantPokerDto poker);

        Task SelectPokers(Guid meetingId, string userName, ParticipantPokerDto[] pokers);

        Task ChangeTopic(Guid meetingId, string topic);

        Task UpdatePokerValue(Guid meetingId, string userName, Guid pokerId, string pokerValue);
    }

    public static class Extensions
    {
        public static Task AddParticipantAsync_BroadcastGroup(this IHubContext<MeetingHub, IMeetingHubClient> context, Guid meetingId, ParticipantDto participant)
        {
            return context.Clients.Group(meetingId.ToString()).AddParticipant(meetingId, participant);
        }

        public static Task SelectPokerAsync_BroadcastGroup(this IHubContext<MeetingHub, IMeetingHubClient> context, Guid meetingId, string userName, ParticipantPokerDto poker)
        {
            return context.Clients.Group(meetingId.ToString()).SelectPoker(meetingId, userName, poker);
        }

        public static Task SelectPokersAsync_BroadcastGroup(this IHubContext<MeetingHub, IMeetingHubClient> context, Guid meetingId, string userName, ParticipantPokerDto[] pokers)
        {
            return context.Clients.Group(meetingId.ToString()).SelectPokers(meetingId, userName, pokers);
        }

        public static Task ChangeTopicAsync_BroadcastGroup(this IHubContext<MeetingHub, IMeetingHubClient> context, Guid meetingId, string topic)
        {
            return context.Clients.Group(meetingId.ToString()).ChangeTopic(meetingId, topic);
        }
    }
}
