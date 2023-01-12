import { ActionTypes } from "../constants/action-type";

export const setProducts = (products) => {
	return {
		type: ActionTypes.SET_PRODUCTS,
		payload: products,
	};
};

export const selectedProduct = (product) => {
	return {
		type: ActionTypes.SELECTED_PRODUCT,
		payload: product,
	};
};

export const addProduct = (product) => {
	return {
		type: ActionTypes.ADD_PRODUCT,
		payload: product,
	};
};
