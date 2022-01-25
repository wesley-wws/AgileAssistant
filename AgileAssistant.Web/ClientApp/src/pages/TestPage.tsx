import Box from '@mui/material/Box';
import PokerCard from '../components/PokerCard';
import PokerCardType from '../interfaces/PokerCardType';

const poker = {
	key: '100',
	isShown: true,
	pokerType: PokerCardType.Html,
};

export default function TestPage(props: any) {
	return <PokerCard {...poker}></PokerCard>;
}
