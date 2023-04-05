import Multiselect from "multiselect-react-dropdown";

import React, { useState } from "react";

function MultiSelect(mssr_invoices) {
	const [selectedValue, setSelectedValue] = useState(null);

	console.log("mssr_invoices", mssr_invoices.mssr_invoices);
	const options = [
		{ name: "Option 1️⃣", id: 1 },
		{ name: "Option 2️⃣", id: 2 },
	];

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
