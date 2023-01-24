import request from "../../shared/lib/request";

function getOrderFilters(userProfile) {
	return request({
		url: `/placeOrder/getOrderFilters`,
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

function getOrderDetails({ userProfile, data }) {
	return request({
		url: `/placeOrder/getOrderDetails`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			customer_code: `${data.customer_code}`,
			customer_channel: `${data.customer_channel}`,
		}),
	});
}

function getProductLine({ userProfile, brand }) {
	return request({
		url: `/placeOrder/getProductLine`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			selectedBrandCode: `${brand.brand_code}`,
		}),
	});
}

function getFlavour({ userProfile, selectedBrand, productLine }) {
	return request({
		url: `/placeOrder/getFlavour`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			selectedBrandCode: `${selectedBrand.brand_code}`,
			selectedProductLine: `${productLine.product_line_code}`,
		}),
	});
}

const PlaceOrderService = {
	getOrderFilters,
	getOrderDetails,
	getProductLine,
	getFlavour, //, update, delete, etc. ...
};

export default PlaceOrderService;
