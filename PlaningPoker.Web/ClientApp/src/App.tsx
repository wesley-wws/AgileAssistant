import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MeetingLauncherPage from './pages/MeetingLauncherPage';
import MeetingsPage from './pages/MeetingsPage';
import MeetingHostPage from './pages/MeetingHostPage';
import MeetingParticipantPage from './pages/MeetingParticipantPage';
import ErrorPage from './pages/ErrorPage';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="" element={<MeetingLauncherPage />} />
				<Route path="launcher" element={<MeetingLauncherPage />}>
					<Route path=":meetingId" element={<MeetingLauncherPage />} />
				</Route>
				<Route path="meetings" element={<MeetingsPage />} />
				<Route path="meetings/participant/:meetingId" element={<MeetingParticipantPage />} />
				<Route path="meetings/host/:meetingId" element={<MeetingHostPage />} />
				<Route path="error" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
}
