import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContentWrapper from '../../components/content-wrapper';
import InstanceWrapper from '../../utils/instance-wrapper';

class Character extends Component {

	render () {

		const { character } = this.props;

		return (
			<InstanceWrapper instance={character}>

				{
					character.playtexts && character.playtexts.length ?
						<ContentWrapper labelText='Playtexts' instance={character.playtexts} /> :
						null
				}

				{
					character.variantNames && character.variantNames.length ?
						<ContentWrapper labelText='Variant names' instance={character.variantNames} join /> :
						null
				}

				{
					character.productions && character.productions.length ?
						<ContentWrapper labelText='Productions' instance={character.productions} /> :
						null
				}

			</InstanceWrapper>
		);

	};

};

Character.propTypes = { character: PropTypes.object.isRequired };

const mapStateToProps = ({ character }) => ({ character });

export default connect(mapStateToProps)(Character);