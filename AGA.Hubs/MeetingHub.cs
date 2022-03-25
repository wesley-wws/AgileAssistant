using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AgileAssistant.Hubs
{
    public class MeetingHub : Hub<IMeetingHubClient>
    {
        public async Task AddToGroup(string meetingId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, meetingId);
        }

        public override async Task OnConnectedAsync()
        {
            var meetingId = Context.Items["meetingId"]?.ToString();
            if (meetingId is not null)
            {
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
        Task AddParticipant(Guid meetingId, string userName);

        Task SelectPoker(Guid meetingId, string userName, Guid pokerId);

        Task SelectPokers(Guid meetingId, string userName, Guid[] pokerIds);

        Task ChangeTopic(Guid meetingId, string topic);
    }

    public static class Extensions
    {
        public static Task AddParticipantAsync_BroadcastGroup(this IHubContext<MeetingHub, IMeetingHubClient> context, Guid meetingId, string userName)
        {
            return context.Clients.Group(meetingId.ToString()).AddParticipant(meetingId, userName);
        }

        public static Task SelectPokerAsync_BroadcastGroup(this IHubContext<MeetingHub, IMeetingHubClient> context, Guid meetingId, string userName, Guid pokerId)
        {
            return context.Clients.Group(meetingId.ToString()).SelectPoker(meetingId, userName, pokerId);
        }

        public static Task SelectPokersAsync_BroadcastGroup(this IHubContext<MeetingHub, IMeetingHubClient> context, Guid meetingId, string userName, Guid[] pokerIds)
        {
            return context.Clients.Group(meetingId.ToString()).SelectPokers(meetingId, userName, pokerIds);
        }

        public static Task ChangeTopicAsync_BroadcastGroup(this IHubContext<MeetingHub, IMeetingHubClient> context, Guid meetingId, string topic)
        {
            return context.Clients.Group(meetingId.ToString()).ChangeTopic(meetingId, topic);
        }
    }
}
