import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MeetingLauncherPage from './pages/MeetingLauncherPage';
import MeetingsPage from './pages/MeetingsPage';
import MeetingHostPage from './pages/MeetingHostPage';
import MeetingParticipantPage from './pages/MeetingParticipantPage';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="" element={<MeetingLauncherPage />} />
				<Route path="launcher" element={<MeetingLauncherPage />}>
					<Route path=":meetingId" element={<MeetingLauncherPage />} />
				</Route>
				<Route path="meetings" element={<MeetingsPage />} />
				<Route path="meetings/:meetingId" element={<MeetingParticipantPage />} />
				<Route path="meetings/host/:meetingId" element={<MeetingHostPage />} />
			</Routes>
		</BrowserRouter>
	);
}
