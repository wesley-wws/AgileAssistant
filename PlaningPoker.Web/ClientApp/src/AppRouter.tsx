import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MeetingLancherPage from './pages/MeetingLancherPage';
import MeetingsPage from './pages/MeetingsPage';
import MeetingPage from './pages/MeetingPage';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="" element={<MeetingLancherPage />} />
				<Route path="meetings" element={<MeetingsPage />} />
				<Route path="meetings/:meetingId" element={<MeetingPage />} />
			</Routes>
		</BrowserRouter>
	);
}
