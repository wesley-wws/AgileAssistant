import { useEffect, useState } from 'react';
import CenterLayout from './CenterLayout';
import MeetingsViewer from '../components/MeetingsViewer';
import * as signalR from '@microsoft/signalr';
import constant from '../contracts/constance';

export default function MeetingsPage() {
	useEffect(() => {
		const hubConnection = new signalR.HubConnectionBuilder().withAutomaticReconnect().withUrl(constant.meetingHubUrl).build();
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
