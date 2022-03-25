import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Stack, Paper, Typography, Button, Divider, Box } from '@mui/material';
import QRCode from 'qrcode.react';
import * as signalR from '@microsoft/signalr';
import ParticipantsViewer from '../components/ParticipantsViewer';
import apiCenter from '../api/ApiCenter';
import IParticipant from '../api/IParticipant';
import IMeeting from '../api/IMeeting';
import constant from '../contracts/constance';

interface IParams {
	meetingId: string;
}

function getMeetingLink(meetingId: string): string {
	return `${window.location.protocol}//${window.location.host}/launcher/${meetingId}`;
}

const hubConnection = new signalR.HubConnectionBuilder().withAutomaticReconnect().withUrl(constant.meetingHubUrl).build();

export default function MeetingHostPage() {
	const params = useParams<keyof IParams>();
	const navigate = useNavigate();

	const meetingLink = params.meetingId === undefined ? '' : getMeetingLink(params.meetingId);

	const [meeting, setMeeting] = useState<IMeeting | null>(null);
	const [isShownAll, setIsShownAll] = useState<boolean>(false);

	useEffect(() => {
		//const hubConnection = new signalR.HubConnectionBuilder().withAutomaticReconnect().withUrl(constant.meetingHubUrl).build();
		hubConnection.on('AddParticipant', (meetingId: string, userName: string) => {
			setMeeting((preMeeting) => {
				if (preMeeting == null || meetingId !== preMeeting.id) {
					return preMeeting;
				}
				const part = preMeeting.participants.find((p: IParticipant) => p.name === userName);
				if (part !== undefined) {
					return preMeeting;
				}
				const participant: IParticipant = {
					name: userName,
					isPokerShown: isShownAll,
					selectedPokerIds: [],
					selectedPokerId: null,
				};
				const newMeeting = { ...preMeeting };
				newMeeting.participants = [...newMeeting.participants, participant];
				return newMeeting;
			});
		});

		hubConnection.on('SelectPoker', (meetingId: string, userName: string, pokerKey: string) => {
			setMeeting((preMeeting: IMeeting | null) => {
				if (preMeeting == null || meetingId !== preMeeting.id) {
					return preMeeting;
				}

				preMeeting.participants = preMeeting.participants.map((p: IParticipant) => {
					if (p.name === userName) {
						return { ...p, selectedPokerKey: pokerKey };
					}
					return { ...p };
				});
				return { ...preMeeting };
			});
		});

		hubConnection.start().then(() => {
			// https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
			if (params.meetingId === undefined) {
				return;
			}

			apiCenter.getMeetingAsync(params.meetingId).then((response) => {
				const meetingModel = response.data;
				if (meetingModel === null) {
					navigate('/error', {
						state: {
							message: 'No meeting record.',
							details: params.meetingId,
						},
					});
					return;
				}
				hubConnection.invoke('AddToGroup', meetingModel.id);
				setMeeting(response.data);
			});
		});

		return () => {
			hubConnection.stop();
		};
	}, []);

	return (
		<>
			{meeting && (
				<Container
					sx={{
						paddingTop: 2,
					}}
					maxWidth="xl"
				>
					<Stack spacing={2}>
						<Paper elevation={20}>
							<Typography align="center" m={2} variant="h6">
								{meeting.topic}
							</Typography>
						</Paper>
						<Divider />
						<Button
							sx={{
								marginTop: '20px',
								alignSelf: 'center',
							}}
							variant="contained"
							color="primary"
							onClick={(e) => {
								setIsShownAll((pre: boolean) => {
									return !pre;
								});
								setMeeting((preMeeting: IMeeting | null) => {
									if(preMeeting===null){
										return null;
									}
									preMeeting.participants = preMeeting.participants.map((p: IParticipant) => ({ ...p, isShown: !isShownAll }));
									return preMeeting;
								});
							}}
						>
							Open/Hide
						</Button>
						<ParticipantsViewer participants={meeting.participants} deck={meeting.deck} />
						<Button
							sx={{
								marginTop: '20px',
								alignSelf: 'center',
							}}
							variant="contained"
							color="primary"
							onClick={(e) => {
								if (navigator.clipboard && window.isSecureContext) {
									// navigator clipboard api method'
									navigator.clipboard.writeText(meetingLink);
								} else {
									// text area method
									let textArea = document.createElement('textarea');
									textArea.value = meetingLink;
									// make the textarea out of viewport
									textArea.style.position = 'fixed';
									textArea.style.left = '-999999px';
									textArea.style.top = '-999999px';
									document.body.appendChild(textArea);
									textArea.focus();
									textArea.select();
									return new Promise((res, rej) => {
										// here the magic happens
										document.execCommand('copy') ? res(true) : rej(false);
										textArea.remove();
									});
								}
							}}
						>
							Copy Meeting Link
						</Button>
						<Box>
							<QRCode value={meetingLink} />
						</Box>
					</Stack>
				</Container>
			)}
		</>
	);
}
