import { ActionTypes } from "../constants/action-type";

const userProfile = localStorage.getItem("userProfile");

const initialState = {
	userData: userProfile ? JSON.parse(userProfile) : "null",
};
console.log("userProfile", userProfile);
export const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_USER_AUTH:
			return { ...state, userData: payload };
		case ActionTypes.REMOVE_USER_AUTH:
			return { ...state, userData: payload };
		default:
			return state;
	}
};
