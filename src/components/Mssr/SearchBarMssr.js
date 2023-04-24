import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MssrService from "../../axios/services/api/mssr";
import {
	setFlavour,
	setInvoices,
	setMssrFilterList,
	setMssrList,
	setProductLine,
	setSelectedInvoice,
} from "../../redux/actions/mssrAction";
import MultiSelect from "../MultiSelect";
import { toast } from "react-hot-toast";
import { json } from "react-router-dom";

function SearchBarMssr() {
	const dispatch = useDispatch();

	const userProfile = useSelector((state) => state.userProfile);
	const dashboard = useSelector((state) => state.dashboard.dashboard);
	const { profile_details } = dashboard;

	const mssr = useSelector((state) => state.mssr);
	const {
		mssr_distributors,
		mssr_invoices,
		mssr_pack_details,
		mssr_brands,
		mssr_product_line,
		mssr_flavour,
		mssr_line_list,
	} = mssr;

	const [selectedBrand, setSelectedBrand] = useState("");
	const [selectedProductLine, setSelectedProductLine] = useState("");
	const [selectedFlavour, setSelectedFlavour] = useState("");
	const [selectedPackType, setSelectedPackType] = useState("");
	const [mssrListData, setMssrListData] = useState([]);
	const [showInvoice, setShowInvoice] = useState(false);

	const getMssrList = async (dist) => {
		{
			setSelectedPackType("");
		}
		{
			setSelectedBrand("");
		}
		{
			dispatch(setFlavour(null));
		}
		{
			dispatch(setProductLine(null));
		}
		if (dist === "0") {
			dispatch(setMssrList(null));
			setShowInvoice(false);
		} else if (dist.mssr_entry_allowed_flag === "N") {
			toast.error(
				`You are not allowed to fill mssr now - Please contact Admin}`
			);
		} else {
			await MssrService.getMssrList(userProfile, dist.customer_code).then(
				(response) => {
					console.log("getMssrList", response.data.data.mssr_line_details);
					dispatch(setMssrList(response.data.data.mssr_line_details));
				}
			);

			await MssrService.getInvoices(userProfile, dist.customer_code).then(
				(response) => {
					console.log("getInvoices", response.data.data.invoice_details);
					dispatch(setInvoices(response.data.data.invoice_details));
				}
			);
		}
		if (dist.mssr_invoice_lov_display_flag === "1") {
			setShowInvoice(true);
		} else {
			setShowInvoice(false);
			// await MssrService.getInvoices(userProfile, dist.customer_code).then(
			// 	(response) => {
			// 		dispatch(setSelectedInvoice(response.data.invoice_details));
			// 	}
			// );
		}
	};

	const getProductLine = async (brand) => {
		// AXIOS WRAPPER FOR API CALL
		setSelectedBrand(brand);
		setSelectedProductLine("");
		setSelectedFlavour("");
		dispatch(setFlavour(null));
		dispatch(setProductLine(null));
		await MssrService.getProductLine({ userProfile, brand }).then(
			(response) => {
				dispatch(setProductLine(response.data.data.product_line_details));
			}
		);
		// AXIOS WRAPPER FOR API CALL
	};

	const getFlavour = async (productLine) => {
		setSelectedProductLine(productLine);
		// AXIOS WRAPPER FOR API CALL
		await MssrService.getFlavour({
			userProfile,
			selectedBrand,
			productLine,
		}).then((response) => {
			//store response data in redux store
			dispatch(setFlavour(response.data.data.flavour_details));
		});
		// AXIOS WRAPPER FOR API CALL
	};

	const handlePackType = (e) => {
		{
			setSelectedBrand({});
		}
		{
			setSelectedFlavour("");
		}
		{
			dispatch(setFlavour(null));
		}
		{
			setSelectedProductLine("");
		}
		{
			dispatch(setProductLine(null));
		}
		setSelectedPackType(JSON.parse(e.target.value));
	};

	const showFilterData = async (e) => {
		e.preventDefault();
		if (Object.keys(selectedPackType).length === 0) {
			return toast.error("You missed selecting Pack type");
		} else if (Object.keys(selectedBrand).length === 0) {
			return toast.error("You missed selecting Brand");
		}

		// Show filtered data based on packType, selectedBrand, selectedProductLine and selectedFlavour
		let filterData = mssr_line_list.filter(function (el) {
			if (selectedPackType && selectedProductLine && selectedFlavour) {
				return (
					el.pack_type === selectedPackType.pack_type_desc &&
					el.product_line === selectedProductLine.product_line_desc &&
					el.flavour === selectedFlavour.flavour_desc
				);
			}
		});
		dispatch(setMssrFilterList(filterData));
		setMssrListData(() => filterData);
	};

	const resetAll = () => {
		dispatch(setMssrFilterList(null));
		setSelectedBrand({});
		setSelectedFlavour("");
		setSelectedPackType("");
		setSelectedProductLine("");
		setShowInvoice(false);
	};

	return (
		<div className="row mb-3">
			<div className="col-lg-12">
				<div className="card card-primary border-0">
					<div
						className="card-header collapsepanel"
						data-toggle="collapse"
						data-target="#collapseOne"
						aria-expanded="true">
						Search Products
					</div>
					<div
						className="card-body collapse show py-0"
						id="collapseOne"
						aria-expanded="true">
						<div className="column pt-3 col-sm-offset-0">
							<form
								data-toggle="validator"
								role="form"
								className="form-horizontal">
								<div className="form-group row">
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label htmlFor="Distributor" className="control-label">
													Distributor:
												</label>
											</div>
											<div className="col-md-8">
												<select
													name="Distributor"
													className="form-control"
													data-live-search="true"
													onChange={(e) =>
														getMssrList(JSON.parse(e.target.value))
													}
													required>
													<option value={JSON.stringify("0")}>
														Select Distributer
													</option>
													{mssr_distributors &&
														mssr_distributors.map((dist, index) => (
															<option
																key={dist.customer_code}
																// value={dist.customer_code}
																value={JSON.stringify(dist)}>
																{dist.customer_name}
															</option>
														))}
												</select>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label htmlFor="SalePerson" className="control-label">
													Sale Person:
												</label>
											</div>
											<div className="col-md-8">
												<input
													type="text"
													name="SalePerson"
													className="form-control"
													defaultValue={profile_details.user_name}
													readOnly
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="form-group row">
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label htmlFor="SalePerson" className="control-label">
													Pack Type:
												</label>
											</div>
											<div className="col-md-8">
												<div className="lbl-radio-group d-flex">
													{mssr_pack_details &&
														mssr_pack_details.map((packType, index) => (
															<div
																className="lbl-radio-btn flex-fill"
																key={packType.pack_type_code}>
																<input
																	checked={
																		selectedPackType &&
																		selectedPackType.pack_type_code ===
																			packType.pack_type_code
																	}
																	type="radio"
																	value={JSON.stringify(packType)}
																	id={packType.pack_type_code}
																	name="Pro-type"
																	onChange={(e) => handlePackType(e)}
																/>
																<label htmlFor={packType.pack_type_code}>
																	{packType.pack_type_desc}
																</label>
															</div>
														))}
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label
													htmlFor="ProductFamily"
													className="control-label">
													Brand:
												</label>
											</div>
											<div className="col-md-8">
												<select
													name="ProductFamily"
													className="form-control d-none d-sm-block"
													data-live-search="true"
													onClick={(e) =>
														getProductLine(JSON.parse(e.target.value))
													}
													required>
													<option>Select Brand</option>
													{mssr_brands &&
														mssr_brands.map((brand, index) => (
															<option
																key={brand.brand_code}
																value={JSON.stringify(brand)}>
																{brand.brand_desc}
															</option>
														))}
												</select>
												<div className="lbl-radio-group hrl-scrl-rdo d-block d-sm-none">
													{mssr_brands &&
														mssr_brands.map((brand, index) => (
															<div
																className="lbl-radio-btn"
																key={brand.brand_code}>
																<input
																	type="radio"
																	value={JSON.stringify(brand)}
																	id={brand.brand_code}
																	name="brandRdoGrp"
																	checked={
																		selectedBrand &&
																		selectedBrand.brand_code ===
																			brand.brand_code
																	}
																	onChange={(e) =>
																		getProductLine(JSON.parse(e.target.value))
																	}
																/>

																<label htmlFor={brand.brand_code}>
																	{brand.brand_desc}
																</label>
															</div>
														))}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="form-group row">
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label htmlFor="ProductClass" className="control-label">
													Product Line:
												</label>
											</div>
											<div className="col-md-8">
												<select
													name="ProductClass"
													className="form-control"
													data-live-search="true"
													onChange={(e) =>
														getFlavour(JSON.parse(e.target.value))
													}
													required>
													<option value={JSON.stringify("")}>Show All</option>

													{mssr_product_line &&
														mssr_product_line.map((product, index) => (
															<option
																key={product.product_line_code}
																value={JSON.stringify(product)}>
																{product.product_line_desc}
															</option>
														))}
												</select>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label htmlFor="ProductClass" className="control-label">
													Flavour:
												</label>
											</div>
											<div className="col-md-8">
												<select
													name="ProductClass"
													className="form-control"
													data-live-search="true"
													onChange={(e) =>
														setSelectedFlavour(JSON.parse(e.target.value))
													}
													required>
													<option value={JSON.stringify("")}>Show All</option>
													{mssr_flavour &&
														mssr_flavour.map((flavour, index) => (
															<option
																key={flavour.flavour_code}
																value={JSON.stringify(flavour)}>
																{flavour.flavour_desc}
															</option>
														))}
												</select>
											</div>
										</div>
									</div>
								</div>
								<div className="form-group row">
									<div className="col-md-6">
										{showInvoice && (
											<div className="row">
												<div className="col-md-4">
													<label
														htmlFor="ProductclassName"
														className="control-label">
														Check Recived Invoices This Month:
													</label>
												</div>
												<div className="col-md-8">
													{mssr_invoices && (
														<MultiSelect mssr_invoices={mssr_invoices} />
													)}
												</div>
											</div>
										)}
									</div>

									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label htmlFor="username" className="control-label">
													{" "}
												</label>
											</div>
											<div className="col-md-8 text-right">
												<button
													type="button"
													onClick={(e) => showFilterData(e)}
													className="btn btn-primary  btn-md"
													data-toggle="collapse"
													data-target="#collapseOne"
													aria-expanded="false">
													<i className="fa-solid fa-magnifying-glass"></i>{" "}
													Search
												</button>
												&nbsp;
												<button
													type="reset"
													onClick={() => resetAll()}
													className="btn btn-danger btn-md">
													<i className="fa-solid fa-rotate-right"></i> Reset
												</button>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchBarMssr;
