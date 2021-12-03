import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Poker from './Poker';

interface Props {
	userName: string;
	pokerKey: string;
	isShown: boolean;
}

export default function Participant(props: Props) {
	return (
		<Card elevation={3}>
			<Poker pokerKey={props.pokerKey} isShown={props.isShown} />
			<Divider />
			<CardContent
				sx={{
					'&:last-child': {
						paddingBottom: '16px',
					},
				}}
			>
				<Typography align="center">{props.userName}</Typography>
			</CardContent>
		</Card>
	);
}
