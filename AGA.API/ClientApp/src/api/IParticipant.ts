import IParticipantPoker from './IParticipantPoker';

export default interface IParticipant {
	name: string;
	deckId:string;
	isPokerShown: boolean;
	selectedPoker: IParticipantPoker | undefined;
}
