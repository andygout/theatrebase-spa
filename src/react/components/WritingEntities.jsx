import PropTypes from 'prop-types';
import React from 'react';

import { AppendedFormatAndYear, InstanceLink, PrependedSurInstance, WritingCredits } from '.';

const WritingEntities = props => {

	const { entities } = props;

	return (
		<>

			{
				entities
					.map((entity, index) =>
						<React.Fragment key={index}>

							{
								entity.surMaterial && (
									<PrependedSurInstance surInstance={entity.surMaterial} />
								)
							}

							<InstanceLink instance={entity} />

							{
								(entity.format || entity.year) && (
									<AppendedFormatAndYear format={entity.format} year={entity.year} />
								)
							}

							{
								entity.writingCredits?.length > 0 && (
									<>

										<>{' '}</>

										<WritingCredits credits={entity.writingCredits} isAppendage={true} />

									</>
								)
							}

						</React.Fragment>
					)
					.reduce((prev, curr, currentIndex) => {

						let separator = ', ';

						if (entities.length === 2) {

							separator = ' and ';

						} else {

							const isFinalIteration = currentIndex === entities.length - 1;

							if (isFinalIteration) separator = ', and ';

						}

						return [prev, separator, curr];

					})
			}

		</>
	);

};

WritingEntities.propTypes = {
	entities: PropTypes.array.isRequired
};

export default WritingEntities;
