import axios from 'axios';
import IDeck from './IDeck';
import IMeeting from './IMeeting';

const apiCenter = {
	getMeetingsAsync: function () {
		return axios.get<IMeeting[]>('/api/meetings');
	},

	getMeetingAsync: function (id: string) {
		return axios.get<IMeeting|null>(`/api/meeting/${id}`);
	},

	startMeetingAsync: function (topic: string, deckId: string) {
		return axios.post<IMeeting>(`/api/meeting/start`, { topic: topic, deckId: deckId });
	},

	joinMeetingAsync: function (meetingId: string, userName: string) {
		return axios.post(`/api/meeting/${meetingId}/join/${userName}`);
	},

	selectedPokersAsync: function (meetingId: string, userName: string, selectedPokerIds: string[]) {
		return axios.post(`/api/meeting/${meetingId}/participant/selectPokers`, { meetingId,userName, selectedPokerIds });
	},

	getDecksAsync: function () {
		return axios.get<IDeck[]>('/api/decks');
	},
	
	getDeckAsync: function (deckId: string) {
		return axios.get<IDeck|null>(`/api/deck/${deckId}`);
	},

};

export default apiCenter;
