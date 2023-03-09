import { ActionTypes } from "../constants/action-type";

export const setViewOrderFilter = (data) => {
	return {
		type: ActionTypes.SET_VIEW_ORDER_FILTER,
		payload: data,
	};
};
