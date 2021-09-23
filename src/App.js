import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Participant from './components/Participant';
import { pokerKeys } from './models/Poker';

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

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			participants: participants,
		};
	}

	updateState() {
		this.setState((state) => {
			const participants = state.participants.map((p) => ({ ...p, isShown: !p.isShown }));
			return {
				participants: participants,
			};
		});
	}

	renderParticipantContainer() {
		return (
			<Grid container spacing={3} justifyContent="space-around" className={this.props.classes.participantContainer}>
				{this.state.participants.map((p) => (
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

App.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
