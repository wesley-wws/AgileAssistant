import PokerCardSvg from './PokerCardSvg';
import PokerCardHtml from './PokerCardHtml';
import IDeck from '../contracts/IDeck';
import IPoker from '../contracts/IPoker';

interface IPokerCard extends IPoker {
	isShown: boolean;
	size?: number;
	deck: IDeck;
}

const PokerCard = function PokerCard(props: IPokerCard) {
	if (props.deck.description === 'Predefined-1') {
		return <PokerCardSvg {...props} />;
	}

	if (props.deck.description === 'Custom-1') {
		return <PokerCardHtml {...props} />;
	}

	return <PokerCardHtml {...props} />;
};

export { PokerCard as default };
export type { IPokerCard };
