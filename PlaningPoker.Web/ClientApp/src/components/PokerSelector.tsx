import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Poker from './Poker';
import Grid from '@mui/material/Grid';
import PokerKeys from '../interfaces/PokerKeys';

interface Props {
	onPokerSelected(pokerKey: PokerKeys): void;
}

interface PokerOption {
	pokerKey: PokerKeys;
	isSelected: boolean;
}

const pokerWidth = 160;
const pokerHeight = 240;
const selectedPokerWidth = 192;
const selectedPokerHeight = 288;

const paddingVertical = 10;

function PokerSelector(props: Props) {
	const [selectedPokerKey, setSelectedPoker] = useState<PokerKeys | null>(null);

	const defaultPokerOptions = Object.keys(PokerKeys).map((key: string): PokerOption => {
		var pokerKey: PokerKeys = PokerKeys[key as keyof typeof PokerKeys];
		return {
			pokerKey: pokerKey,
			isSelected: false,
		};
	});

	const [pokerOptions, setPokerOptions] = useState<Array<PokerOption>>(defaultPokerOptions);

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
					padding: `${paddingVertical}px ${paddingVertical * 2}px`,
					alignItems: 'center',
					minHeight: `${selectedPokerHeight + paddingVertical * 2}px`,
				}}
			>
				{pokerOptions.map((pokerOption: PokerOption) => {
					return (
						<Box
							key={pokerOption.pokerKey}
							sx={{
								boxShadow: () => (pokerOption.pokerKey === selectedPokerKey ? 24 : 'none'),
							}}
							onClick={(event: any) => {
								setSelectedPoker(pokerOption.pokerKey);

								const newPokerOptions = [...pokerOptions];

								const selectedIndex = newPokerOptions.findIndex((o) => o.isSelected);
								const selectedPokerOption = { ...newPokerOptions[selectedIndex] };
								selectedPokerOption.isSelected = false;
								newPokerOptions[selectedIndex] = selectedPokerOption;

								const index = newPokerOptions.findIndex((o) => o.pokerKey === pokerOption.pokerKey);
								const newPokerOption = { ...newPokerOptions[index] };
								newPokerOption.isSelected = true;
								newPokerOptions[index] = newPokerOption;

								setPokerOptions(newPokerOptions);

								props.onPokerSelected(pokerOption.pokerKey);
							}}
						>
							<Poker pokerKey={pokerOption.pokerKey} isShown={true} width={pokerOption.isSelected ? selectedPokerWidth : pokerWidth} height={pokerOption.isSelected ? selectedPokerHeight : pokerHeight} />
						</Box>
					);
				})}
			</Stack>
		</Grid>
	);
}

export default PokerSelector;
