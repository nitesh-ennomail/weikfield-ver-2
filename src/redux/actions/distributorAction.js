import { ActionTypes } from "../constants/action-type";

export const setDistributor = (data) => {
	return {
		type: ActionTypes.SET_DISTRIBUTOR,
		payload: data,
	};
};

