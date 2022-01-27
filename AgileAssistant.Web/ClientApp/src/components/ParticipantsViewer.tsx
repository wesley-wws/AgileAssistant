import { Grid, Box } from '@mui/material';
import ParticipantCard from './ParticipantCard';
import IParticipant from '../contracts/IParticipant';
import IPokerDeck from '../contracts/IPokerDeck';

interface IParticipantsViewer {
	participants: Array<IParticipant>;
	pokerDeck: IPokerDeck;
}

export default function ParticipantsViewer(props: IParticipantsViewer) {
	if (props.participants.length === 0) {
		return <Box p={3}>Waiting...</Box>;
	}
	return (
		<Grid container justifyContent="center" sx={{ minHeight: '100%', width: '100%' }}>
			{props.participants.map((p: IParticipant) => (
				<Grid key={p.name} item p={1}>
					<ParticipantCard {...p} pokerDeck={props.pokerDeck} />
				</Grid>
			))}
		</Grid>
	);
}
