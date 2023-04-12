import Multiselect from "multiselect-react-dropdown";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MultiSelect(mssr_invoices) {
	const [selectedValue, setSelectedValue] = useState(null);

	// const mssr = useSelector((state) => state.mssr);
	// const { mssr_distributors, mssr_invoices } = mssr;
	let invoice_data = [];

	invoice_data =
		mssr_invoices &&
		mssr_invoices.mssr_invoices.map((item, index) => ({
			name: item,
			id: index,
		}));
	// console.log("mssr_invoices", mssr_invoices.mssr_invoices);
	// const options = [
	// 	{ name: "Option 1️⃣", id: 1 },
	// 	{ name: "Option 2️⃣", id: 2 },
	// ];
	const options = invoice_data;
	const onSelect = (selectedList, selectedItem) => {
		console.log("add", selectedList);
	};

	const onRemove = (selectedList, removedItem) => {
		console.log("remove", selectedList);
	};
	return (
		<Multiselect
			options={options} // Options to display in the dropdown
			selectedValues={selectedValue} // Preselected value to persist in dropdown
			onSelect={onSelect} // Function will trigger on select event
			onRemove={onRemove} // Function will trigger on remove event
			displayValue="name" // Property name to display in the dropdown options
		/>
	);
}

export default MultiSelect;
