import CenterLayout from './CenterLayout';
import MeetingLauncher from '../components/MeetingLauncher';
import { useParams } from 'react-router-dom';

export default function MeetingLauncherPage() {
	return (
		<CenterLayout>
			<MeetingLauncher meetingId={useParams().meetingId}/>
		</CenterLayout>
	);
}
