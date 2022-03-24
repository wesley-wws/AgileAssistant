import { Card, CardContent, Typography, Divider } from '@mui/material';
import PokerCard from './PokerCard';

interface IParticipantCard {
	name: string;
	selectedPokerId: string|undefined|null;
	selectedPokerValue: string|undefined|null;
	deckDescription: string;
	isPokerShown: boolean;
}

export default function ParticipantCard(props: IParticipantCard) {
	return (
		<Card elevation={3}>
			{<PokerCard id={props.selectedPokerId} value={props.selectedPokerValue} isShown={props.isPokerShown} deckDecription={props.deckDescription} />}
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
