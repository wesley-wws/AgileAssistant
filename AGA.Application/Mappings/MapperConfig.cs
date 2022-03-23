using AGA.Application.Contracts.Decks;
using AGA.Application.Contracts.Meetings;
using AGA.Domain.Decks;
using AGA.Domain.Meetings;
using Mapster;
using MapsterMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Application;

internal static class ObjectMapper
{
    private static readonly IMapper _mapper;

    static ObjectMapper()
    {
        var config = new TypeAdapterConfig();

        config.ForType<Poker, PokerDto>();
        config.ForType<Deck, DeckDto>();


        config.ForType<Meeting, MeetingDto>();
        config.ForType<Participant, ParticipantDto>();

        _mapper = new Mapper(config);
    }

    public static D Map<D>(object source)
    {
        return _mapper.Map<D>(source);
    }
}
