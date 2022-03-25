import { useEffect, useState } from 'react';

import { NavigateFunction, useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSnackbar } from 'notistack';

import apiCenter from '../api/ApiCenter';

import IDeck from '../api/IDeck';

interface Props {
	meetingId?: string;
}

function HostLauncher(navigate: NavigateFunction) {
	const { enqueueSnackbar } = useSnackbar();
	const [topic, setTopic] = useState('');
	const [decks, setDecks] = useState<IDeck[]>([]);
	const [selectedDeckId, setSelectedDeckId] = useState<string>('');

	useEffect(() => {
		apiCenter.getDecksAsync().then((response) => {
			setDecks(response.data);
			setSelectedDeckId(response.data[0]?.id ?? '');
		});
	}, []);

	return (
		<>
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
			<FormControl fullWidth variant="standard" margin="normal">
				<InputLabel id="select-deck">Pokers</InputLabel>
				<Select
					labelId="select-deck"
					label="Pokers"
					value={selectedDeckId}
					onChange={(e: SelectChangeEvent) => {
						setSelectedDeckId(e.target.value);
					}}
				>
					{decks.map((d: IDeck, index) => {
						return (
							<MenuItem key={d.id} value={d.id}>
								{d.description}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>

			<Button
				variant="contained"
				onClick={async (e) => {
					if (topic === '' || selectedDeckId === '') {
						enqueueSnackbar('Please fill the form.', {
							variant: 'error',
							preventDuplicate: true,
						});
						return;
					}
					const response = await apiCenter.startMeetingAsync(topic, selectedDeckId);
					navigate('/meetings/host/' + response.data.id);
				}}
			>
				Launch
			</Button>
		</>
	);
}

function ParticipantLauncher(meetingId: string, navigate: NavigateFunction) {
	const [userName, setUserName] = useState('');
	return (
		<>
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
			<Button
				variant="contained"
				onClick={async (e) => {
					await apiCenter.joinMeetingAsync(meetingId, userName);
					navigate('/meetings/participant/' + meetingId, {
						state: {
							userName: userName,
						},
					});
				}}
			>
				Launch
			</Button>
		</>
	);
}

export default function MeetingLauncher(props: Props) {
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
			{props.meetingId === undefined ? HostLauncher(navigate) : ParticipantLauncher(props.meetingId, navigate)}
		</Stack>
	);
}
