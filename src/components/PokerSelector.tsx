import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Poker from './Poker';
import Grid from '@mui/material/Grid';
import PokerKeys from '../interfaces/PokerKeys';

interface Props {
	onPokerSelected(pokerKey: PokerKeys): void;
}

function PokerSelector(props: Props) {
	return (
		<Grid
			sx={{
				overflowX: 'scroll',
			}}
		>
			<Stack
				direction="row"
				spacing={3}
				sx={{
					minWidth: 'fit-content',
					padding: '10px 20px',
				}}
			>
				{Object.keys(PokerKeys).map((key) => {
					var pokerKey: PokerKeys = PokerKeys[key as keyof typeof PokerKeys];
					return (
						<Box key={pokerKey}>
							<Poker pokerKey={pokerKey} isShown={true} onClick={(e: Event) => props.onPokerSelected(pokerKey)} />
						</Box>
					);
				})}
			</Stack>
		</Grid>
	);
}
export default PokerSelector;
