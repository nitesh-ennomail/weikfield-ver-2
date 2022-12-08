import { ActionTypes } from "../constants/action-type";

export const setUser = (userData) => {
	localStorage.setItem("userProfile", JSON.stringify(userData));
	return {
		type: ActionTypes.SET_USER_AUTH,
		payload: userData,
	};
};

export const removeUser = () => {
	localStorage.removeItem("userProfile");
	return {
		type: ActionTypes.REMOVE_USER_AUTH,
		payload: {},
	};
};
