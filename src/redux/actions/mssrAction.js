import { ActionTypes } from "../constants/action-type";

export const setDistributors = (data) => {
	return {
		type: ActionTypes.SET_MSSR_DISTRIBUTORS,
		payload: data,
	};
};

export const setBrands = (data) => {
	return {
		type: ActionTypes.SET_MSSR_BRANDS,
		payload: data,
	};
};

export const setPackDetails = (data) => {
	return {
		type: ActionTypes.SET_MSSR_PACK_DETAILS,
		payload: data,
	};
};

export const setMssrList = (data) => {
	return {
		type: ActionTypes.SET_MSSR_LINE_LIST,
		payload: data,
	};
};

export const setMssrFilterList = (data) => {
	return {
		type: ActionTypes.SET_MSSR_FILTER_LIST,
		payload: data,
	};
};

export const setInvoices = (data) => {
	return {
		type: ActionTypes.SET_MSSR_INVOICES,
		payload: data,
	};
};

export const setProductLine = (data) => {
	return {
		type: ActionTypes.SET_MSSR_PRODUCT_LINE,
		payload: data,
	};
};

export const setFlavour = (data) => {
	return {
		type: ActionTypes.SET_MSSR_FLAVOUR,
		payload: data,
	};
};

export const setSelectedInvoice = (data) => {
	return {
		type: ActionTypes.SET_SELECTED_INVOICES,
		payload: data,
	};
};
