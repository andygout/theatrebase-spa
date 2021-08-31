import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import { CommaSeparatedInstanceLinks, InstanceLink } from '.';

const AppendedCreditedEmployerCompany = props => {

	const { creditedEmployerCompany } = props;

	return (
		<React.Fragment>

			<React.Fragment>&nbsp;(</React.Fragment>

			{
				creditedEmployerCompany.get('coCreditedMembers')?.size > 0 && (
					<React.Fragment>

						<React.Fragment>with&nbsp;</React.Fragment>

						<CommaSeparatedInstanceLinks instances={creditedEmployerCompany.get('coCreditedMembers')} />

						<React.Fragment>&nbsp;</React.Fragment>

					</React.Fragment>
				)
			}

			<React.Fragment>for&nbsp;</React.Fragment>

			<InstanceLink instance={creditedEmployerCompany} />

			<React.Fragment>)</React.Fragment>

		</React.Fragment>
	);

};

AppendedCreditedEmployerCompany.propTypes = {
	creditedEmployerCompany: PropTypes.instanceOf(Map).isRequired
};

export default AppendedCreditedEmployerCompany;
