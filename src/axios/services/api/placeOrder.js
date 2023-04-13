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
	const allT = addTocart.every((item) => item.tax_flag === "T");
	const allE = addTocart.every((item) => item.tax_flag === "E");

	let exempt_order_flag = "";
	if (allT || allE) {
		exempt_order_flag = "N";
	} else {
		exempt_order_flag = "Y";
	}

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
			Amount: `${addToCartTotal}`,
			AmountBeforeTax: `${addToCartTotal}`,
			customer_code: `${distributor.customer_code}`,
			so_id: `${distributor.mapped_so_id}`,
			orderStateFlag: "NEW",
			previousOrderNo: "0",
			exempt_order_flag,
			data: addTocart.map(({ portal_item_code, item_qty, portal_mrp }) => ({
				parent_code: portal_item_code,
				order_qty: item_qty,
				order_amount: item_qty * portal_mrp,
				order_amount_w_tax: item_qty * portal_mrp,
			})),
		}),
	});
}

function saveModifyOrder({
	userProfile,
	order_details,
	profile_details,
	addToCartTotal,
	addTocart,
	selectedOrder,
}) {
	const allT = addTocart.every((item) => item.tax_flag === "T");
	const allE = addTocart.every((item) => item.tax_flag === "E");

	let exempt_order_flag = "";
	if (allT || allE) {
		exempt_order_flag = "N";
	} else {
		exempt_order_flag = "Y";
	}

	return request({
		url: `/placeOrder/saveOrder`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			locationId: `${selectedOrder.location_code}`,
			user_Id: `${profile_details.user_id}`,
			Amount: addToCartTotal,
			AmountBeforeTax: addToCartTotal,
			customer_code: `${selectedOrder.customer_code}`,
			so_id: `${order_details.so_id}`,
			orderStateFlag: "MOD",
			previousOrderNo: `${selectedOrder.order_no}`,
			exempt_order_flag,
			data: addTocart.map(
				({ portal_item_code, pp_ordered_qty, portal_mrp }) => ({
					parent_code: portal_item_code,
					order_qty: Number(pp_ordered_qty),
					order_amount: Number(pp_ordered_qty) * portal_mrp,
					order_amount_w_tax: Number(pp_ordered_qty) * portal_mrp,
				})
			),
		}),
	});
}

function getModifyOrderDetails({ userProfile, selectedOrder }) {
	let modOrderNo = selectedOrder.order_no;
	let customerChannel = "GT";
	console.log("distributor", userProfile);

	return request({
		url: `/placeOrder/getModifyOrderDetails`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			modOrderNo: modOrderNo,
			customerChannel: customerChannel,
		}),
	});
}

const PlaceOrderService = {
	getOrderFilters,
	getOrderDetails,
	getProductLine,
	getFlavour,
	saveOrder,
	saveModifyOrder,
	getModifyOrderDetails,
};

export default PlaceOrderService;
