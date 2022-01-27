import PokerCardSvg from './PokerCardSvg';
import PokerCardHtml from './PokerCardHtml';
import IPokerDeck from '../contracts/IPokerDeck';
import IPoker from '../contracts/IPoker';

interface IPokerCard extends IPoker {
	isShown: boolean;
	size?: number;
	pokerDeck: IPokerDeck;
}

const PokerCard = function PokerCard(props: IPokerCard) {
	if (props.pokerDeck.description === 'Predefined-1') {
		return <PokerCardSvg {...props} />;
	}

	if (props.pokerDeck.description === 'Custom-1') {
		return <PokerCardHtml {...props} />;
	}

	return <PokerCardHtml {...props} />;
};

export { PokerCard as default };
export type { IPokerCard };
