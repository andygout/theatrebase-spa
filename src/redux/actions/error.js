import { getIn } from '../../lib/object-interactions';
import createAction from './base';
import {
	RECEIVE_ERROR,
	CANCEL_ERROR
} from '../utils/error-action-names';

const receiveError = error => createAction(RECEIVE_ERROR, error);

const cancelError = () => (dispatch, getState) => {

	if (getIn(getState(), ['error', 'isExistent'])) {

		dispatch(createAction(CANCEL_ERROR, { isExistent: false }));

	}

};

export {
	receiveError,
	cancelError
};
