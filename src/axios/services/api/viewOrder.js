import request from "../../shared/lib/request";

function getViewOrderDetails(userProfile) {
	return request({
		url: `dashboard/getViewOrderDetails`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			userType: "distributor",
			userID: "CF00121",
			fromDate: "2023-01-01",
			toDate: "2023-03-28",
			sortOn: "order_no",
			orderBy: "ASC",
			distCode: "0",
			channel: "0",
			orderStatus: "0",
			limitNo: 10,
			offsetStart: 0,
		}),
	});
}

const ViewOrderService = {
	getViewOrderDetails,
};

export default ViewOrderService;
