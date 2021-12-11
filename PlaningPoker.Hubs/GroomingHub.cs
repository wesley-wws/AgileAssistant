using Microsoft.AspNetCore.SignalR;
using PlaningPoker.Hubs.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PlaningPoker.Hubs
{
    public class GroomingHub : Hub<IGroomingHubClient>
    {

    }

    public interface IGroomingHubClient
    {
        Task AddParticipant(string userName);

        Task AddParticipant(string userName, string meetingId);

        Task SelectPoker(string userName, string meetingId, string pokerKey);

        Task ChangeTopic(string topic, string meetingId);
    }
}
