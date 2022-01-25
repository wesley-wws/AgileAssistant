import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PokerCard from './PokerCard';
import IParticipant from '../interfaces/IParticipant';

import PokerRenderType from '../interfaces/PokerRenderType';

export default function ParticipantCard(props: IParticipant) {
	return (
		<Card elevation={3}>
			{props.selectedPokerKey && <PokerCard renderType={PokerRenderType.Svg} key={props.selectedPokerKey} isShown={props.isShown} />}
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
