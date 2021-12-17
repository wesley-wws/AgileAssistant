import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Stack, Paper, Typography, Button, Divider, Box } from '@mui/material';
import QRCode from 'qrcode.react';
import ParticipantsViewer from '../components/ParticipantsViewer';
import IParticipant from '../interfaces/IParticipant';
import apiCenter from '../commons/ApiCenter';
import * as signalR from '@microsoft/signalr';

interface IParams {
	meetingId: string;
}

function getMeetingLink(meetingId: string): string {
	return `${window.location.protocol}//${window.location.host}/launcher/${meetingId}`;
}

export default function MeetingHostPage() {
	const params = useParams<keyof IParams>();
	const navigate = useNavigate();

	const meetingLink = params.meetingId === undefined ? '' : getMeetingLink(params.meetingId);

	const [meeting, setMeeting] = useState<any>(null);
	const [isShownAll, setIsShownAll] = useState<any>(false);

	useEffect(() => {
		const hubConnection = new signalR.HubConnectionBuilder().withAutomaticReconnect().withUrl('/groominghub').build();

		hubConnection.on('AddParticipant', (meetingId: string, userName: string) => {
			setMeeting((preMeeting: any) => {
				if (preMeeting == null || meetingId !== preMeeting.id) {
					return preMeeting;
				}
				const part = preMeeting.participants.find((p: any) => p.name === userName);
				if (part !== undefined) {
					return preMeeting;
				}
				const participant: IParticipant = {
					name: userName,
					selectedPokerKey: null,
					isShown: isShownAll,
				};
				const newMeeting = { ...preMeeting };
				newMeeting.participants = [...newMeeting.participants, participant];
				return newMeeting;
			});
		});

		hubConnection.on('SelectPoker', (meetingId: string, userName: string, pokerKey: string) => {
			setMeeting((preMeeting: any) => {
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

			apiCenter.GetMeetingAsync(params.meetingId).then((response) => {
				const meetingModel = response.data;
				if (meetingModel === null || meetingModel === '') {
					navigate('/error', {
						state: {
							message: 'No meeting record.',
							details: params.meetingId,
						},
					});
				}
				hubConnection.invoke('AddToGroup',meetingModel.id);
				setMeeting(response.data);
			});
		});

		return () => {
			hubConnection.stop();
		};
	}, []);

	useEffect(() => {}, [params.meetingId]);

	return (
		<>
			{meeting && (
				<Container maxWidth="xl">
					<Stack mt={2} spacing={2}>
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
								setIsShownAll((pre: any) => {
									return !pre;
								});
								setMeeting((preMeeting: any) => {
									preMeeting.participants = preMeeting.participants.map((p: IParticipant) => ({ ...p, isShown: !isShownAll }));
									return preMeeting;
								});
							}}
						>
							Open/Hide
						</Button>
						<ParticipantsViewer participants={meeting.participants} />
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
