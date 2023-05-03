import { ActionTypes } from "../constants/action-type";

export const setViewOrderFilter = (data) => {
	return {
		type: ActionTypes.SET_VIEW_ORDER_FILTER,
		payload: data,
	};
};

export const setViewOrderTotalRecord = (data) => {
	return {
		type: ActionTypes.SET_VIEW_ORDER_TOTAL_RECORD,
		payload: data,
	};
};

export const setViewOrderTotalPages = (data) => {
	return {
		type: ActionTypes.SET_VIEW_ORDER_TOTAL_PAGES,
		payload: data,
	};
};

export const selectedPagesNumber = (data) => {
	return {
		type: ActionTypes.SET_SELECTED_PAGE_NUMBER,
		payload: data,
	};
};










