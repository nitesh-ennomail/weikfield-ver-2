import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { authReducer } from "./authReducer";

const reducers = combineReducers({
	allProducts: productReducer,
	userProfile: authReducer,
});

export default reducers;
