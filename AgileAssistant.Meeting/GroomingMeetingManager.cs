using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;

namespace AgileAssistant.Meeting
{
    public class GroomingMeetingManager : IDisposable
    {
        private readonly GroomingMeetingManagerOptions _options;

        private readonly Timer _timer;

        private readonly ConcurrentDictionary<string, GroomingMeeting> _id_meeting_mapping;

        public GroomingMeetingManager(GroomingMeetingManagerOptions options)
        {
            _options = options;

            _id_meeting_mapping = new ConcurrentDictionary<string, GroomingMeeting>();

            _timer = new Timer(_options.MeetingClearInterval.TotalMilliseconds);
            _timer.Elapsed += async (obj, Event) =>
            {
                await ClearInactivedMeetings();
            };
            _timer.AutoReset = true;
            _timer.Start();
        }


        public IEnumerable<GroomingMeeting> All()
        {
            return _id_meeting_mapping.Values;
        }

        public GroomingMeeting Get(string meetingId)
        {
            if (_id_meeting_mapping.TryGetValue(meetingId, out GroomingMeeting result))
            {
                return result;
            }
            return null;
        }

        public bool Add(GroomingMeeting meeting)
        {
            return _id_meeting_mapping.TryAdd(meeting.Id, meeting);
        }

        public bool Remove(string meetingId)
        {
            return _id_meeting_mapping.TryRemove(meetingId, out _);
        }

        public async Task<List<GroomingMeeting>> ClearInactivedMeetings(bool triggerClearEvent = true)
        {
            var clearedMeetings = new List<GroomingMeeting>();
            foreach (var meetingId in _id_meeting_mapping.Keys.ToList())
            {
                if (!_id_meeting_mapping.TryGetValue(meetingId, out GroomingMeeting meeting) ||
                    meeting.IsParticipantExists() ||
                    !meeting.IsExpired(_options.MaxMeetingIdleTime))
                {
                    continue;
                }

                if (_id_meeting_mapping.TryRemove(meetingId, out _))
                {
                    clearedMeetings.Add(meeting);
                }
            }

            if (triggerClearEvent)
            {
                await _options.OnMeetingClearedAsync?.Invoke(clearedMeetings);
            }

            return clearedMeetings;
        }


        #region Dispose

        // Track whether Dispose has been called.
        private bool _disposed = false;

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            // Check to see if Dispose has already been called.
            if (!_disposed)
            {
                // If disposing equals true, dispose all managed
                // and unmanaged resources.
                if (disposing)
                {
                    // Dispose managed resources.
                    _timer.Dispose();
                }

                // Call the appropriate methods to clean up
                // unmanaged resources here.
                // If disposing is false,
                // only the following code is executed.

                // Note disposing has been done.
                _disposed = true;
            }
        }


        // Use C# finalizer syntax for finalization code.
        // This finalizer will run only if the Dispose method
        // does not get called.
        // It gives your base class the opportunity to finalize.
        // Do not provide finalizer in types derived from this class.
        ~GroomingMeetingManager()
        {
            // Do not re-create Dispose clean-up code here.
            // Calling Dispose(disposing: false) is optimal in terms of
            // readability and maintainability.
            Dispose(disposing: false);
        }

        #endregion
    }
}
