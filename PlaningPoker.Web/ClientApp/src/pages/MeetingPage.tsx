import CenterLayout from './CenterLayout';
import ParticipantsViewer from '../components/ParticipantsViewer';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom';
import IParticipant from '../interfaces/IParticipant';
import apiCenter from '../commons/ApiCenter';
import * as signalR from '@microsoft/signalr';

interface Props {}

interface IParams {
	meetingId: string;
}

export default function MeetingPage(props: Props) {
	const params = useParams<keyof IParams>();
	const [meeting, setMeeting] = useState<any>(null);
	const [isShownAll, setIsShownAll] = useState<any>(false);

	const [connection] = useState<any>(new signalR.HubConnectionBuilder().withUrl('/groominghub').build());
	useEffect(() => {
		// https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
		if (params.meetingId === undefined) {
			return;
		}
		apiCenter.GetMeetingAsync(params.meetingId).then((response) => setMeeting(response.data));
	}, [params.meetingId]);

	useEffect(() => {
		function addParticipant(userName: string, meetingId: string) {
			setMeeting((preMeeting: any) => {
				if (preMeeting == null || meetingId !== preMeeting.id) {
					return preMeeting;
				}
				const part = preMeeting.participants.find((p: any) => p.name === userName);
				console.log(part);
				if (part !== undefined) {
					return preMeeting;
				}
				const participant: IParticipant = {
					name: userName,
					selectedPokerKey: null,
					isShown: isShownAll,
				};
				const newMeeting = {...preMeeting};
				newMeeting.participants = [...newMeeting.participants, participant];
				return newMeeting;
			});
		}
		connection.on('AddParticipant', addParticipant);
		connection.start();
	}, [connection]);

	if (!meeting) {
		return <div>Loading</div>;
	}
	return (
		<>
			<CenterLayout height="20vh">
				<Typography align="center" m={2} variant="h6">
					{meeting.topic}
				</Typography>
				<Divider />
			</CenterLayout>

			<Button
				sx={{
					marginTop: '20px',
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
		</>
	);
}
