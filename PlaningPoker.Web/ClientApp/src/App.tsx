import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ParticipantCard from './components/ParticipantCard';
import PokerKeys from './interfaces/PokerKeys';
import PokerSelector from './components/PokerSelector';
import MeetingViewer from './components/MeetingsViewer';
import MeetingLauncher from './components/MeetingLauncher';
import * as signalR from '@microsoft/signalr';

const participants = [
	{
		userName: 'Wesley',
		pokerKey: PokerKeys.One,
		isShown: false,
	},
	{
		userName: 'Rick',
		pokerKey: PokerKeys.Coffee,
		isShown: false,
	},
	{
		userName: 'Rick2',
		pokerKey: PokerKeys.Coffee,
		isShown: false,
	},
	{
		userName: 'Rick3',
		pokerKey: PokerKeys.Coffee,
		isShown: false,
	},
	{
		userName: 'Rick4',
		pokerKey: PokerKeys.Coffee,
		isShown: false,
	},
	{
		userName: 'Rick5',
		pokerKey: PokerKeys.Coffee,
		isShown: false,
	},
	{
		userName: 'Rick6',
		pokerKey: PokerKeys.Coffee,
		isShown: false,
	},
	{
		userName: 'Rick7',
		pokerKey: PokerKeys.Coffee,
		isShown: false,
	},
];

const drawerWidth = 240;

class App extends React.Component<any, any> {
	_connection: signalR.HubConnection | null = null;

	constructor(props: any) {
		super(props);

		this.state = {
			participants: participants,
			selectedPokerKey: '',
			inputUserName: '',
		};
	}

	componentDidMount() {
		this._connection = new signalR.HubConnectionBuilder().withUrl('/groominghub').build();
		this._connection.on('selectPoker', (model: any) => {
			this.setState((state: any) => {
				const participants = state.participants.map((p: any) => {
					if (p.userName === model.userName) {
						p.pokerKey = model.pokerKey;
					}
					return p;
				});
				return {
					participants: participants,
				};
			});
		});

		this._connection.start();
	}

	updateState() {
		this.setState((state: any) => {
			const participants = state.participants.map((p: any) => ({ ...p, isShown: !p.isShown }));
			return {
				participants: participants,
			};
		});
	}

	renderParticipantsContainer() {
		return (
			<Grid container spacing={3} justifyContent="space-around">
				{this.state.participants.map((p: any) => (
					<Grid key={p.userName} item>
						<ParticipantCard participant={p} />
					</Grid>
				))}
			</Grid>
		);
	}

	render() {
		return (
			<>
				<Grid
					container
					sx={{
						width: `calc(100% - ${drawerWidth}px)`,
						marginRight: `${drawerWidth}px`,
					}}
				>
					<Stack
						justifyContent="center"
						alignItems="center"
						spacing={2}
						sx={{
							minWidth: `calc(100% - ${drawerWidth}px)`,
						}}
					>
						{this.renderParticipantsContainer()}
						<PokerSelector
							onPokerSelected={(key) =>
								this.setState({
									selectedPokerKey: key,
								})
							}
						/>
						<MeetingViewer />
						<MeetingLauncher />
					</Stack>
				</Grid>
				<Drawer
					open
					anchor="right"
					variant="permanent"
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							boxSizing: 'border-box',
						},
					}}
				>
					<Button
						sx={{
							marginTop: '20px',
						}}
						variant="contained"
						color="primary"
						onClick={(e) => this.updateState()}
					>
						Open/Hide
					</Button>
					<TextField
						sx={{
							marginTop: '20px',
						}}
						label="Selected Poker"
						variant="outlined"
						value={this.state.selectedPokerKey}
						InputProps={{
							readOnly: true,
						}}
					/>
					<TextField
						sx={{
							marginTop: '20px',
						}}
						label="User Name"
						variant="outlined"
						value={this.state.inputUserName}
						onChange={(e) =>
							this.setState({
								inputUserName: e.target.value,
							})
						}
					/>
					<Button
						sx={{
							marginTop: '20px',
						}}
						variant="contained"
						color="primary"
						onClick={(e) => {
							this._connection?.send('selectPoker', this.state.inputUserName, this.state.selectedPokerKey);
						}}
					>
						Select Poker
					</Button>
				</Drawer>
			</>
		);
	}
}

export default App;
