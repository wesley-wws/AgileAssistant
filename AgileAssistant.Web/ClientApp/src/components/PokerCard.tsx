import PokerCardSvg from './PokerCardSvg';
import PokerCardHtml from './PokerCardHtml';
import IPokerCard from '../interfaces/IPokerCard';
import PokerCardType from '../interfaces/PokerCardType';


export default function PokerCard(props: IPokerCard) {
	switch (props.pokerType) {
		case PokerCardType.Html:
			return <PokerCardHtml {...props} />;
		case PokerCardType.Svg:
			return <PokerCardSvg {...props} />;
        default:
            return <PokerCardHtml {...props} />;
	}
}
