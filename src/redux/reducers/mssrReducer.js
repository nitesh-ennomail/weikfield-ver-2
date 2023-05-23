import { ActionTypes } from "../constants/action-type";

const cartItem = localStorage.getItem("cartItem");
const selectedOrder = localStorage.getItem("selectedOrder");
const selectedDistributer = localStorage.getItem("selectedDistributer");
const selectedSalePerson = localStorage.getItem("selectedSalePerson");

const initialState = {
  orderFilter: "null",
  orderDetails: "null",
  productLine: "null",
  flavour: "null",
  selectedOrder: selectedOrder ? JSON.parse(selectedOrder) : "null",
  addTocart: cartItem ? JSON.parse(cartItem) : [],
  selectedDistributer: selectedDistributer
    ? JSON.parse(selectedDistributer)
    : "null",
  selectedSalePerson: selectedSalePerson ? selectedSalePerson : "",
  selectedInvoice:[],
  showPopUp:false
};
export const mssrReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ORDER_FILTER_MSSR:
      return { ...state, orderFilter: payload };

    case ActionTypes.SET_SELECTED_ORDER_MSSR:
      return { ...state, selectedOrder: payload };

    case ActionTypes.SET_ORDER_DETAILS_MSSR:
      return { ...state, orderDetails: payload };

    case ActionTypes.SET_PRODUCT_LINE_MSSR:
      return { ...state, productLine: payload };

    case ActionTypes.SET_FLAVOUR_MSSR:
      return { ...state, flavour: payload };

    case ActionTypes.ADD_TO_CART_MSSR:
      return { ...state, addTocart: payload };

    case ActionTypes.SET_SELECTED_DISTRIBUTOR_MSSR:
      return { ...state, selectedDistributer: payload };

    case ActionTypes.SET_SELECTED_SALE_PERSON_MSSR:
      return { ...state, selectedSalePerson: payload };

    case ActionTypes.SET_SHOW_POPUP_MSSR:
        return { ...state, showPopUp: payload };

    case ActionTypes.SET_SELECTED_INVOICES:
        return { ...state, selectedInvoice: payload };
	  
    default:
      return state;
  }
};
