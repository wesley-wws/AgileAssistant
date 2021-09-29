import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PokerContainer from './PokerContainer';

const useStyles = makeStyles({
	cardContent: {
		padding: 16,
		'&:last-child': {
			paddingBottom: 16,
		},
	},
});

export default function Participant(props) {
	const classes = useStyles();

	return (
		<Card elevation={3}>
			<PokerContainer pokerKey={props.pokerKey} isShown={props.isShown} />
			<Divider />
			<CardContent classes={{ root: classes.cardContent }}>
				<Typography align="center">{props.userName}</Typography>
			</CardContent>
		</Card>
	);
}
