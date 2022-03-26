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
        config.ForType<ParticipantPoker, ParticipantPokerDto>();
        config.ForType<ParticipantPokerDto, ParticipantPoker>().ConstructUsing((dto) => new ParticipantPoker(dto.ParticipantName, dto.PokerId, dto.PokerValue, dto.Id));

        _mapper = new Mapper(config);
    }

    public static D Map<D>(object source)
    {
        return _mapper.Map<D>(source); 
    }
}
