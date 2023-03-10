import { ActionTypes } from "../constants/action-type";

const cartItem = localStorage.getItem("cartItem");

const initialState = {
	orderFilter: "null",
	orderDetails: "null",
	productLine: "null",
	flavour: "null",
	addTocart: cartItem ? JSON.parse(cartItem) : [],
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

		case ActionTypes.ADD_TO_CART:
			return { ...state, addTocart: payload };
		default:
			return state;
	}
};
