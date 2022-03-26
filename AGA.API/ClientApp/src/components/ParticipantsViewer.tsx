import { Grid, Box } from '@mui/material';
import ParticipantCard from './ParticipantCard';
import IParticipant from '../api/IParticipant';
import IDeck from '../api/IDeck';

interface IParticipantsViewer {
	participants: Array<IParticipant>;
	deck: IDeck;
}

export default function ParticipantsViewer(props: IParticipantsViewer) {
	if (props.participants.length === 0) {
		return <Box p={3}>Waiting...</Box>;
	}
	return (
		<Grid container justifyContent="center" sx={{ minHeight: '100%', width: '100%' }}>
			{props.participants.map((participant: IParticipant) => {
				return (
					<Grid key={participant.name} item p={1}>
						<ParticipantCard {...participant} deckId={props.deck.id} />
					</Grid>
				);
			})}
		</Grid>
	);
}
