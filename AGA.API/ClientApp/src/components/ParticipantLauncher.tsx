import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import apiCenter from '../api/ApiCenter';
import localCache from '../utilities/localCache';
import keyboardKey from '../utilities/keyboardKey';

async function launch(meetingId: string, userName: string, navigate: NavigateFunction) {
	await apiCenter.joinMeetingAsync(meetingId, userName);
	navigate('/meetings/participant/' + meetingId, {
		state: {
			userName: userName,
		},
	});
}

export default function ParticipantLauncher(meetingId: string) {
	let navigate = useNavigate();
	const [userName, setUserName] = useState(localCache.lastUserName);
	return (
		<>
			<TextField
				label="Your Name"
				variant="standard"
				margin="normal"
				fullWidth
				value={userName}
				onChange={(e) => {
					localCache.lastUserName = e.target.value;
					setUserName(e.target.value);
				}}
				onKeyPress={(e) => {
					if (keyboardKey.isEnter(e.key)) {
						launch(meetingId, userName, navigate);
					}
				}}
			/>
			<Button
				variant="contained"
				onClick={(e) => {
					launch(meetingId, userName, navigate);
				}}
			>
				Launch
			</Button>
		</>
	);
}
