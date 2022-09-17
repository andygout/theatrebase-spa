import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ListWrapper } from '../../utils';

const Materials = props => {

	const { materials } = props;

	return (
		<ListWrapper
			instances={materials}
			pageTitleText='Materials'
		>
		</ListWrapper>
	);

};

Materials.propTypes = {
	materials: ImmutablePropTypes.list.isRequired
};

const mapStateToProps = state => ({
	materials: state.get('materials')
});

export default connect(mapStateToProps)(Materials);
