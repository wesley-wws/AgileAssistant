import IDeck from './IDeck';
import IParticipant from './IParticipant';

export default interface IMeeting {
    id:string;
	topic: string;
	participants: IParticipant[];
	deck:IDeck;
}
