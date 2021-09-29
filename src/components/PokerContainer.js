import React from 'react';
import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import { pokerKeys } from '../models/Poker';

import Poker_One from '../images/1.png';
import Poker_Cover from '../images/cover.png';
import Poker_Coffee from '../images/coffee.png';

const styles = {
	root: {
		width: 160,
		height: 240,
		transition: '0.5s ease-in-out',
		backgroundImage: `url(${Poker_Cover})`,
		backgroundSize: 'cover',
	},
	show: (props) => ({
		backgroundImage: `url(${getPokerImage(props.pokerKey)})`,
		transform: 'rotateY(180deg) scaleX(-1)',
	}),
};

function getPokerImage (key) {
	switch (key) {
		case pokerKeys.cover:
			return Poker_Cover;
		case pokerKeys.coffee:
			return Poker_Coffee;
		case pokerKeys.one:
			return Poker_One;
		default:
			return Poker_Cover;
	}
};

function Poker(props) {
	return <div className={`${props.classes.root} ${props.isShown ? props.classes.show : ''}`}></div>;
}

Poker.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Poker);
