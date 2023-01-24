import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { authReducer } from "./authReducer";
import { menuReducer } from "./menuReducer";
import { dashboardReducer } from "./dashboardReducer";
import { placeOrderReducer } from "./placeOrderReducer";

const reducers = combineReducers({
	allProducts: productReducer,
	userProfile: authReducer,
	menuData: menuReducer,
	dashboard: dashboardReducer,
	placeOrder: placeOrderReducer,
});

export default reducers;
