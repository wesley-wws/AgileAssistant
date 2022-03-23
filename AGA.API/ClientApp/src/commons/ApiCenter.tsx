import axios from 'axios';
import IDeck from '../contracts/IDeck';

const apiCenter = {
	GetMeetingsAsync: function () {
		return axios.get('/api/meetings');
	},

	GetMeetingAsync: function (id: string) {
		return axios.get(`/api/meeting/${id}`);
	},

	StartMeetingAsync: function (topic: string, pokerDeckId: string) {
		return axios.post(`/api/meeting/start`, { topic: topic, pokerDeckKey: pokerDeckId });
	},

	JoinMeetingAsync: function (meetingId: string, userName: string) {
		return axios.post(`/api/meeting/${meetingId}/join/${userName}`);
	},

	selectedPokersAsync: function (meetingId: string, userName: string, selectedPokerIds: string[]) {
		return axios.post(`/api/meeting/${meetingId}/participant/selectPokers`, { userName, selectedPokerIds });
	},

	GetDecksAsync: function () {
		return axios.get<IDeck[]>('/api/decks');
	},
};

export default apiCenter;
