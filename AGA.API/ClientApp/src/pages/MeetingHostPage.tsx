import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Stack, Paper, Typography, Button, Divider, Box, SpeedDial, SpeedDialAction, Backdrop, SpeedDialIcon } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import QRCode from 'qrcode.react';
import * as signalR from '@microsoft/signalr';
import ParticipantsViewer from '../components/ParticipantsViewer';
import apiCenter from '../api/ApiCenter';
import IParticipant from '../api/IParticipant';
import IMeeting from '../api/IMeeting';
import constant from '../contracts/constant';
import IDeck from '../api/IDeck';
import IParticipantPoker from '../api/IParticipantPoker';

interface IParams {
	meetingId: string;
}

interface IHostState {
	meeting: IMeeting;
	deck: IDeck;
}

function getMeetingLink(meetingId: string): string {
	return `${window.location.protocol}//${window.location.host}/launcher/${meetingId}`;
}

//const hubConnection = new signalR.HubConnectionBuilder().withAutomaticReconnect().withUrl(constant.meetingHubUrl).build();

export default function MeetingHostPage() {
	const params = useParams<keyof IParams>();
	const navigate = useNavigate();

	const meetingLink = params.meetingId === undefined ? '' : getMeetingLink(params.meetingId);

	const [meeting, setMeeting] = useState<IMeeting | undefined>();
	const [deck, setDeck] = useState<IDeck | undefined>();
	const [isShownAll, setIsShownAll] = useState<boolean>(false);
	const [isOpenShare, setIsOpenShare] = useState(false);
	const handleOpenShare = () => setIsOpenShare(true);
	const handleCloseShare = () => setIsOpenShare(false);

	useEffect(() => {
		const hubConnection = new signalR.HubConnectionBuilder()
			.withAutomaticReconnect()
			.withUrl(constant.meetingHubUrl + `?meetingId=${params.meetingId}`)
			.build();

		hubConnection.on('AddParticipant', (meetingId: string, participant: IParticipant) => {
			setMeeting((preMeeting) => {
				if (preMeeting === undefined || meetingId !== preMeeting.id) {
					return preMeeting;
				}
				const part = preMeeting.participants.find((p: IParticipant) => p.name === participant.name);
				if (part !== undefined) {
					return preMeeting;
				}

				const newMeeting = { ...preMeeting };
				newMeeting.participants = [...newMeeting.participants, participant];
				return newMeeting;
			});
		});

		hubConnection.on('SelectPokers', (meetingId: string, userName: string, pokers: IParticipantPoker[]) => {
			setMeeting((preMeeting: IMeeting | undefined) => {
				if (preMeeting === undefined || meetingId !== preMeeting.id || pokers.length <= 0) {
					return preMeeting;
				}

				preMeeting.participants = preMeeting.participants.map((p: IParticipant) => {
					if (p.name === userName) {
						return { ...p, selectedPoker: pokers[0], isPickedPoker: true };
					}
					return p;
				});
				return { ...preMeeting };
			});
		});

		hubConnection.start().then(async () => {
			// https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
			if (params.meetingId === undefined) {
				return;
			}

			var response = await apiCenter.getMeetingAsync(params.meetingId);
			const meetingModel = response.data;
			if (meetingModel === undefined) {
				navigate('/error', {
					state: {
						message: 'No meeting record.',
						details: params.meetingId,
					},
				});
				return;
			}

			setMeeting(meetingModel);

			var deckResponse = await apiCenter.getDeckAsync(meetingModel.deckId);
			const deckModel = deckResponse.data;
			if (deckModel === undefined) {
				navigate('/error', {
					state: {
						message: 'No deck record.',
						details: meetingModel.deckId,
					},
				});
				return;
			}

			setDeck(deckModel);
		});

		return () => {
			hubConnection.stop();
		};
	}, []);

	return (
		<>
			{meeting && deck && (
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
								setMeeting((preMeeting: IMeeting | undefined) => {
									if (preMeeting === undefined) {
										return preMeeting;
									}
									preMeeting.participants = preMeeting.participants.map((p: IParticipant) => ({ ...p, isPokerShown: !isShownAll, isPickedPoker: !isShownAll }));
									return preMeeting;
								});
							}}
						>
							Open/Hide
						</Button>
						<ParticipantsViewer participants={meeting.participants} deck={deck} />
					</Stack>
					<Backdrop sx={{ bgcolor: 'gray.900' }} open={isOpenShare}>
						<Box>
							<QRCode value={meetingLink} size={400} />
						</Box>
					</Backdrop>
					<SpeedDial
						ariaLabel="Share"
						open={isOpenShare}
						sx={{ position: 'absolute', bottom: 16, right: 16 }}
						icon={<SpeedDialIcon icon={<ShareIcon />} openIcon={<CloseIcon />} />}
						onClose={handleCloseShare}
						onOpen={handleOpenShare}
					>
						<SpeedDialAction
							key={'Copy Meeting Link'}
							icon={<ContentCopyIcon />}
							tooltipTitle={'Copy Meeting Link'}
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
						/>
					</SpeedDial>
				</Container>
			)}
		</>
	);
}
