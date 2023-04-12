import { ActionTypes } from "../constants/action-type";

const initialState = {
	mssr_distributors: null,
	mssr_line_list: null,
	mssr_invoices: null,
	mssr_pack_details: null,
	mssr_brands: null,
	mssr_product_line: null,
	mssr_flavour: null,
	mssr_filter_list: null,
	mssr_selected_invoices: null,
};
export const mssrReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_MSSR_DISTRIBUTORS:
			return { ...state, mssr_distributors: payload };

		case ActionTypes.SET_MSSR_LINE_LIST:
			return { ...state, mssr_line_list: payload };

		case ActionTypes.SET_MSSR_INVOICES:
			return { ...state, mssr_invoices: payload };

		case ActionTypes.SET_MSSR_PACK_DETAILS:
			return { ...state, mssr_pack_details: payload };

		case ActionTypes.SET_MSSR_BRANDS:
			return { ...state, mssr_brands: payload };

		case ActionTypes.SET_MSSR_PRODUCT_LINE:
			return { ...state, mssr_product_line: payload };

		case ActionTypes.SET_MSSR_FILTER_LIST:
			return { ...state, mssr_filter_list: payload };

		case ActionTypes.SET_MSSR_FLAVOUR:
			return { ...state, mssr_flavour: payload };

		case ActionTypes.SET_SELECTED_INVOICES:
			return { ...state, mssr_selected_invoices: payload };

		default:
			return state;
	}
};
