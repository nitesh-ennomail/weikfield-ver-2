import request from "../../shared/lib/request";

function getDashboardDetails(userProfile) {
	return request({
		url: `/dashboard/getDashboardDetails`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			usertype: userProfile.usertype,
		}),
	});
}

function setStatus(userProfile, order_no, id, remark) {
	return request({
		url: `/order/setStatus`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			order_no: order_no,
			approver_remarks: remark,
			action_code: id,
		}),
	});
}

function getOrderLines(userProfile, order_no) {
	return request({
		url: `/order/getOrderLines`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			order_no,
		}),
	});
}
const DashboardService = {
	getDashboardDetails,
	setStatus,
	getOrderLines, //, update, delete, etc. ...
};

export default DashboardService;
