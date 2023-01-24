import { ActionTypes } from "../constants/action-type";

export const setOrderFilter = (data) => {
	return {
		type: ActionTypes.SET_ORDER_FILTER,
		payload: data,
	};
};

export const setOrderDetails = (data) => {
	return {
		type: ActionTypes.SET_ORDER_DETAILS,
		payload: data,
	};
};

export const setProductLine = (data) => {
	return {
		type: ActionTypes.SET_PRODUCT_LINE,
		payload: data,
	};
};

export const setFlavour = (data) => {
	return {
		type: ActionTypes.SET_FLAVOUR,
		payload: data,
	};
};
