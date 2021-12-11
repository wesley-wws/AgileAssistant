import axios from 'axios';

const apiCenter = {
	GetMeetingsAsync: function () {
		return axios.get('/api/groomingmeetings');
	},

	GetMeetingAsync: function (id: string) {
		return axios.get(`/api/groomingmeetings/${id}`);
	},
};

export default apiCenter;
