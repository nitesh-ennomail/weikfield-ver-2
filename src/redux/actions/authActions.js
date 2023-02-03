import { ActionTypes } from "../constants/action-type";

export const setUser = (userData) => {
	localStorage.setItem("userProfile", JSON.stringify(userData));
	return {
		type: ActionTypes.SET_USER_AUTH,
		payload: userData,
	};
};

export const removeUser = () => {
	// localStorage.removeItem("token");
	// localStorage.removeItem("usertype");
	// localStorage.removeItem("dashboard");
	localStorage.clear();

	return {
		type: ActionTypes.REMOVE_USER_AUTH,
		payload: {},
	};
};

export const setToken = (token) => {
	localStorage.setItem("token", JSON.stringify(token));
	return {
		type: ActionTypes.SET_TOKEN,
		payload: token,
	};
};

export const setUserType = (usertype) => {
	localStorage.setItem("usertype", JSON.stringify(usertype));
	return {
		type: ActionTypes.SET_USER_TYPE,
		payload: usertype,
	};
};
