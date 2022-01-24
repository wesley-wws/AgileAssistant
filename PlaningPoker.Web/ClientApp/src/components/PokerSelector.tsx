import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PokerCardSvg from './PokerCardSvg';
import Grid from '@mui/material/Grid';
import PokerKeys from '../interfaces/PokerKeys';

interface Props {
	onPokerSelected(pokerKey: PokerKeys): void;
}

interface PokerOption {
	pokerKey: PokerKeys;
	isSelected: boolean;
}

const pokerSize = 10;
const selectedPokerSize = 12;

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
					minHeight: `${selectedPokerSize * 16 + paddingVertical * 2}px`,
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
							<PokerCardSvg key={pokerOption.pokerKey} isShown={true} size={pokerOption.isSelected ? selectedPokerSize : pokerSize} />
						</Box>
					);
				})}
			</Stack>
		</Grid>
	);
}

export default PokerSelector;
