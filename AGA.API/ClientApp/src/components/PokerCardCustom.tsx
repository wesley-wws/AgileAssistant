import Box from '@mui/material/Box';
import '@fontsource/varela-round';
import { Grow, TextField } from '@mui/material';
import { useState } from 'react';
import IPoker from '../api/IPoker';

interface IPokerCard {
	poker:IPoker|undefined,
	isShown: boolean;
	size?: number;
	enableEdit?: boolean;
	onChange?: (pokerId: string, pokerValue: string) => void;
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

export default function PokerCardCustom(props: IPokerCard) {
	//const [pokerValue, setPokerValue] = useState<string | null | undefined>();

	pokerStyle.size = props.size ?? pokerStyle.size;
	pokerStyle.valueLength = props.poker?.value.length ?? pokerStyle.valueLength;

	return (
		<>
			<Box
				sx={{
					width: pokerStyle.width,
					height: pokerStyle.height,
					backgroundColor: pokerStyle.colorDeepBlue,
				}}
			>
				<Grow in={props.isShown}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							width: pokerStyle.width,
							height: pokerStyle.height,
							color: `white`,
							backgroundColor: pokerStyle.colorBlue,
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
								fontSize: pokerStyle.fontSizeEdges,
							}}
						>
							<span style={{ cursor: 'default' }}>{props.poker?.value}</span>
						</Box>
					</Box>
				</Grow>
			</Box>

			{props.enableEdit && (
				<TextField
					sx={{
						marginTop: 2,
					}}
					id="poker-value"
					label="Number"
					type="number"
					variant="standard"
					size="medium"
					onChange={(e) => {
						if (props.onChange && props.poker?.id) {
							props.onChange(props.poker.id, e.target.value);
						}
					}}
				/>
			)}
		</>
	);
}
