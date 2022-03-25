import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Stack, Paper, Typography, Button, Divider } from '@mui/material';
import PokerSelector from '../components/PokerSelector';
import apiCenter from '../api/ApiCenter';
import IMeeting from '../api/IMeeting';
import IDeck from '../api/IDeck';

interface IParams {
	meetingId: string;
}

interface IPropState {
	userName: string;
}

export default function MeetingParticipantPage(props: any) {
	const params = useParams<keyof IParams>();
	const routeState = useLocation().state as IPropState;
	const [meeting, setMeeting] = useState<IMeeting | null>(null);
	const [deck, setDeck] = useState<IDeck | null>(null);

	let selectedPokerId: string = '';

	useEffect(() => {
		// https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
		(async () => {
			if (params.meetingId === undefined) {
				return;
			}
			const meetingResponse = await apiCenter.getMeetingAsync(params.meetingId);
			const meetingModel = meetingResponse.data;
			setMeeting(meetingModel);
			if (meetingModel === null) {
				return;
			}
			const deckResponse = await apiCenter.getDeckAsync(meetingModel.deckId);
			setDeck(deckResponse.data);
		})();
	}, [params.meetingId]);

	if (!meeting) {
		return <div>Loading</div>;
	}

	return (
		deck && (
			<Container maxWidth="xl">
				<Stack pt={2} spacing={2}>
					<Paper elevation={20}>
						<Typography align="center" m={2} variant="h6">
							{meeting.topic} - {routeState.userName}
						</Typography>
					</Paper>
					<Divider />
					<PokerSelector
						deck={deck}
						onPokerSelected={(pokerId) => {
							selectedPokerId = pokerId;
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
							apiCenter.selectedPokersAsync(meeting.id, routeState.userName, [selectedPokerId]);
						}}
					>
						Pick
					</Button>
				</Stack>
			</Container>
		)
	);
}
