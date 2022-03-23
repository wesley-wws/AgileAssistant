import { Card, CardContent, Typography, Divider } from '@mui/material';
import PokerCard from './PokerCard';
import IParticipant from '../contracts/IParticipant';
import IDeck from '../contracts/IDeck';

interface IParticipantCard extends IParticipant {
	deck: IDeck;
}

export default function ParticipantCard(props: IParticipantCard) {
	return (
		<Card elevation={3}>
			{props.selectedPokerIds && <PokerCard value={props.selectedPokerIds} isShown={props.isShown} deck={props.deck} />}
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
