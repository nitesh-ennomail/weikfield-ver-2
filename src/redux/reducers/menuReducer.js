import { ActionTypes } from "../constants/action-type";

const menuData = localStorage.getItem("menuData");
// const dashboard_menu = [
// 	{ menu_name: "Dasboard", link: "/dashboard", index: 1, icon: "fa-dashboard" },
// 	{
// 		menu_name: "Place Order",
// 		link: "/placeorder",
// 		index: 2,
// 		icon: "fa-cart-plus",
// 	},
// 	{
// 		menu_name: "Product Master",
// 		link: "/product",
// 		index: 3,
// 		icon: "fa-brands fa-product-hunt",
// 	},

// 	{
// 		menu_name: "Distributor Master",
// 		link: "/distribution",
// 		index: 4,
// 		icon: "fa-user-circle",
// 	},
// 	{
// 		menu_name: "View Order",
// 		link: "/vieworder",
// 		index: 5,
// 		icon: "fa-eye",
// 	},
// ];

const dashboard_menu = [
	{
		error_code: 0,
		status: "success",
		data: {
			profile_details: [
				{
					email_id: "rajitradingcompany@yahoo.in",
					user_id: "CF00121",
					user_name: "RAJI TRADING COMPANY",
					user_phone: "9814196273/7784008200",
				},
			],
			menu_details: [
				{
					menu_display_name: "Dashboard",
					menu_href: "/dashboard",
					menu_icon: "fa-dashboard",
					menu_index: "2",
					menu_desc: "Click to view Dashboard",
					menu_code: "1",
				},
				{
					menu_display_name: "Place Order",
					menu_href: "/placeorder",
					menu_icon: "fa-cart-plus",
					menu_index: "1",
					menu_desc: "Click to view Orders",
					menu_code: "2",
				},
			],
			alert_details: [
				{
					alert_message: "Test",
					alert_type: "Information",
				},
			],
		},
	},
];
const initialState = {
	menuData: dashboard_menu,
	// menuData: menuData ? JSON.parse(menuData) : "null",

	// userData: userProfile ? JSON.parse(userProfile) : "null",
};
// console.log("menuData", menuData);
export const menuReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_MENU:
			return { ...state, menuData: payload };
		default:
			return state;
	}
};
