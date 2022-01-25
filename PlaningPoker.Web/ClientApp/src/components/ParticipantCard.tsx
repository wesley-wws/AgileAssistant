import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PokerCard from './PokerCard';
import IParticipant from '../interfaces/IParticipant';

import PokerCardType from '../interfaces/PokerCardType';

interface Props {
	participant: IParticipant;
}

export default function ParticipantCard(props: Props) {
	return (
		<Card elevation={3}>
			<PokerCard pokerType={PokerCardType.Svg} key={props.participant.selectedPokerKey} isShown={props.participant.isShown} />
			<Divider />
			<CardContent
				sx={{
					'&:last-child': {
						paddingBottom: '16px',
					},
				}}
			>
				<Typography align="center">{props.participant.name}</Typography>
			</CardContent>
		</Card>
	);
}
