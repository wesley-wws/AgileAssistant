import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Stack, Paper, Typography, Button, Divider } from '@mui/material';
import PokerSelector from '../components/PokerSelector';
import apiCenter from '../commons/ApiCenter';

interface IParams {
	meetingId: string;
}

interface IPropState {
	userName: string;
}

export default function MeetingParticipantPage(props: any) {
	const params = useParams<keyof IParams>();
	const routeState = useLocation().state as IPropState;
	const [meeting, setMeeting] = useState<any>(null);

	let selectedPokerKey: any = null;

	useEffect(() => {
		// https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
		if (params.meetingId === undefined) {
			return;
		}
		apiCenter.GetMeetingAsync(params.meetingId).then((response) => setMeeting(response.data));
	}, [params.meetingId]);

	if (!meeting) {
		return <div>Loading</div>;
	}

	return (
		<Container maxWidth="xl">
			<Stack pt={2} spacing={2}>
				<Paper elevation={20}>
					<Typography align="center" m={2} variant="h6">
						{meeting.topic} - {routeState.userName}
					</Typography>
				</Paper>
				<Divider />
				<PokerSelector
					deck={meeting.deck}
					onPokerSelected={(pokerKey) => {
						selectedPokerKey = pokerKey;
					}}
				/>
				<Button
					sx={{
						marginTop: '20px',
						alignSelf: 'center',
					}}
					variant="contained"
					color="primary"
					onClick={(e) => {
						apiCenter.updateSelectedPoker(meeting.id, routeState.userName, selectedPokerKey);
					}}
				>
					Pick
				</Button>
			</Stack>
		</Container>
	);
}
