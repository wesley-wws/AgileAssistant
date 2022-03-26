import axios from 'axios';
import IDeck from './IDeck';
import IMeeting from './IMeeting';
import IParticipantPoker from './IParticipantPoker';

const apiCenter = {
	getMeetingsAsync: function () {
		return axios.get<IMeeting[]>('/api/meetings');
	},

	getMeetingAsync: function (id: string) {
		return axios.get<IMeeting | undefined>(`/api/meeting/${id}`);
	},

	startMeetingAsync: function (topic: string, deckId: string) {
		return axios.post<IMeeting>(`/api/meeting/start`, { topic: topic, deckId: deckId });
	},

	joinMeetingAsync: function (meetingId: string, userName: string) {
		return axios.post(`/api/meeting/${meetingId}/join/${userName}`);
	},

	selectedPokerAsync: function (meetingId: string, userName: string, selectedPoker: IParticipantPoker) {
		return axios.post(`/api/meeting/${meetingId}/participant/selectPokers`, { meetingId, userName, selectedPokers: [selectedPoker] });
	},

	selectedPokersAsync: function (meetingId: string, userName: string, selectedPokers: IParticipantPoker[]) {
		return axios.post(`/api/meeting/${meetingId}/participant/selectPokers`, { meetingId, userName, selectedPokers });
	},

	getDecksAsync: function () {
		return axios.get<IDeck[]>('/api/decks');
	},

	getDeckAsync: function (deckId: string) {
		return axios.get<IDeck | undefined>(`/api/deck/${deckId}`);
	},
};

export default apiCenter;
