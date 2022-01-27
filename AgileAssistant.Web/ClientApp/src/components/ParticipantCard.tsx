import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PokerCard from './PokerCard';
import IParticipant from '../interfaces/IParticipant';


interface IProp extends IParticipant {
	pokerDeck: any;
}

export default function ParticipantCard(props: IProp) {
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
