import axios from 'axios';
import IPokerDeck from '../contracts/IPokerDeck';

const apiCenter = {
	GetMeetingsAsync: function () {
		return axios.get('/api/groomingmeetings');
	},

	GetMeetingAsync: function (id: string) {
		return axios.get(`/api/groomingmeetings/${id}`);
	},

	AddMeetingAsync: function (topic: string, pokerDeckKey: string) {
		return axios.post(`/api/groomingmeetings`, { topic: topic, pokerDeckKey: pokerDeckKey });
	},

	JoinMeeting: function (meetingId: string, userName: string) {
		return axios.post(`/api/groomingmeetings/${meetingId}/join/${userName}`, {});
	},

	updateSelectedPoker: function (meetingId: string, userName: string, selectedPokerKey: string) {
		return axios.post(`/api/groomingmeetings/${meetingId}/participants/${userName}/selectedPoker/${selectedPokerKey}`);
	},
	
	updateSelectedPokers: function (meetingId: string, userName: string, selectedPokerKeys: string[]) {
		return axios.post(`/api/groomingmeetings/${meetingId}/participants/${userName}/selectedPokers`,selectedPokerKeys);
	},

	GetPokerDecks: function () {
		return axios.get<IPokerDeck[]>('/api/pokerdecks');
	},
};

export default apiCenter;
