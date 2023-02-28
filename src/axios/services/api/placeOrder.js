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
			Amount: addToCartTotal,
			AmountBeforeTax: addToCartTotal,
			customer_code: `${distributor.customer_code}`,
			so_id: `${distributor.mapped_so_id}`,
			orderStateFlag: "NEW",
			previousOrderNo: "0",
			exempt_order_flag,
			data: addTocart.map(({ parent_code, sit_inventory_qty, portal_mrp }) => ({
				parent_code,
				order_qty: sit_inventory_qty,
				order_amount: sit_inventory_qty * portal_mrp,
				order_amount_w_tax: sit_inventory_qty * portal_mrp,
			})),
		}),
	});
}

function getModifyOrderDetails({ userProfile }) {
	let modOrderNo = "PP2300159";
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
			modOrderNo: "PP2300159",
			customerChannel: "GT",
		}),
	});
}

const PlaceOrderService = {
	getOrderFilters,
	getOrderDetails,
	getProductLine,
	getFlavour,
	saveOrder,
	getModifyOrderDetails,
};

export default PlaceOrderService;
