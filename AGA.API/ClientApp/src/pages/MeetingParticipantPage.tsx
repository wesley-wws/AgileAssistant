import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Stack, Paper, Typography, Button, Divider } from '@mui/material';
import PokerSelector from '../components/PokerSelector';
import apiCenter from '../api/ApiCenter';
import IMeeting from '../api/IMeeting';
import IDeck from '../api/IDeck';
import IParticipantPoker from '../api/IParticipantPoker';
import IPoker from '../api/IPoker';
import guid from '../utilities/guid';

interface IParams {
	meetingId: string;
}

interface IPropState {
	userName: string;
}

export default function MeetingParticipantPage() {
	const params = useParams<keyof IParams>();
	const routeState = useLocation().state as IPropState;
	const [meeting, setMeeting] = useState<IMeeting | undefined>();
	const [deck, setDeck] = useState<IDeck | undefined>();
	const [selectedPoker, setSelectedPoker] = useState<IParticipantPoker | undefined>();

	useEffect(() => {
		// https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
		(async () => {
			if (params.meetingId === undefined) {
				return;
			}
			const meetingResponse = await apiCenter.getMeetingAsync(params.meetingId);
			const meetingModel = meetingResponse.data;
			setMeeting(meetingModel);
			if (meetingModel === undefined) {
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
		<>
			{deck && (
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
							onPokerSelected={(poker: IPoker) => {
								setSelectedPoker((): IParticipantPoker => {
									return {
										id: guid.create(),
										pokerId: poker.id,
										pokerValue: poker.value,
										originalPokerValue: poker.value,
										participantName: routeState.userName,
									};
								});
							}}
							onPokerValueChange={(poker, pokerValue) => {
								setDeck((prev: IDeck | undefined) => {
									if (prev === undefined) {
										return prev;
									}

									var newDeck: IDeck = { ...prev };
									newDeck.pokers = newDeck.pokers.map((p) => {
										if (p.id === poker.id) {
											return { ...p, value: pokerValue };
										}
										return p;
									});
									return newDeck;
								});
								setSelectedPoker((prev: IParticipantPoker | undefined) => {
									if (prev === undefined) {
										return {
											id: guid.create(),
											pokerId: poker.id,
											pokerValue: pokerValue,
											originalPokerValue: poker.value,
											participantName: routeState.userName,
										};
									}
									prev.pokerValue = pokerValue;
									return prev;
								});
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
								if (selectedPoker === undefined) {
									return;
								}
								apiCenter.selectedPokersAsync(meeting.id, routeState.userName, [selectedPoker]);
							}}
						>
							Pick
						</Button>
					</Stack>
				</Container>
			)}
		</>
	);
}
