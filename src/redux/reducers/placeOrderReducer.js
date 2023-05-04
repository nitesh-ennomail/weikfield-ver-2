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
  showPopUp:false
};
export const placeOrderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ORDER_FILTER:
      return { ...state, orderFilter: payload };

    case ActionTypes.SET_SELECTED_ORDER:
      return { ...state, selectedOrder: payload };

    case ActionTypes.SET_ORDER_DETAILS:
      return { ...state, orderDetails: payload };

    case ActionTypes.SET_PRODUCT_LINE:
      return { ...state, productLine: payload };

    case ActionTypes.SET_FLAVOUR:
      return { ...state, flavour: payload };

    case ActionTypes.ADD_TO_CART:
      return { ...state, addTocart: payload };

    case ActionTypes.SET_SELECTED_DISTRIBUTOR:
      return { ...state, selectedDistributer: payload };

    case ActionTypes.SET_SELECTED_SALE_PERSON:
      return { ...state, selectedSalePerson: payload };

    case ActionTypes.SET_SHOW_POPUP:
        return { ...state, showPopUp: payload };
	  
    default:
      return state;
  }
};
