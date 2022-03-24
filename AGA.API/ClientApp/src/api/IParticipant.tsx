export default interface IParticipant {
	name: string;
	isPokerShown: boolean;
	selectedPokerIds: string[];
	selectedPokerId: string|null|undefined;
}
