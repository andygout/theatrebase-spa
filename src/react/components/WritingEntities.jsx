import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { AppendedFormatAndYear, InstanceLink, WritingCredits } from '.';

const WritingEntities = props => {

	const { entities } = props;

	return (
		<React.Fragment>

			{
				entities
					.map((entity, index) =>
						<React.Fragment key={index}>

							{
								entity.get('uuid')
									? <InstanceLink instance={entity} />
									: entity.get('name')
							}

							{
								(entity.get('format') || entity.get('year')) && (
									<AppendedFormatAndYear format={entity.get('format')} year={entity.get('year')} />
								)
							}

							{
								entity.get('writingCredits')?.size > 0 && (
									<React.Fragment>&nbsp;

										<WritingCredits
											writingCredits={entity.get('writingCredits')}
											isAppendage={true}
										/>

									</React.Fragment>
								)
							}

						</React.Fragment>
					)
					.reduce((prev, curr) => [prev, ', ', curr])
			}

		</React.Fragment>
	);

};

WritingEntities.propTypes = {
	entities: ImmutablePropTypes.list.isRequired
};

export default WritingEntities;
