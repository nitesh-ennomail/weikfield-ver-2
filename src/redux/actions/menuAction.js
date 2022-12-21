import { ActionTypes } from "../constants/action-type";

export const setMenu = (menuData) => {
	localStorage.setItem("menuData", JSON.stringify(menuData));
	return {
		type: ActionTypes.SET_MENU,
		payload: menuData,
	};
};
