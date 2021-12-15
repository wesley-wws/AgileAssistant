using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Timers;

namespace PlaningPoker.MeetingManager
{
    public class GroomingMeetingManager : IDisposable
    {
        private readonly int _meetingClearIntervalHours = 2;
        private readonly int _meetingUnactiveHours = 4;

        private readonly Timer _timer;

        private readonly ConcurrentDictionary<string, GroomingMeeting> _id_meeting_mapping;

        public GroomingMeetingManager()
        {
            _id_meeting_mapping = new ConcurrentDictionary<string, GroomingMeeting>();

            _timer = new Timer(new TimeSpan(_meetingClearIntervalHours, 0, 0).TotalMilliseconds);
            _timer.Elapsed += (obj, Event) =>
            {
                ClearInactivedMeetings();
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

        public void ClearInactivedMeetings()
        {
            foreach (var meetingId in _id_meeting_mapping.Keys.ToList())
            {
                if (!_id_meeting_mapping.TryGetValue(meetingId, out GroomingMeeting meeting) ||
                    meeting.IsParticipantExists() ||
                    !meeting.IsExpired(_meetingUnactiveHours))
                {
                    continue;
                }

                _id_meeting_mapping.TryRemove(meetingId, out _);
            }
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
