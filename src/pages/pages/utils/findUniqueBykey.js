export const getUniqueByKey = (order_grid_details, key) => {
	return [
		...new Map(order_grid_details.map((item) => [item[key], item])).values(),
	];
};

export const getRoundOff = (num, decimal) => {
	return Math.round(num * 100) / (100).toFixed(decimal);
};
