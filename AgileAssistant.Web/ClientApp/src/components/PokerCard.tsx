import PokerCardSvg from './PokerCardSvg';
import PokerCardHtml from './PokerCardHtml';
import IPokerCard from '../interfaces/IPokerCard';
import PokerRenderType from '../interfaces/PokerRenderType';


export default function PokerCard(props: IPokerCard) {
	switch (props.renderType) {
		case PokerRenderType.Html:
			return <PokerCardHtml {...props} />;
		case PokerRenderType.Svg:
			return <PokerCardSvg {...props} />;
        default:
            return <PokerCardHtml {...props} />;
	}
}
