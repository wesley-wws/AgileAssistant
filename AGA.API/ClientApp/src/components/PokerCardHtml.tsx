import Box from '@mui/material/Box';
import '@fontsource/varela-round';
import IPoker from '../api/IPoker';

interface IPokerCard {
	poker: IPoker | undefined;
	isShown: boolean;
	size?: number;
	onClick?: (event: any) => void;
}

const pokerStyle = {
	size: 10,
	valueLength: 1,
	get width() {
		return this.size * 16 + 'px';
	},
	get height() {
		return this.size * 24 + 'px';
	},
	get fontSizeCenter() {
		return this.size * 6 * this.fontSizeRadio + 'px';
	},

	get fontSizeEdges() {
		return this.size * 2 * this.fontSizeRadio + 'px';
	},

	get colorGray() {
		return '#686868';
	},

	get colorBlue() {
		return '#1976d2';
	},

	get colorDeepBlue() {
		return `#1565c0`;
	},

	get fontSizeRadio() {
		if (this.valueLength <= 2) {
			return 1.5;
		}
		return 1;
	},
};

export default function PokerCardHtml(props: IPokerCard) {
	pokerStyle.size = props.size ?? pokerStyle.size;
	pokerStyle.valueLength = props.poker?.value.length ?? pokerStyle.valueLength;

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: pokerStyle.width,
				height: pokerStyle.height,
				transition: 'transform 0.4s ease-in-out,width 0.3s, height 0.3s',
				transform: () => (props.isShown ? 'rotateY(180deg) scaleX(-1)' : ''),
				color: () => (props.isShown ? `white` : 'transparent'),
				backgroundColor: () => (props.isShown ? pokerStyle.colorBlue : pokerStyle.colorDeepBlue),
				fontFamily: 'Varela Round',
				backgroundImage: () =>
					props.isShown
						? ''
						: `-webkit-linear-gradient(
					135deg,
					rgba(255, 255, 255, 0.1) 50%,
					transparent,
					transparent
				);`,
			}}
			onClick={props.onClick}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: '5% 5%',
					alignItems: 'start',
					transition: 'font 0.3s',
					fontSize: pokerStyle.fontSizeEdges,
				}}
			>
				<span style={{ cursor: 'default' }}>{props.poker?.value}</span>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					transition: 'font 0.3s',
					fontSize: pokerStyle.fontSizeCenter,
					lineHeight: '100%',
					paddingBottom: '5px',
				}}
			>
				<span style={{ cursor: 'default' }}>{props.poker?.value.slice(0, 3)}</span>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: '5% 5%',
					alignItems: 'end',
					transition: 'font 0.3s',
					fontSize: pokerStyle.fontSizeEdges,
				}}
			>
				<span style={{ cursor: 'default' }}>{props.poker?.value}</span>
			</Box>
		</Box>
	);
}
