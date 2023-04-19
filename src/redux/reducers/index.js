import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { authReducer } from "./authReducer";
import { menuReducer } from "./menuReducer";
import { dashboardReducer } from "./dashboardReducer";
import { placeOrderReducer } from "./placeOrderReducer";
import { viewOrderReducer } from "./viewOrderReducer";
import { mssrReducer } from "./mssrReducer";
import { distributorReducer } from "./distributorReducers";

const reducers = combineReducers({
	allProducts: productReducer,
	userProfile: authReducer,
	menuData: menuReducer,
	dashboard: dashboardReducer,
	placeOrder: placeOrderReducer,
	viewOrder: viewOrderReducer,
	mssr: mssrReducer,
	distributor: distributorReducer
});

const rootReducer = (state, action) => {
	if (action.type === "REMOVE_USER_AUTH") {
		return reducers(undefined, action);
	}
	return reducers(state, action);
};
export default rootReducer;
