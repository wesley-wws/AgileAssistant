import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import PokerCard, { IPokerCard } from './PokerCard';
import IDeck from '../api/IDeck';
import IPoker from '../api/IPoker';

interface IPokerSelector {
	deck: IDeck;
	onPokerSelected(pokerKey: string): void;
}

interface IPokerSelectorCandidate {
	pokerCard: IPokerCard;
	isSelected: boolean;
}

const pokerSize = 10;
const selectedPokerSize = 12;

const paddingVertical = 10;

function PokerSelector(props: IPokerSelector) {

	const defaultPokerCandidates = props.deck.pokers.map((poker: IPoker, index): IPokerSelectorCandidate => {
		let pokerCard: IPokerCard = {
			id: poker.id,
			value: poker.value,
			isShown: true,
			deckDecription: props.deck.description,
		};
		return { pokerCard: pokerCard, isSelected: false };
	});
	
	const [pokerCandidates, setPokerCandidates] = useState<Array<IPokerSelectorCandidate>>(defaultPokerCandidates);
	

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
					minHeight: `${selectedPokerSize * 24 + paddingVertical * 2}px`,
				}}
			>
				{pokerCandidates.map((candidate: IPokerSelectorCandidate) => {
					return (
						<Box
							key={candidate.pokerCard.id}
							sx={{
								boxShadow: () => (candidate.isSelected ? 24 : 'none'),
							}}
							onClick={(event: any) => {
								const newPokerOptions = [...pokerCandidates];

								const selectedIndex = newPokerOptions.findIndex((o) => o.isSelected);
								const selectedPokerOption = { ...newPokerOptions[selectedIndex] };
								selectedPokerOption.isSelected = false;
								newPokerOptions[selectedIndex] = selectedPokerOption;

								const index = newPokerOptions.findIndex((o) => o.pokerCard.id === candidate.pokerCard.id);
								const newPokerOption = { ...newPokerOptions[index] };
								newPokerOption.isSelected = true;
								newPokerOptions[index] = newPokerOption;

								setPokerCandidates(newPokerOptions);
								if (candidate.pokerCard.id !== null && candidate.pokerCard.id !== undefined) {
									props.onPokerSelected(candidate.pokerCard.id);
								}
							}}
						>
							<PokerCard
								id={candidate.pokerCard.id}
								value={candidate.pokerCard.value}
								isShown={candidate.pokerCard.isShown}
								deckDecription={candidate.pokerCard.deckDecription}
								size={candidate.isSelected ? selectedPokerSize : pokerSize}
							/>
						</Box>
					);
				})}
			</Stack>
		</Grid>
	);
}

export default PokerSelector;
