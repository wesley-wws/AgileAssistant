import PokerCardSvg from './PokerCardSvg';
import PokerCardHtml from './PokerCardHtml';

interface IPokerCard{
	id:string|undefined|null;
    value:string|undefined|null;
	isShown: boolean;
	size?: number;
	deckDecription: string;
}

const PokerCard = function PokerCard(props: IPokerCard) {
	if (props.deckDecription === 'Predefined-1') {
		return <PokerCardSvg {...props} />;
	}

	if (props.deckDecription === 'Custom-1') {
		return <PokerCardHtml {...props} />;
	}

	return <PokerCardHtml {...props} />;
};

export { PokerCard as default };
export type { IPokerCard };
