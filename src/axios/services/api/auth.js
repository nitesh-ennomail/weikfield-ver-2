import request from "../../shared/lib/request";

function addUser(data) {
	return request({
		url: `/authenticate`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		data: JSON.stringify({
			username: data.username,
			password: data.password,
		}),
	});
}

function getUserType(token) {
	return request({
		url: `/home/getUserType`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

const AuthService = {
	addUser,
	getUserType,
};

export default AuthService;
