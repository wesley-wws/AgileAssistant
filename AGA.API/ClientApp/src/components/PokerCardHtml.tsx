import Box from '@mui/material/Box';
import '@fontsource/varela-round';

interface IPokerCard{
	id:string|undefined|null;
    value:string|undefined|null;
	isShown: boolean;
	size?: number;
	deckDecription: string;
}

const pokerStyle = {
	size: 10,
	get width() {
		return this.size * 16 + 'px';
	},
	get height() {
		return this.size * 24 + 'px';
	},
	get fontSizeCenter() {
		return this.size * 6 + 'px';
	},
};

export default function PokerCardHtml(props: IPokerCard) {
	pokerStyle.size = props.size ?? pokerStyle.size;

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: pokerStyle.width,
				height: pokerStyle.height,
				transition: 'transform 0.5s ease-in-out,width 0.3s, height 0.3s',
				transform: () => (props.isShown ? 'rotateY(180deg) scaleX(-1)' : ''),
				backgroundImage: () => (props.isShown ? `` : ``),
				border: 'solid 2px #686868',
				borderRadius: '3px',
				fontFamily: 'Varela Round',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: '5% 5%',
					alignItems: 'start',
				}}
			>
				<span>{props.value}</span>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					fontSize: pokerStyle.fontSizeCenter,
					lineHeight: '100%',
					paddingBottom: '10px',
				}}
			>
				<span>{props.value?.slice(0,3)}</span>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: '5% 5%',
					alignItems: 'end',
				}}
			>
				<span>{props.value}</span>
			</Box>
		</Box>
	);
}
