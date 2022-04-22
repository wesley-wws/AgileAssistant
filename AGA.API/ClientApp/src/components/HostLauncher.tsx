import { useEffect, useState } from 'react';

import { NavigateFunction, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSnackbar } from 'notistack';

import apiCenter from '../api/ApiCenter';

import IDeck from '../api/IDeck';
import keyboardKey from '../utilities/keyboardKey';

async function launch(topic: string, selectedDeckId: string, navigate: NavigateFunction,enqueueSnackbar:any ) {
	if (topic === '' || selectedDeckId === '') {
		enqueueSnackbar('Please fill the form.', {
			variant: 'error',
			preventDuplicate: true,
		});
		return;
	}
	const response = await apiCenter.startMeetingAsync(topic, selectedDeckId);
	navigate('/meetings/host/' + response.data.id);
}

export default function HostLauncher() {
	let navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [topic, setTopic] = useState<string>('');
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
				onKeyPress={(e) => {
					if (keyboardKey.isEnter(e.key)) {
                        launch(topic,selectedDeckId,navigate,enqueueSnackbar);
					}
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
				onClick={(e) => {
                     launch(topic,selectedDeckId,navigate,enqueueSnackbar);
				}}
			>
				Launch
			</Button>
		</>
	);
}
