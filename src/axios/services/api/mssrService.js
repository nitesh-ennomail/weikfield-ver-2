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

function saveMssrEntry({
	  userProfile,
	  distributor,
      profile_details,
      selectedInvoice,
      addTocart,
}) {
	if(selectedInvoice.length === 0){
		selectedInvoice = [{sap_doc_no:"0"}]
	}
	return request({
		url: `/mssr/saveEntries`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			user_Id: `${profile_details.user_id}`,
			customer_code: `${distributor.customer_code}`,
			data: selectedInvoice.map(({ sap_doc_no }) => ({
				sap_doc_no: sap_doc_no
			})),
			
			data1: addTocart.map(({ item_code, expire_qty, trasfer_qty, physical_closing }) => ({
				item_code: item_code,
				cls_stk_qty_saleable: physical_closing ? physical_closing : "0",
				cls_stk_qty_damage: expire_qty ? expire_qty : "0",
				market_return_qty: trasfer_qty ? trasfer_qty : "0",
			})),
			mssr_invoice_display_flag: `${distributor.mssr_invoice_lov_display_flag}`
		}),
	});
}

const MSSRService = {
	getOrderFilters,
	getOrderDetails,
	getProductLine,
	getFlavour,
	saveMssrEntry,
};

export default MSSRService;
