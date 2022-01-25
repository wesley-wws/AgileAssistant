import IPokerCard from '../interfaces/IPokerCard';
import PokerCardType from '../interfaces/PokerCardType';

enum PredefinedPokerKeys {
	One = '1',
	Two = '2',
	Three = '3',
	Five = '5',
	Eight = '8',
	Thirteen = '13',
	Twenty = '20',
	Fourty = '40',
	OneHundred = '100',
	Coffee = 'coffee',
}

const predefinedPokers: IPokerCard[] = Object.keys(PredefinedPokerKeys).map((key) => {
	return {
		key: key,
		isShown: false,
		pokerType: PokerCardType.Html,
	};
});

const customPokers_default: IPokerCard[] = ['0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', 'coffee'].map((key) => {
	return {
		key: key,
		isShown: false,
		pokerType: PokerCardType.Svg,
	};
});

export { PredefinedPokerKeys, predefinedPokers, customPokers_default };
