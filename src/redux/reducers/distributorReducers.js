import { ActionTypes } from "../constants/action-type";

const initialState = {
	distributorGrid: [],
};
export const distributorReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_DISTRIBUTOR:
			return { ...state, distributorGrid: payload };

		default:
			return state;
	}
};
