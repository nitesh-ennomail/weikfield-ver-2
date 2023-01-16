import { ActionTypes } from "../constants/action-type";

const userProfile = localStorage.getItem("userProfile");
const token = localStorage.getItem("token");
const usertype = localStorage.getItem("usertype");

const initialState = {
	userData: userProfile ? JSON.parse(userProfile) : "null",
	token: token ? JSON.parse(token) : "null",
	usertype: usertype ? JSON.parse(usertype) : "null",
};
console.log("userProfile", userProfile);
export const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_TOKEN:
			return { ...state, token: payload };

		case ActionTypes.SET_USER_TYPE:
			return { ...state, usertype: payload };

		case ActionTypes.SET_USER_AUTH:
			return { ...state, userData: payload };
		case ActionTypes.REMOVE_USER_AUTH:
			return { ...state, usertype: null, token: null };
		default:
			return state;
	}
};
