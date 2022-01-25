using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgileAssistant.Meeting
{
    public class GroomingMeetingManagerOptions
    {
        public TimeSpan MeetingClearInterval { get; init; }

        public TimeSpan MaxMeetingIdleTime { get; init; }

        public Func<List<GroomingMeeting>, Task> OnMeetingClearedAsync { get; init; }
    }
}
