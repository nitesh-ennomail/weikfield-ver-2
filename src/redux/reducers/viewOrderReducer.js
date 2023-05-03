import { ActionTypes } from "../constants/action-type";

const initialState = {
  viewOrderFilter: null,
  viewOrderTotalRecord: null,
  viewOrderTotalPages: null,
  selectedPage: 0,
};
export const viewOrderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_VIEW_ORDER_FILTER:
      return { ...state, viewOrderFilter: payload };

    case ActionTypes.SET_VIEW_ORDER_TOTAL_RECORD:
      return { ...state, viewOrderTotalRecord: payload };

    case ActionTypes.SET_VIEW_ORDER_TOTAL_PAGES:
      return { ...state, viewOrderTotalPages: payload };

    case ActionTypes.SET_SELECTED_PAGE_NUMBER:
      return { ...state, selectedPage: payload };

    default:
      return state;
  }
};
