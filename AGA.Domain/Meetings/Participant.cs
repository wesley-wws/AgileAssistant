using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Domain.Meetings;

public class Participant : AbstractEntity
{
    public string Name { get; init; }

    public Guid? SelectedPokerId
    {
        get => SelectedPokerIds.FirstOrDefault();
        set
        {
            SelectedPokerIds = new List<Guid>();
            if (value != null)
            {
                SelectedPokerIds.Add(value.Value);
            }
        }
    }

    public List<Guid> SelectedPokerIds { get; set; } = new List<Guid>();

    public bool IsPokerShown {get;set;}

    public Participant(string name)
    {
        Name = name;
    }
}
