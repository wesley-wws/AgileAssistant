namespace AGA.Application.Contracts.Decks;

public record DeckDto
{
    public Guid Id { get; init; }

    public string Description { get; set; } = null!;

    public List<PokerDto> Pokers { get; set; } = new List<PokerDto>();
}