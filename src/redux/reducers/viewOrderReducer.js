import { ActionTypes } from "../constants/action-type";

const initialState = {
	viewOrderFilter: [],
};
export const viewOrderReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_VIEW_ORDER_FILTER:
			return { ...state, viewOrderFilter: payload };

		default:
			return state;
	}
};
