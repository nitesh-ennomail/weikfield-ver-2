import { ActionTypes } from "../constants/action-type";

export const setOrderFilter = (data) => {
	return {
		type: ActionTypes.SET_ORDER_FILTER_MSSR,
		payload: data,
	};
};

export const setOrderDetails = (data) => {
	return {
		type: ActionTypes.SET_ORDER_DETAILS_MSSR,
		payload: data,
	};
};

export const setProductLine = (data) => {
	return {
		type: ActionTypes.SET_PRODUCT_LINE_MSSR,
		payload: data,
	};
};

export const setFlavour = (data) => {
	return {
		type: ActionTypes.SET_FLAVOUR_MSSR,
		payload: data,
	};
};

export const setSelectedDistributor = (data) => {
	// localStorage.setItem("selectedDistributer", JSON.stringify(data));
	return {
		type: ActionTypes.SET_SELECTED_DISTRIBUTOR_MSSR,
		payload: data,
	};
};

export const setSelectedSalePerson = (name) => {
	// localStorage.setItem("selectedSalePerson", name);
	return {
		type: ActionTypes.SET_SELECTED_SALE_PERSON_MSSR,
		payload: name,
	};
};

export const setAddToCart = (product) => {
	// localStorage.setItem("cartItem", JSON.stringify(product));
	return {
		type: ActionTypes.ADD_TO_CART_MSSR,
		payload: product,
	};
};

export const setSelectedOrder = (item) => {
	// localStorage.setItem("selectedOrder", JSON.stringify(item));
	return {
		type: ActionTypes.SET_SELECTED_ORDER_MSSR,
		payload: item,
	};
};

export const showPopUp = (value) => {
	return {
		type: ActionTypes.SET_SHOW_POPUP_MSSR,
		payload: value,
	};
};

export const setInvoice = (value) => {
	return {
		type: ActionTypes.SET_SELECTED_INVOICES,
		payload: value,
	};
};



