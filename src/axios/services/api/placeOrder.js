import request from "../../shared/lib/request";

function getOrderFilters(userProfile) {
	return request({
		url: `/placeOrder/getOrderFilters`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
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

function saveOrder({
	userProfile,
	distributor,
	profile_details,
	addToCartTotal,
	addTocart,
}) {
	return request({
		url: `/placeOrder/saveOrder`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			locationId: `${distributor.wh_location_code}`,
			user_Id: `${distributor.mapped_so_id}`,
			Amount: addToCartTotal,
			AmountBeforeTax: addToCartTotal,
			customer_code: `${distributor.customer_code}`,
			so_id: `${distributor.mapped_so_id}`,
			data: addTocart.map(({ parent_code, sit_inventory_qty, portal_mrp }) => ({
				parent_code,
				order_qty: sit_inventory_qty,
				order_amount: sit_inventory_qty * portal_mrp,
				order_amount_w_tax: sit_inventory_qty * portal_mrp,
			})),
		}),
	});
}

const PlaceOrderService = {
	getOrderFilters,
	getOrderDetails,
	getProductLine,
	getFlavour,
	saveOrder,
};

export default PlaceOrderService;
