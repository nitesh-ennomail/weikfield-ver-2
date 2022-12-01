import { ActionTypes } from "../constants/action-type";

const initialState = {
	products: [],
	selectedProduct: {},
};

export const productReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_PRODUCTS:
			return { ...state, products: payload };

		case ActionTypes.SELECTED_PRODUCT:
			return { ...state, selectedProduct: payload };

		default:
			return state;
	}
};
