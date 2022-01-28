using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Concurrent;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgileAssistant.Meeting
{
    public class GroomingMeeting
    {
        private readonly ConcurrentDictionary<string, GroomingParticipant> _participants = new();


        public string Id { get; init; }

        public string Topic { get; private set; }

        public PokerDeck PokerDeck { get; set; }

        public ICollection<GroomingParticipant> Participants => _participants.Values;

        public DateTime LastActiveDate { get; private set; } = DateTime.UtcNow;


        public GroomingMeeting(string id, string topic, PokerDeck pokerDeck = null)
        {
            Id = id;
            Topic = topic;
            PokerDeck = pokerDeck;
        }

        public bool Join(string name)
        {
            UpdateActiveDate();
            return _participants.TryAdd(name, new GroomingParticipant(name));
        }

        public bool Leave(string name)
        {
            UpdateActiveDate();
            return _participants.TryRemove(name, out _);
        }

        public bool UpdateParticipantPoker(string name, string selectedPokerKey)
        {
            UpdateActiveDate();
            if (_participants.TryGetValue(name, out GroomingParticipant participant))
            {
                participant.SelectedPokerKey = selectedPokerKey;
                return true;
            }

            return false;
        }

        public bool UpdateParticipantPokers(string name, IEnumerable<string> selectedPokerKeys)
        {
            UpdateActiveDate();
            if (_participants.TryGetValue(name, out GroomingParticipant participant))
            {
                participant.SelectedPokerKeys = selectedPokerKeys.ToList();
                return true;
            }

            return false;
        }

        public void UpdateTopic(string topic)
        {
            UpdateActiveDate();
            Topic = topic;
        }

        public bool IsParticipantExists()
        {
            return Participants.Any();
        }

        public bool IsExpired(TimeSpan timeSpan)
        {
            return DateTime.UtcNow.Subtract(LastActiveDate) > timeSpan;
        }

        public bool IsExpired(int hours)
        {
            return IsExpired(new TimeSpan(hours, 0, 0));
        }

        private void UpdateActiveDate()
        {
            LastActiveDate = DateTime.UtcNow;
        }
    }
}
