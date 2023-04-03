import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MssrService from "../../axios/services/api/mssr";
import {
	setFlavour,
	setInvoices,
	setMssrList,
	setProductLine,
} from "../../redux/actions/mssrAction";
import MultiSelect from "../MultiSelect";

function SearchBarMssr() {
	const dispatch = useDispatch();

	const userProfile = useSelector((state) => state.userProfile);
	const mssr = useSelector((state) => state.mssr);
	const {
		mssr_distributors,
		mssr_invoices,
		mssr_pack_details,
		mssr_brands,
		mssr_product_line,
		mssr_flavour,
	} = mssr;

	const [selectedBrand, setSelectedBrand] = useState({});
	const [selectedProductLine, setSelectedProductLine] = useState("");
	const [selectedFlavour, setSelectedFlavour] = useState("");
	const [selectedPackType, setSelectedPackType] = useState("");

	const getMssrList = async (customer_code) => {
		await MssrService.getMssrList(userProfile, customer_code).then(
			(response) => {
				console.log("getMssrList", response.data.mssr_line_details);
				dispatch(setMssrList(response.data.mssr_line_details));
			}
		);
		await MssrService.getInvoices(userProfile, customer_code).then(
			(response) => {
				console.log("getInvoices", response.data.invoice_details);
				dispatch(setInvoices(response.data.invoice_details));
			}
		);
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
				dispatch(setProductLine(response.data.product_line_details));
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
			console.log(response);
			dispatch(setFlavour(response.data.flavour_details));
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
			dispatch(setProductLine(null));
		}
		setSelectedPackType(JSON.parse(e.target.value));
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
													onChange={(e) => getMssrList(e.target.value)}
													required>
													{mssr_distributors &&
														mssr_distributors.map((dist, index) => (
															<option
																key={dist.customer_code}
																value={dist.customer_code}>
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
													defaultValue="Subhadeep Sen"
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
																	// checked={
																	// 	selectedPackType &&
																	// 	selectedPackType.pack_type_code ===
																	// 		packType.pack_type_code
																	// }
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
												<label
													htmlFor="ProductclassName"
													className="control-label">
													Check Recived Invoices This Month:
												</label>
											</div>
											<div className="col-md-8">
												<MultiSelect mssr_invoices={mssr_invoices} />
											</div>
										</div>
									</div>
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
								</div>
								<div className="form-group row">
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
													// onChange={(e) =>
													// 	setSelectedFlavour(JSON.parse(e.target.value))
													// }
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
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label htmlFor="username" className="control-label">
													{" "}
												</label>
											</div>
											<div className="col-md-8 text-right">
												<button
													type="submit"
													className="btn btn-primary  btn-md">
													<i className="fa-solid fa-magnifying-glass"></i>{" "}
													Search
												</button>
												&nbsp;
												<button type="reset" className="btn btn-danger btn-md">
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
