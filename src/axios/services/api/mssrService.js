import request from "../../shared/lib/request";

function getOrderFilters(userProfile) {
	return request({
		url: `/mssrfilter/getMSSRFilter`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
	});
}

function getOrderDetails({ userProfile, data }) {
  return request({
    url: `mssr/getList`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userProfile.token}`,
    },
    data: JSON.stringify({
      customer_code: `${data.customer_code}`,
    }),
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

// function saveMssrEntry({
// 	userProfile,
// 	distributor,
// 	profile_details,
// 	addToCartTotal,
// 	addTocart,
// }) {

// 	return request({
// 		url: `/mssr/saveEntries`,
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${userProfile.token}`,
// 		},
// 		data: JSON.stringify({
// 			locationId: `${distributor.wh_location_code}`,
// 			user_Id: `${distributor.mapped_so_id}`,
// 			Amount: `${addToCartTotal}`,
// 			AmountBeforeTax: `${addToCartTotal}`,
// 			customer_code: `${distributor.customer_code}`,
// 			so_id: `${distributor.mapped_so_id}`,
// 			orderStateFlag: "NEW",
// 			previousOrderNo: "0",
// 			exempt_order_flag,
// 			data: addTocart.map(({ portal_item_code, item_qty, portal_mrp }) => ({
// 				parent_code: portal_item_code,
// 				order_qty: item_qty,
// 				order_amount: item_qty * portal_mrp,
// 				order_amount_w_tax: item_qty * portal_mrp,
// 			})),
// 		}),
// 	});
// }





const MSSRService = {
	getOrderFilters,
	getOrderDetails,
	getProductLine,
	getFlavour,
	// saveMssrEntry,
};

export default MSSRService;
