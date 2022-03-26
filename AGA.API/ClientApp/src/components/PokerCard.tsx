import PokerCardSvg from './PokerCardSvg';
import PokerCardHtml from './PokerCardHtml';
import PokerCardCustom from './PokerCardCustom';
import IPoker from '../api/IPoker';

interface IPokerCard {
	poker: IPoker|undefined;
	isShown: boolean;
	size?: number;
	deckId: string;
	onClick?: (event: any) => void;
	enableEdit?: boolean;
	onChange?: (pokerId: string, pokerValue: string) => void;
}

const PokerCard = function PokerCard(props: IPokerCard) {
	if (props.deckId === '6fdf6ffc-ed77-94fa-407e-a7b86ed9e591') {
		return <PokerCardSvg {...props} onClick={props.onClick} />;
	}

	if (props.deckId === '6fdf6ffc-ed77-94fa-407e-a7b86ed9e592') {
		return <PokerCardHtml {...props} onClick={props.onClick} />;
	}

	if (props.deckId === '6fdf6ffc-ed77-94fa-407e-a7b86ed9e593') {
		return <PokerCardCustom {...props} onChange={props.onChange} />;
	}

	return <PokerCardCustom {...props} onChange={props.onChange} />;
};

export { PokerCard as default };
export type { IPokerCard };
