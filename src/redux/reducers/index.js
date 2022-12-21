import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { authReducer } from "./authReducer";
import { menuReducer } from "./menuReducer";

const reducers = combineReducers({
	allProducts: productReducer,
	userProfile: authReducer,
	menuData: menuReducer,
});

export default reducers;
