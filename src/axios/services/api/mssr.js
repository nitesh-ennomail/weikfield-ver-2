import request from "../../shared/lib/request";

function getDistributors(userProfile) {
	return request({
		url: `mssrfilter/getDistributors`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
	});
}

function getBrands(userProfile) {
	return request({
		url: `mssrfilter/getBrands`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
	});
}

function getPackDetails(userProfile) {
	return request({
		url: `mssrfilter/getPackDetails`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
	});
}

function getProductLine({ userProfile, brand }) {
	return request({
		url: `/mssrfilter/getProductLine`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			brand_code: `${brand.brand_code}`,
		}),
	});
}

function getMssrList(userProfile, customer_code) {
	return request({
		url: `mssr/getList`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			customer_code,
		}),
	});
}

function getInvoices(userProfile, customer_code) {
	return request({
		url: `mssrfilter/getInvoices`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			customer_code,
		}),
	});
}

function getFlavour({ userProfile, selectedBrand, productLine }) {
	return request({
		url: `/mssrfilter/getFlavour`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			brand_code: `${selectedBrand.brand_code}`,
			product_line: `${productLine.product_line_code}`,
		}),
	});
}

const MssrService = {
	getDistributors,
	getMssrList,
	getInvoices,
	getPackDetails,
	getBrands,
	getProductLine,
	getFlavour,
};

export default MssrService;
