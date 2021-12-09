import axios from 'axios';


const apiCenter = {
    GetMeetingsAsync:function(){
        return axios.get('/api/groomingmeetings');
    }
}

export default apiCenter;