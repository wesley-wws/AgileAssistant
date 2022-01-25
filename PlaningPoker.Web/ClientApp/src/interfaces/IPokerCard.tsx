import PokerCardType from './PokerCardType';

export default interface IPokerCard {
	key?: string;
	isShown: boolean;
	size?: number;
	pokerType: PokerCardType;
}
