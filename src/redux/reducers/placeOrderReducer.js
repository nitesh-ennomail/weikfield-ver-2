import { ActionTypes } from "../constants/action-type";

const initialState = {
	orderFilter: "null",
	orderDetails: "null",
	productLine: "null",
	flavour: "null",
};
export const placeOrderReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_ORDER_FILTER:
			return { ...state, orderFilter: payload };

		case ActionTypes.SET_ORDER_DETAILS:
			return { ...state, orderDetails: payload };

		case ActionTypes.SET_PRODUCT_LINE:
			return { ...state, productLine: payload };

		case ActionTypes.SET_FLAVOUR:
			return { ...state, flavour: payload };
		default:
			return state;
	}
};
