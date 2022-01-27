import IPoker from './IPoker';

export default interface IPokerDeck {
	key: string;
	description: string;
	pokers: IPoker[];
}
