using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Domain.Meetings;

public class Meeting: AbstractEntity, IAggregateRoot
{
    private readonly ConcurrentDictionary<string, Participant> _participants = new();


    public Guid Id { get; init; }

    public string Topic { get; private set; }

    public Guid DeckId { get; private set; }

    public ICollection<Participant> Participants => _participants.Values;

    public DateTime LastActiveDate { get; private set; } = DateTime.UtcNow;


    public Meeting(Guid id, string topic,Guid deckId)
    {
        Id = id;
        Topic = topic;
        DeckId = deckId;
    }

    public bool Join(string name)
    {
        UpdateActiveDate();
        return _participants.TryAdd(name, new Participant(name));
    }

    public bool Leave(string name)
    {
        UpdateActiveDate();
        return _participants.TryRemove(name, out _);
    }

    public bool UpdateParticipantPoker(string name, Guid selectedPokerId)
    {
        UpdateActiveDate();
        if (_participants.TryGetValue(name, out Participant? participant))
        {
            participant.SelectedPokerId = selectedPokerId;
            return true;
        }

        return false;
    }

    public bool UpdateParticipantPokers(string name, IEnumerable<Guid> selectedPokerIds)
    {
        UpdateActiveDate();
        if (_participants.TryGetValue(name, out Participant? participant))
        {
            participant.SelectedPokerIds = selectedPokerIds.ToList();
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
