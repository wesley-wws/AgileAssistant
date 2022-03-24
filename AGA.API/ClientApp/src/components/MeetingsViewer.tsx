import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import StopIcon from '@mui/icons-material/Stop';
import apiCenter from '../api/ApiCenter';
import { useRequest } from 'ahooks';
import IMeeting from '../api/IMeeting';

interface Props {}

export default function MeetingsViewer(props: Props) {
	const [meetings, setMeetings] = useState<IMeeting[]>([]);

	// const response = useRequest(apiCenter.GetMeetingsAsync);
	// response.run();
	// console.log(response);
	// const meetings = response.data?.data;

	 useEffect(() => {
	 	// https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
	 	apiCenter.getMeetingsAsync().then((response) => setMeetings(response.data));
	 }, []);

	return (
		<TableContainer>
			<Table size="small" sx={{ minWidth: 1024 }}>
				<TableHead>
					<TableRow>
						<TableCell align="center">Id</TableCell>
						<TableCell align="center">Topic</TableCell>
						<TableCell align="center">LastActiveDate</TableCell>
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
							<TableCell align="center">{meeting.lastActiveDate}</TableCell>
							<TableCell align="center">
								<Button variant="outlined" size="small" endIcon={<StopIcon />}>
									STOP
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
