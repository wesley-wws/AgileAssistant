import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
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
