import request from "../../shared/lib/request";

function getViewStockDetailsChannelFilter(userProfile) {
	return request({
		url: `dashboard/getViewStockDetailsChannelFilter`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${userProfile.token}`,
		},
	});
}

function getViewStockDetailFilter(userProfile, channel) {
	return request({
		url: `dashboard/getViewStockDetailsFilter`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			channel: channel,
		}),
	});
}

function getViewStockDetails(
	userProfile,
	selectedChannel,
	userId,
	month,
	selectedDistributer,
	selectedOrderStatus,
	selectedPageN
) {
	return request({
		url: `dashboard/getViewStockDetailsList`,
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({

			userType:`${userProfile.usertype}`,
			userID:userId,
			month:month,
			sortOn:"mssr_entry_no",
			orderBy:"DESC",
			distCode:selectedDistributer,
			channel:selectedChannel,
			stock_details_status:selectedOrderStatus,
			limitNo:10,
			offsetStart:selectedPageN,


		}),
	});
}

function setValidationStatus( userProfile, stock_entry_no, cur_status_code, vaidation_remarks) {
	return request({
		url: `mssr/setStockDetailsStatus`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			stock_entry_no:stock_entry_no,
			cur_status_code:cur_status_code,
			vaidation_remarks:vaidation_remarks 
		}),
	});
}

function getViewStockDetailsLines(userProfile, stock_entry_no) {
	return request({
		url: `dashboard/getViewStockDetailsLines`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			// stock_entry_no:"CS2300042",
			 stock_entry_no: stock_entry_no,
		}),
	});
}

function getUpdateStockDetails(userProfile, stock_entry_no, newInputData){
	return request({
		url: `dashboard/updateStockDetails`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			stock_entry_no:stock_entry_no,
			data:newInputData,
		}),
	});

}

function getMssrFilter(userProfile) {
	return request({
		url: `mssrfilter/getMSSRFilter`,
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

function addNewMssr({ userProfile, search }) {
	return request({
		url: `/mssr/searchItemDetails`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userProfile.token}`,
		},
		data: JSON.stringify({
			search_key: `${search}`
		}),
	});
}


const MssrService = {
	getMssrFilter,
	getMssrList,
	getInvoices,
	getProductLine,
	getFlavour,
	addNewMssr,
	getViewStockDetailsChannelFilter,
	getViewStockDetailFilter,
	getViewStockDetails,
	setValidationStatus,
	getViewStockDetailsLines,
	getUpdateStockDetails
};

export default MssrService;
