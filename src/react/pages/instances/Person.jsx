import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { InstanceFacet, List } from '../../components';
import { InstanceWrapper } from '../../utils';

class Person extends React.Component {

	render () {

		const { person } = this.props;

		const playtexts = person.get('playtexts');
		const productions = person.get('productions');

		return (
			<InstanceWrapper instance={person}>

				{
					playtexts?.size > 0 && (
						<InstanceFacet labelText='Playtexts'>

							<List instances={playtexts} />

						</InstanceFacet>
					)
				}

				{
					productions?.size > 0 && (
						<InstanceFacet labelText='Productions'>

							<List instances={productions} />

						</InstanceFacet>
					)
				}

			</InstanceWrapper>
		);

	}

}

Person.propTypes = {
	person: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	person: state.get('person')
});

export default connect(mapStateToProps)(Person);
