import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import apiCenter from '../commons/ApiCenter';

interface Props {}

export default function MeetingLauncher(props: Props) {
	useEffect(() => {}, []);

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
				<TextField label="Topic" variant="standard" margin="normal" fullWidth />
				<Button variant="contained">Launch</Button>
			</Stack>
	);
}
