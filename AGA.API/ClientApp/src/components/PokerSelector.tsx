import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import PokerCard, { IPokerCard } from './PokerCard';
import IDeck from '../api/IDeck';
import IPoker from '../api/IPoker';

interface IPokerSelector {
	deck: IDeck;
	onPokerSelected: (poker: IPoker) => void;
	onPokerValueChange: (poker: IPoker, pokerValue: string) => void;
}

const pokerSize = 10;
const selectedPokerSize = 12;

const paddingVertical = 10;

function PokerSelector(props: IPokerSelector) {
	const [selectedPokerId, setSelectedPokerId] = useState<string | undefined>();

	return (
		<Grid
			sx={{
				overflowX: 'auto',
				maxWidth: '100%',
			}}
		>
			<Stack
				direction="row"
				spacing={3}
				sx={{
					minWidth: 'fit-content',
					padding: `${paddingVertical}px ${paddingVertical * 2}px`,
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: `${selectedPokerSize * 24 + paddingVertical * 2}px`,
				}}
			>
				{props.deck.pokers.map((poker: IPoker, index) => (
					<Box
						key={poker.id}
						sx={{
							boxShadow: () => (poker.id === selectedPokerId ? 24 : 'none'),
						}}
					>
						<PokerCard
							poker={poker}
							isShown={true}
							deckId={props.deck.id}
							size={poker.id === selectedPokerId ? selectedPokerSize : pokerSize}
							enableEdit={true}
							onClick={(event: any) => {
								setSelectedPokerId(poker.id);
								props.onPokerSelected(poker);
							}}
							onChange={(pokerId: string, pokerValue: string) => {
								props.onPokerValueChange(poker, pokerValue);
							}}
						/>
					</Box>
				))}
			</Stack>
		</Grid>
	);
}

export default PokerSelector;
