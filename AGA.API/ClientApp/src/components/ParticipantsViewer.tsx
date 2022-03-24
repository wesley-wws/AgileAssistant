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
			{props.participants.map((p: IParticipant) => {
				let selectedValue = props.deck.pokers.find((poker) => poker.id === p.selectedPokerId)?.value;
				return (
					<Grid key={p.name} item p={1}>
						<ParticipantCard
							name={p.name}
							isPokerShown={p.isPokerShown}
							deckDescription={props.deck.description}
							selectedPokerId={p.selectedPokerId}
							selectedPokerValue={selectedValue}
						/>
					</Grid>
				);
			})}
		</Grid>
	);
}
