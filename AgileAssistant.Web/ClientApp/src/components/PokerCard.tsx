import PokerCardSvg from './PokerCardSvg';
import PokerCardHtml from './PokerCardHtml';
import IPokerCard from '../interfaces/IPokerCard';

export default function PokerCard(props: IPokerCard) {
	if (props.pokerDeck.description === 'Predefined-1') {
		return <PokerCardSvg {...props} />;
	}

	if (props.pokerDeck.description === 'Custom-1') {
		return <PokerCardHtml {...props} />;
	}

	return <PokerCardHtml {...props} />;
}
