import { ActionTypes } from "../constants/action-type";

const initialState = {
	products: [],
	selectedProduct: {},
	addProduct: [],
};

export const productReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_PRODUCTS:
			return { ...state, products: payload };

		case ActionTypes.SELECTED_PRODUCT:
			return { ...state, selectedProduct: payload };

		case ActionTypes.ADD_PRODUCT:
			return { ...state, addProduct: payload };

		default:
			return state;
	}
};
