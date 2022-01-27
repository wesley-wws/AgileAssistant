import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IParticipant from '../interfaces/IParticipant';
import ParticipantCard from './ParticipantCard';

interface Props {
	participants: Array<IParticipant>;
	pokerDeck: any;
}

export default function ParticipantsViewer(props: Props) {
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
