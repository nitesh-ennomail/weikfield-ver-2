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

const DashboardService = {
	getDashboardDetails, //, update, delete, etc. ...
};

export default DashboardService;
