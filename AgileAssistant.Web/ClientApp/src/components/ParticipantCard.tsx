import { Card, CardContent, Typography, Divider } from '@mui/material';
import PokerCard from './PokerCard';
import IParticipant from '../contracts/IParticipant';
import IPokerDeck from '../contracts/IPokerDeck';

interface IParticipantCard extends IParticipant {
	pokerDeck: IPokerDeck;
}

export default function ParticipantCard(props: IParticipantCard) {
	return (
		<Card elevation={3}>
			{props.selectedPokerKey && <PokerCard value={props.selectedPokerKey} isShown={props.isShown} pokerDeck={props.pokerDeck} />}
			<Divider />
			<CardContent
				sx={{
					'&:last-child': {
						paddingBottom: '16px',
					},
				}}
			>
				<Typography align="center">{props.name}</Typography>
			</CardContent>
		</Card>
	);
}
