import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getIn } from '../../../lib/object-interactions';
import { capitalise } from '../../../lib/strings';
import {
	AppendedFormatAndYear,
	CharactersList,
	CommaSeparatedMaterials,
	CommaSeparatedProductions,
	Entities,
	InstanceFacet,
	InstanceLink,
	ListWrapper,
	MaterialLinkWithContext,
	MaterialsList,
	ProductionsList,
	WritingCredits
} from '../../components';
import { InstancePageWrapper } from '../../page-wrappers';

const Material = props => {

	const { material } = props;

	const {
		format,
		year,
		writingCredits,
		surMaterial,
		subMaterials,
		characterGroups,
		originalVersionMaterial,
		subsequentVersionMaterials,
		productions,
		sourcingMaterials,
		sourcingMaterialProductions,
		awards,
		subsequentVersionMaterialAwards,
		sourcingMaterialAwards
	} = material;

	return (
		<InstancePageWrapper instance={material}>

			{
				format && (
					<InstanceFacet labelText='Format'>

						<>{ capitalise(format) }</>

					</InstanceFacet>
				)
			}

			{
				year && (
					<InstanceFacet labelText='Year'>

						<>{ year }</>

					</InstanceFacet>
				)
			}

			{
				writingCredits?.length > 0 && (
					<InstanceFacet labelText='Writers'>

						<WritingCredits credits={writingCredits} isAppendage={false} />

					</InstanceFacet>
				)
			}

			{
				surMaterial && (
					<InstanceFacet labelText='Part of'>

						<MaterialLinkWithContext material={surMaterial} />

					</InstanceFacet>
				)
			}

			{
				subMaterials?.length > 0 && (
					<InstanceFacet labelText='Comprises'>

						<MaterialsList materials={subMaterials} />

					</InstanceFacet>
				)
			}

			{
				characterGroups?.length > 0 && (
					<InstanceFacet labelText='Characters'>

						{
							characterGroups.length === 1
								? (
									<>

										{
											Boolean(characterGroups[0].name) && (
												<div className="instance-facet-subheader">

													{ characterGroups[0].name }

												</div>
											)
										}

										<CharactersList characters={characterGroups[0].characters} />

									</>
								)
								: (
									<ul className="list list--no-bullets">

										{
											characterGroups.map((characterGroup, index) =>
												<li key={index} className="instance-facet-group">

													{
														Boolean(characterGroup.name) && (
															<div className="instance-facet-subheader">

																{ characterGroup.name }

															</div>
														)
													}

													<CharactersList characters={characterGroup.characters} />

												</li>
											)
										}

									</ul>
								)
						}

					</InstanceFacet>
				)
			}

			{
				originalVersionMaterial && (
					<InstanceFacet labelText='Original version'>

						<MaterialLinkWithContext material={originalVersionMaterial} />

					</InstanceFacet>
				)
			}

			{
				subsequentVersionMaterials?.length > 0 && (
					<InstanceFacet labelText='Subsequent versions'>

						<MaterialsList materials={subsequentVersionMaterials} />

					</InstanceFacet>
				)
			}

			{
				productions?.length > 0 && (
					<InstanceFacet labelText='Productions'>

						<ProductionsList productions={productions} />

					</InstanceFacet>
				)
			}

			{
				sourcingMaterials?.length > 0 && (
					<InstanceFacet labelText='Materials as source material'>

						<MaterialsList materials={sourcingMaterials} />

					</InstanceFacet>
				)
			}

			{
				sourcingMaterialProductions?.length > 0 && (
					<InstanceFacet labelText='Productions of materials as source material'>

						<ProductionsList productions={sourcingMaterialProductions} />

					</InstanceFacet>
				)
			}

			{
				awards?.length > 0 && (
					<InstanceFacet labelText='Awards'>

						{
							awards.map((award, index) =>
								<React.Fragment key={index}>
									<InstanceLink instance={award} />

									<ListWrapper>

										{
											award.ceremonies.map((ceremony, index) =>
												<li key={index}>
													<InstanceLink instance={ceremony} />{': '}

													{
														ceremony.categories
															.map((category, index) =>
																<React.Fragment key={index}>
																	{ category.name }{': '}

																	{
																		category.nominations
																			.map((nomination, index) =>
																				<React.Fragment key={index}>
																					<span className={nomination.isWinner ? 'nomination-winner-text' : ''}>
																						{nomination.type}
																					</span>

																					{
																						nomination.entities.length > 0 && (
																							<>
																								<>{': '}</>
																								<Entities
																									entities={nomination.entities}
																								/>
																							</>
																						)
																					}

																					{
																						nomination.productions.length > 0 && (
																							<>
																								<>{' for '}</>
																								<CommaSeparatedProductions
																									productions={nomination.productions}
																								/>
																							</>
																						)
																					}

																					{
																						nomination.productions.length > 0 &&
																						(nomination.recipientMaterial || nomination.coMaterials.length > 0) && (
																							<>{';'}</>
																						)
																					}

																					{
																						nomination.recipientMaterial && (
																							<>
																								<>{' (for '}</>
																								<InstanceLink instance={nomination.recipientMaterial} />
																								{
																									(getIn(nomination, ['recipientMaterial', 'format']) || getIn(nomination, ['recipientMaterial', 'year'])) && (
																										<AppendedFormatAndYear
																											format={getIn(nomination, ['recipientMaterial', 'format'])}
																											year={getIn(nomination, ['recipientMaterial', 'year'])}
																										/>
																									)
																								}
																								<>{')'}</>
																							</>
																						)
																					}

																					{
																						nomination.recipientMaterial &&
																						nomination.coMaterials.length > 0 && (
																							<>{';'}</>
																						)
																					}

																					{
																						nomination.coMaterials.length > 0 && (
																							<>
																								<>{' (with '}</>
																								<CommaSeparatedMaterials
																									materials={nomination.coMaterials}
																								/>
																								<>{')'}</>
																							</>
																						)
																					}
																				</React.Fragment>
																			)
																			.reduce((prev, curr) => [prev, ', ', curr])
																	}
																</React.Fragment>
															)
															.reduce((prev, curr) => [prev, '; ', curr])
													}
												</li>
											)
										}

									</ListWrapper>
								</React.Fragment>
							)
						}

					</InstanceFacet>
				)
			}

			{
				subsequentVersionMaterialAwards?.length > 0 && (
					<InstanceFacet labelText='Awards for subsequent versions'>

						{
							subsequentVersionMaterialAwards.map((subsequentVersionMaterialAward, index) =>
								<React.Fragment key={index}>
									<InstanceLink instance={subsequentVersionMaterialAward} />

									<ListWrapper>

										{
											subsequentVersionMaterialAward.ceremonies.map((ceremony, index) =>
												<li key={index}>
													<InstanceLink instance={ceremony} />{': '}

													{
														ceremony.categories
															.map((category, index) =>
																<React.Fragment key={index}>
																	{ category.name }{': '}

																	{
																		category.nominations
																			.map((nomination, index) =>
																				<React.Fragment key={index}>
																					<span className={nomination.isWinner ? 'nomination-winner-text' : ''}>
																						{nomination.type}
																					</span>

																					{
																						nomination.subsequentVersionMaterials.length > 0 && (
																							<>
																								<>{': '}</>
																								<CommaSeparatedMaterials
																									materials={nomination.subsequentVersionMaterials}
																								/>
																							</>
																						)
																					}

																					{
																						nomination.entities.length > 0 && (
																							<>
																								<>{': '}</>
																								<Entities
																									entities={nomination.entities}
																								/>
																							</>
																						)
																					}

																					{
																						nomination.productions.length > 0 && (
																							<>
																								<>{' for '}</>
																								<CommaSeparatedProductions
																									productions={nomination.productions}
																								/>
																							</>
																						)
																					}

																					{
																						nomination.productions.length > 0 &&
																						nomination.materials.length > 0 && (
																							<>{';'}</>
																						)
																					}

																					{
																						nomination.materials.length > 0 && (
																							<>
																								<>{' (with '}</>
																								<CommaSeparatedMaterials
																									materials={nomination.materials}
																								/>
																								<>{')'}</>
																							</>
																						)
																					}
																				</React.Fragment>
																			)
																			.reduce((prev, curr) => [prev, ', ', curr])
																	}
																</React.Fragment>
															)
															.reduce((prev, curr) => [prev, '; ', curr])
													}
												</li>
											)
										}

									</ListWrapper>
								</React.Fragment>
							)
						}

					</InstanceFacet>
				)
			}

			{
				sourcingMaterialAwards?.length > 0 && (
					<InstanceFacet labelText='Awards for materials as source material'>

						{
							sourcingMaterialAwards.map((sourcingMaterialAward, index) =>
								<React.Fragment key={index}>
									<InstanceLink instance={sourcingMaterialAward} />

									<ListWrapper>

										{
											sourcingMaterialAward.ceremonies.map((ceremony, index) =>
												<li key={index}>
													<InstanceLink instance={ceremony} />{': '}

													{
														ceremony.categories
															.map((category, index) =>
																<React.Fragment key={index}>
																	{ category.name }{': '}

																	{
																		category.nominations
																			.map((nomination, index) =>
																				<React.Fragment key={index}>
																					<span className={nomination.isWinner ? 'nomination-winner-text' : ''}>
																						{nomination.type}
																					</span>

																					{
																						nomination.sourcingMaterials.length > 0 && (
																							<>
																								<>{': '}</>
																								<CommaSeparatedMaterials
																									materials={nomination.sourcingMaterials}
																								/>
																							</>
																						)
																					}

																					{
																						nomination.entities.length > 0 && (
																							<>
																								<>{': '}</>
																								<Entities
																									entities={nomination.entities}
																								/>
																							</>
																						)
																					}

																					{
																						nomination.productions.length > 0 && (
																							<>
																								<>{' for '}</>
																								<CommaSeparatedProductions
																									productions={nomination.productions}
																								/>
																							</>
																						)
																					}

																					{
																						nomination.productions.length > 0 &&
																						nomination.materials.length > 0 && (
																							<>{';'}</>
																						)
																					}

																					{
																						nomination.materials.length > 0 && (
																							<>
																								<>{' (with '}</>
																								<CommaSeparatedMaterials
																									materials={nomination.materials}
																								/>
																								<>{')'}</>
																							</>
																						)
																					}
																				</React.Fragment>
																			)
																			.reduce((prev, curr) => [prev, ', ', curr])
																	}
																</React.Fragment>
															)
															.reduce((prev, curr) => [prev, '; ', curr])
													}
												</li>
											)
										}

									</ListWrapper>
								</React.Fragment>
							)
						}

					</InstanceFacet>
				)
			}

		</InstancePageWrapper>
	);

};

Material.propTypes = {
	material: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	material: state.material
});

export default connect(mapStateToProps)(Material);
