import React from 'react';
import { withStyles, WithStyles }  from '@mui/styles';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Participant from './components/Participant';
import  pokerKeys  from './models/PokerKeys';

const participants = [
	{
		userName: 'Wesley',
		pokerKey: pokerKeys.one,
		isShown: false,
	},
	{
		userName: 'Rick',
		pokerKey: pokerKeys.coffee,
		isShown: false,
	},
	{
		userName: 'Rick2',
		pokerKey: pokerKeys.coffee,
		isShown: false,
	},
	{
		userName: 'Rick3',
		pokerKey: pokerKeys.coffee,
		isShown: false,
	},
	{
		userName: 'Rick4',
		pokerKey: pokerKeys.coffee,
		isShown: false,
	},
	{
		userName: 'Rick5',
		pokerKey: pokerKeys.coffee,
		isShown: false,
	},
	{
		userName: 'Rick6',
		pokerKey: pokerKeys.coffee,
		isShown: false,
	},
	{
		userName: 'Rick7',
		pokerKey: pokerKeys.coffee,
		isShown: false,
	},
];

const drawerWidth = 240;
const styles = {
	root: {
		display: 'flex',
	},
	participantContainer: {
		padding: '20px',
		width: `calc(100% - ${drawerWidth}px)`,
		marginRight: drawerWidth,
	},
	drawerPaper: {
		width: drawerWidth,
	},
};

class App extends React.Component<WithStyles<typeof styles>, any> {
	constructor(props: WithStyles<typeof styles>) {
		super(props);

		this.state = {
			participants: participants,
		};
	}

	updateState() {
		this.setState((state: any) => {
			const participants = state.participants.map((p:any) => ({ ...p, isShown: !p.isShown }));
			return {
				participants: participants,
			};
		});
	}

	renderParticipantContainer() {
		return (
			<Grid container spacing={3} justifyContent="space-around" className={this.props.classes.participantContainer}>
				{this.state.participants.map((p:any) => (
					<Grid key={p.userName} item>
						<Participant userName={p.userName} pokerKey={p.pokerKey} isShown={p.isShown} />
					</Grid>
				))}
			</Grid>
		);
	}

	render() {
		return (
			<div className={this.props.classes.root}>
				{this.renderParticipantContainer()}
				<Drawer
					open
					anchor="right"
					variant="permanent"
					classes={{
						paper: this.props.classes.drawerPaper,
					}}
				>
					<Button variant="contained" color="primary" onClick={(e) => this.updateState()}>
						hello world
					</Button>
				</Drawer>
			</div>
		);
	}
}

export default withStyles(styles)(App);
