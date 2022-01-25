import PokerRenderType from './PokerRenderType';

export default interface IPokerCard {
	key: string;
	isShown: boolean;
	size?: number;
	renderType: PokerRenderType;
}
