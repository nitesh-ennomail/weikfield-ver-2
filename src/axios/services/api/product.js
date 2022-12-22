import request from "../../shared/lib/request";

// function get(id) {
// 	return request({
// 		url: `/message/${id}`,
// 		method: "GET",
// 	});
// }

// function create({ subject, content }) {
// 	return request({
// 		url: "/message/create",
// 		method: "POST",
// 		data: {
// 			subject,
// 			content,
// 		},
// 	});
// }

function getProduct() {
	return request({
		url: "/products",
		method: "GET",
	});
}

function getProductDetails(item) {
	return request({
		url: `/products/${item.id}`,
		method: "GET",
	});
}

function addOrder(data) {
	return request({
		url: `/products`,
		method: "POST",
		body: JSON.stringify({
			title: "test product",
			price: 13.5,
			description: "lorem ipsum set",
			image: "https://i.pravatar.cc",
			category: "electronic",
		}),
	});
}

const ProductService = {
	// get,
	// create,
	getProduct,
	getProductDetails,
	addOrder, //, update, delete, etc. ...
};

export default ProductService;
