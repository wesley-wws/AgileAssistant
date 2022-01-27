import Box from '@mui/material/Box';
import PokerCard from '../components/PokerCard';
import PokerRenderType from '../interfaces/PokerRenderType';

const poker = {
	value: '100',
	isShown: true,
	renderType: PokerRenderType.Html,
};

export default function TestPage(props: any) {
	return <PokerCard pokerDeck={[]} {...poker}></PokerCard>;
}
