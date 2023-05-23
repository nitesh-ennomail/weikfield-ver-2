import Multiselect from "multiselect-react-dropdown";

import React, { useEffect, useState } from "react";
import {
	setInvoice,
	setFlavour,
  } from "../redux/actions/mssrAction";

import { useSelector, useDispatch } from "react-redux";


function MultiSelect({invoice_details}) {
	const dispatch = useDispatch();
	const [selectedValue, setSelectedValue] = useState(null);

	// const mssr = useSelector((state) => state.mssr);
	// const { mssr_distributors, mssr_invoices } = mssr;
	let invoice_data = [];

		invoice_data =
		invoice_details &&
		invoice_details.map((item, index) => ({
			sap_doc_no: item,
		}))
	const options = invoice_data;
	const onSelect = (selectedList, selectedItem) => {
		console.log("selectedList", selectedList);
		// dispatch(setFlavour("null")),
		dispatch(setInvoice(selectedList))
	};

	const onRemove = (selectedList, removedItem) => {
		console.log("remove", selectedList);
		dispatch(setInvoice(selectedList))
	};
	useEffect(() => {
		setSelectedValue(null)
	}, [])
	
	return (
		<Multiselect
			// disable={disableFilter}
			options={options} // Options to display in the dropdown
			selectedValues={selectedValue} // Preselected value to persist in dropdown
			onSelect={onSelect} // Function will trigger on select event
			onRemove={onRemove} // Function will trigger on remove event
			displayValue="sap_doc_no" // Property name to display in the dropdown options
		/>
	);
}

export default MultiSelect;
