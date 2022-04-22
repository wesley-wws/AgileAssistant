import Stack from '@mui/material/Stack';
import HostLauncher from './HostLauncher';
import ParticipantLauncher from './ParticipantLauncher';

interface Props {
	meetingId?: string;
}

export default function MeetingLauncher(props: Props) {
	return (
		<Stack
			sx={{
				padding: '20px',
				minWidth: '300px',
			}}
			justifyContent="center"
			alignItems="center"
			spacing={2}
		>
			{props.meetingId === undefined ? HostLauncher() : ParticipantLauncher(props.meetingId)}
		</Stack>
	);
}
