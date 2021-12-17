import { useEffect, useState } from 'react';
import CenterLayout from './CenterLayout';
import MeetingsViewer from '../components/MeetingsViewer';
import * as signalR from '@microsoft/signalr';

export default function MeetingsPage() {
	useEffect(() => {
		const hubConnection = new signalR.HubConnectionBuilder().withAutomaticReconnect().withUrl('/groominghub').build();
		hubConnection.start();
		hubConnection.on('clearMeeting', (data) => {
			console.log(data);
		});
		return () => {
			hubConnection.stop();
		};
	});

	return (
		<CenterLayout>
			<MeetingsViewer />
		</CenterLayout>
	);
}
