import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import apiCenter from '../commons/ApiCenter';

interface Props {}

export default function MeetingViewer(props: Props) {
	const [meetings, setMeetings] = useState([]);

	useEffect(() => {
		// https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
		apiCenter.GetMeetingsAsync().then((response) => setMeetings(response.data));
	}, []);

	return (
		<TableContainer component={Paper} sx={{ width: 1024 }}>
			<Table size="small" sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						<TableCell align="center">Id</TableCell>
						<TableCell align="center">Topic</TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{meetings.map((meeting: any) => (
						<TableRow key={meeting.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell align="center" component="th" scope="row">
								{meeting.id}
							</TableCell>
							<TableCell align="center">{meeting.topic}</TableCell>
							<TableCell align="center">
								<Button variant="outlined" size="small" endIcon={<ArrowForwardIcon />}>
									JOIN
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
