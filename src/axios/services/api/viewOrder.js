import request from "../../shared/lib/request";

function getViewOrderChannelFilter(userProfile) {
	return request({
		url: `dashboard/getViewOrderChannelFilter`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${userProfile.token}`,
		},
	});
}

function getViewOrderFilter(userProfile, channel) {
	return request({
		url: `dashboard/getViewOrderFilter`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			channel: channel,
		}),
	});
}

function getViewOrderDetails(
	userProfile,
	selectedChannel,
	selectedDistributer,
	fromData,
	toDate,
	selectedOrderStatus,
	userId,
	selectedPageN
) {
	return request({
		url: `dashboard/getViewOrderDetails`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			userType: `${userProfile.usertype}`,
			userID: userId,
			fromDate: fromData,
			toDate: toDate,
			sortOn: "order_no",
			orderBy: "ASC",
			distCode: selectedDistributer,
			channel: selectedChannel,
			orderStatus: selectedOrderStatus,
			limitNo: 10,
			offsetStart: selectedPageN,
		}),
	});
}

const ViewOrderService = {
	getViewOrderChannelFilter,
	getViewOrderFilter,
	getViewOrderDetails,
};

export default ViewOrderService;
