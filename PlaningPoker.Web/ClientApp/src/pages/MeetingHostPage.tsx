import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Paper, Typography, Button, Divider, Box } from '@mui/material';
import QRCode from 'qrcode.react';
import ParticipantsViewer from '../components/ParticipantsViewer';
import IParticipant from '../interfaces/IParticipant';
import apiCenter from '../commons/ApiCenter';
import * as signalR from '@microsoft/signalr';

interface Props {}

interface IParams {
	meetingId: string;
}

export default function MeetingHostPage(props: Props) {
	const params = useParams<keyof IParams>();
	const [meeting, setMeeting] = useState<any>(null);
	const [meetingLink, setMeetingLink] = useState<any>(`${window.location.host}/launcher/${params.meetingId}`);
	const [isShownAll, setIsShownAll] = useState<any>(false);

	const [connection] = useState<any>(new signalR.HubConnectionBuilder().withUrl('/groominghub').build());
	useEffect(() => {
		// https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
		if (params.meetingId === undefined) {
			return;
		}

		apiCenter.GetMeetingAsync(params.meetingId).then((response) => {
			console.log(response.data);
			setMeeting(response.data);
		});
	}, [params.meetingId]);

	useEffect(() => {
		function addParticipant(userName: string, meetingId: string) {
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
		}
		connection.on('AddParticipant', addParticipant);

		connection.on('SelectPoker', (userName: string, meetingId: string, pokerKey: string) => {
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
				return {...preMeeting};
			});
		});
		connection.start();
	}, [connection]);

	if (!meeting) {
		return <div>Loading</div>;
	}
	return (
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
						navigator.clipboard.writeText(meetingLink);
					}}
				>
					Copy Meeting Link
				</Button>
				<Box>
					<QRCode value={meetingLink} />
				</Box>
			</Stack>
		</Container>
	);
}
