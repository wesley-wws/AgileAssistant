using Microsoft.AspNetCore.SignalR;
using AgileAssistant.Hubs.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AgileAssistant.Hubs
{
    public class GroomingHub : Hub<IGroomingHubClient>
    {
        public async Task AddToGroup(string meetingId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, meetingId);
        }
    }

    public interface IGroomingHubClient
    {
        Task AddParticipant(string meetingId, string userName);

        Task SelectPoker(string meetingId, string userName, string pokerKey);

        Task ChangeTopic(string meetingId, string topic);
    }

    public static class Extensions
    {
        public static Task AddParticipant_BroadcastGroup(this IHubContext<GroomingHub, IGroomingHubClient> context, string meetingId, string userName)
        {
            return context.Clients.Group(meetingId).AddParticipant(meetingId,userName);
        }

        public static Task SelectPoker_BroadcastGroup(this IHubContext<GroomingHub, IGroomingHubClient> context, string meetingId, string userName, string pokerKey)
        {
            return context.Clients.Group(meetingId).SelectPoker(meetingId,userName, pokerKey);
        }

        public static Task ChangeTopic_BroadcastGroup(this IHubContext<GroomingHub, IGroomingHubClient> context, string meetingId, string topic)
        {
            return context.Clients.Group(meetingId).ChangeTopic(meetingId,topic);
        }
    }
}
