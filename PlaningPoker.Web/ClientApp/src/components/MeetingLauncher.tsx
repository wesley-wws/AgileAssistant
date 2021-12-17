import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import apiCenter from '../commons/ApiCenter';

interface Props {
	meetingId?: string;
}

export default function MeetingLauncher(props: Props) {
	const [topic, setTopic] = useState('');
	const [userName, setUserName] = useState('');
	let navigate = useNavigate();
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
			{props.meetingId === undefined ? (
				<TextField
					label="Topic"
					variant="standard"
					margin="normal"
					fullWidth
					value={topic}
					onChange={(e) => {
						setTopic(e.target.value);
					}}
				/>
			) : (
				<TextField
					label="Your Name"
					variant="standard"
					margin="normal"
					fullWidth
					value={userName}
					onChange={(e) => {
						setUserName(e.target.value);
					}}
				/>
			)}

			<Button
				variant="contained"
				onClick={async (e) => {
					if (props.meetingId === undefined) {
						const response = await apiCenter.AddMeetingAsync(topic);
						navigate('/meetings/host/' + response.data.id);
						return;
					}
					await apiCenter.JoinMeeting(props.meetingId, userName);
					navigate('/meetings/participant/' + props.meetingId, {
						state: {
							userName: userName,
						},
					});
				}}
			>
				Launch
			</Button>
		</Stack>
	);
}
