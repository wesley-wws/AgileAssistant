import Box from '@mui/material/Box';
import PokerKeys from '../interfaces/PokerKeys';

import Poker_1 from '../images/1.png';
import Poker_2 from '../images/2.png';
import Poker_3 from '../images/3.png';
import Poker_5 from '../images/5.png';
import Poker_8 from '../images/8.png';
import Poker_13 from '../images/13.png';
import Poker_20 from '../images/20.png';
import Poker_40 from '../images/40.png';
import Poker_100 from '../images/100.png';
import Poker_Cover from '../images/cover.png';
import Poker_Coffee from '../images/coffee.png';

function getPokerImage(key: PokerKeys) {
	switch (key) {
		case PokerKeys.Cover:
			return Poker_Cover;
		case PokerKeys.Coffee:
			return Poker_Coffee;
		case PokerKeys.One:
			return Poker_1;
		case PokerKeys.Two:
			return Poker_2;
		case PokerKeys.Three:
			return Poker_3;
		case PokerKeys.Five:
			return Poker_5;
		case PokerKeys.Eight:
			return Poker_8;
		case PokerKeys.Thirteen:
			return Poker_13;
		case PokerKeys.Twenty:
			return Poker_20;
		case PokerKeys.Fourty:
			return Poker_40;
		case PokerKeys.OneHundred:
			return Poker_100;
		default:
			return Poker_Cover;
	}
}

const getSX = (props: any) => {
	return {
		width: '160px',
		height: '240px',
		transition: '0.5s ease-in-out',
		transform: () => (props.isShown ? 'rotateY(180deg) scaleX(-1)' : ''),
		backgroundSize: 'cover',
		backgroundImage: () => (props.isShown ? `url(${getPokerImage(props.pokerKey)})` : `url(${Poker_Cover})`),
	};
};

function Poker(props: any) {
	return <Box sx={getSX(props)}></Box>;
}

export default Poker;
