import Box from '@mui/material/Box';
import IPoker from '../interfaces/IPoker';
import '@fontsource/varela-round';

interface PokerCardProps {
	value: number;
	isShown: boolean;
}

export default function PokerCard(props: PokerCardProps) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '160px',
				height: '240px',
				transition: 'transform 0.5s ease-in-out,width 0.3s, height 0.3s',
				transform: () => (props.isShown ? 'rotateY(180deg) scaleX(-1)' : ''),
				backgroundImage: () => (props.isShown ? `` : ``),
				border: 'solid 2px #686868',
				borderRadius: '10px',
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
				{props.value}
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					fontSize: '80px',
					lineHeight: '100%',
					paddingBottom: '10px',
				}}
			>
				<span>{props.value}</span>
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
				{props.value}
			</Box>
		</Box>
	);
}
