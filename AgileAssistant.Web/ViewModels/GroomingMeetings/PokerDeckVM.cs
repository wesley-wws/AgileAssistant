using System.Collections.Generic;

namespace AgileAssistant.Web.ViewModels.GroomingMeetings
{
    public class PokerDeckVM
    {
        public string Key { get; init; }

        public string Description { get; init; }

        public List<PokerVM> Pokers { get; init; }
    }
}
