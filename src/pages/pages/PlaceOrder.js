import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PlaceOrderService from "../../axios/services/api/placeOrder";
import {
	setAddToCart,
	setFlavour,
	setOrderDetails,
	setOrderFilter,
	setProductLine,
} from "../../redux/actions/placeOrderAction";

import $ from "jquery";
import { ColorRing } from "react-loader-spinner";
import { getUniqueByKey } from "./utils/findUniqueBykey";
import Swal from "sweetalert2";
import { toast, Toaster } from "react-hot-toast";

const PlaceOrder = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// using ref to handle refrence
	const containerRef = useRef(null);
	const inputRef1 = useRef(null);
	// Collecting data from Redux store
	const userProfile = useSelector((state) => state.userProfile);
	const orderFilter = useSelector((state) => state.placeOrder.orderFilter);
	const orderDetails = useSelector((state) => state.placeOrder.orderDetails);
	const productLine = useSelector((state) => state.placeOrder.productLine);
	const flavour = useSelector((state) => state.placeOrder.flavour);
	const placeOrder = useSelector((state) => state.placeOrder);
	const dashboard = useSelector((state) => state.dashboard.dashboard);
	const { profile_details } = dashboard;
	const { flavour_details } = flavour;
	const { product_line_details } = productLine;
	const { distributor_details, brand_details, pack_type_details } = orderFilter;
	const { order_grid_details } = orderDetails;
	const { addTocart } = placeOrder;
	// Collecting data from Redux store Ends

	// Assigning local variable
	let cartTotal = 0;
	let cartTotalQty = 0;
	let addToCartTotal = 0;
	let addToCartQty = 0;
	// Assigning local variable Ends

	// Storing or Modifing data through react state
	const [orderData, setOrderData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [distributor, setDistributor] = useState(null);
	const [salePerson, setSalePerson] = useState(null);
	const [selectedBrand, setSelectedBrand] = useState(null);
	const [selectedFlavour, setSelectedFlavour] = useState(null);
	const [selectedProductLine, setSelectedProductLine] = useState(null);
	const [selectedPackType, setSelectedPackType] = useState(null);
	const [disableFilter, setDisableFilter] = useState(true);
	const [disableAddToCart, setDisableAddToCart] = useState(true);
	const [showOrderSummary, setShowOrderSummary] = useState("d-none");
	const [showSearchFilter, setShowSearchFilter] = useState("d-block");
	const [showPlaceOrder, setShowPlaceOrder] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [empty, setEmpty] = useState(false);

	// Storing or Modifing data through react state Ends

	const getOrderFilters = async () => {
		//AXIOS WRAPPER FOR API CALL
		await PlaceOrderService.getOrderFilters(userProfile).then((response) => {
			//store response data in redux store
			dispatch(setOrderFilter(response.data));
		});
		//AXIOS WRAPPER FOR API CALL
	};
	const getOrderDetails = async (data) => {
		// AXIOS WRAPPER FOR API CALL
		console.log("data ---", data);
		/////////////////////////////////////////
		if (
			data.customer_block_flag === "YES" &&
			data.ndc_flag === "NO" &&
			data.mssr_flag === "NO" &&
			data.claim_flag === "NO"
		) {
			<>
				{setSalePerson(data.mapped_so_name)}
				{setDistributor(data)}
				{await PlaceOrderService.getOrderDetails({ userProfile, data }).then(
					(response) => {
						dispatch(setOrderDetails(response.data));
						setDisableFilter(false);
					}
				)}
			</>;
		}
		if (data.customer_block_flag === "NO") {
			toast.error("customer_block_flag blocked");
		}
		if (data.ndc_flag === "YES") {
			toast.error("ndc_flag blocked");
		}
		if (data.mssr_flag === "YES") {
			toast.error("mssr_flag blocked");
		}
		if (data.claim_flag === "YES") {
			toast.error("claim_flag blocked");
		}

		// {
		// 	data !== null && data.customer_block_flag === "YES".toUpperCase() ? (
		// 		<>
		// 			{setSalePerson(data.mapped_so_name)}
		// 			{setDistributor(data)}
		// 			{await PlaceOrderService.getOrderDetails({ userProfile, data }).then(
		// 				(response) => {
		// 					dispatch(setOrderDetails(response.data));
		// 					setDisableFilter(false);
		// 				}
		// 			)}
		// 		</>
		// 	) : (
		// 		<>
		// 			{
		// 				(setDisableFilter(true),
		// 				Swal.fire({
		// 					icon: "error",
		// 					title: "Not Applicable",
		// 					text: "Distributor has not added any product yet!",
		// 				}))
		// 			}
		// 		</>
		// 	);
		// }

		////////////////////////////////
		// AXIOS WRAPPER FOR API CALL
	};

	const getProductLine = async (brand) => {
		// AXIOS WRAPPER FOR API CALL
		setSelectedBrand(brand);
		// Removing flavour and productline from redux store
		dispatch(setFlavour("null"));
		dispatch(setProductLine("null"));
		await PlaceOrderService.getProductLine({ userProfile, brand }).then(
			(response) => {
				//store response data in redux store
				dispatch(setProductLine(response.data));
			}
		);
		// AXIOS WRAPPER FOR API CALL
	};
	useLayoutEffect(() => {
		// handle css when component loads
		document.body.classList.remove("loginBG");
		document.body.classList.add(
			"fixed-nav",
			"sticky-footer",
			"sidenav-toggled"
		);
	}, []);

	const getFlavour = async (productLine) => {
		setSelectedProductLine(productLine);
		// AXIOS WRAPPER FOR API CALL
		await PlaceOrderService.getFlavour({
			userProfile,
			selectedBrand,
			productLine,
		}).then((response) => {
			//store response data in redux store
			dispatch(setFlavour(response.data));
		});
		// AXIOS WRAPPER FOR API CALL
	};

	useEffect(() => {
		$("table > tbody > tr").hide().slice(0, 10).show();
		$(".show-all").on("click", function () {
			$("tbody > tr", $(this).prev()).show();
		});

		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [disableFilter]);
	const showFilterData = async (e) => {
		e.preventDefault();
		// Show filtered data based on packType, selectedBrand, selectedProductLine and selectedFlavour
		let filterData = order_grid_details.filter(function (el) {
			return (
				el.customer_type === selectedPackType.pack_type_desc &&
				el.brand === selectedBrand.brand_desc &&
				el.product_line === selectedProductLine.product_line_desc &&
				el.flavour === selectedFlavour.flavour_desc
			);
		});

		if (filterData.length === 0) {
			setEmpty(true);
		} else {
			setEmpty(false);
		}

		if (addTocart.length > 0) {
			filterData = filterData.filter(
				({ portal_item_code: id1 }) =>
					!addTocart.some(({ portal_item_code: id2 }) => id2 === id1)
			);
		}

		setLoading(true);
		setOrderData(() => filterData);
		setDisableFilter(true);
		setLoading(false);
	};

	useEffect(() => {
		if (userProfile.usertype !== "null") {
			getOrderFilters();
		} else {
			navigate("/");
		}
	}, []);

	useEffect(() => {
		console.log("addTocart", addTocart);
		if (addTocart.length === 0) {
			setShowSearchFilter(true);
			setShowOrderSummary("d-none");
			setShowPlaceOrder(false);
		}
	}, [orderData]);

	const addToCart = () => {
		let currItemList = orderData.filter(function (el) {
			return el.sit_inventory_qty >= 1;
		});
		// Merge previous order and current order
		let added_to_cart = [...addTocart, ...currItemList];
		// For removing duplicate key
		const key = "portal_item_code";
		const order_grid_details_UniqueByKey = getUniqueByKey(added_to_cart, key);
		// store the data in redux store
		dispatch(setAddToCart(order_grid_details_UniqueByKey));
		setShowPlaceOrder(false);
		setOrderData([]);
		// setOrderData(() =>
		// 	orderData.filter(function (el) {
		// 		return el.sit_inventory_qty == 0;
		// 	})
		// );
		setDisableAddToCart(true);
	};

	const removeFromCart = (e, id) => {
		id.sit_inventory_qty = 0;
		//Removing item from order summary based on selected portal_item_code
		dispatch(
			setAddToCart(
				addTocart.filter(
					(item, i) => item.portal_item_code !== id.portal_item_code
				)
			)
		);
		console.log(addToCart.length);
		// if (addTocart.length === 0) {
		// 	setShowSearchFilter("d-block");
		// }
		if (
			id.customer_type === selectedPackType.pack_type_desc &&
			id.brand === selectedBrand.brand_desc &&
			id.product_line === selectedProductLine.product_line_desc &&
			id.flavour === selectedFlavour.flavour_desc
		) {
			// {
			// 	selectedBrand &&
			// 		selectedProductLine &&
			// 		selectedFlavour &&
			// 		setOrderData(() =>
			// 			order_grid_details.filter(function (el) {
			// 				return (
			// 					el.brand === selectedBrand.brand_desc &&
			// 					el.product_line === selectedProductLine.product_line_desc &&
			// 					el.flavour === selectedFlavour.flavour_desc
			// 				);
			// 			})
			// 		);
			// }
			setOrderData([]);
		} else {
			console.log("id", id);
		}
	};

	const handleQty = (e, id) => {
		// Handle order grid quantity and store in react state.
		setOrderData((orderData) =>
			orderData.map((item) =>
				id === item.portal_item_code
					? { ...item, sit_inventory_qty: e.target.value }
					: item
			)
		);
		setDisableAddToCart(false);
	};

	const handleQtyInCart = (e, id) => {
		// Handle Order summary quantity and store in redux store.
		dispatch(
			setAddToCart(
				addTocart.map((item) =>
					id === item.portal_item_code
						? { ...item, sit_inventory_qty: e.target.value }
						: item
				)
			)
		);
		// setDisableAddToCart(false);
	};

	const saveOrder = async () => {
		addTocart.length > 0
			? await PlaceOrderService.saveOrder({
					userProfile,
					distributor,
					profile_details,
					addToCartTotal,
					addTocart,
			  }).then((response) => {
					console.log(response);
					{
						response.data.error_code === "0"
							? toast.success(response.data.message)
							: toast.error(response.data.message);
					}

					// toast.$`{response.status}`("Look at my styles.", {
					// 	style: {
					// 		border: "1px solid #713200",
					// 		padding: "16px",
					// 		color: "#713200",
					// 	},
					// 	iconTheme: {
					// 		primary: "#713200",
					// 		secondary: "#FFFAEE",
					// 	},
					// });

					// // Empty the order summary grid after saving order
					// dispatch(setAddToCart([]));
					// navigate("/dashboard");
			  })
			: console.log("Please add some item in cart!");
	};

	return (
		<>
			<div className="content-wrapper" ref={containerRef}>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									{" "}
									<Link to="/dashboard">Dashboard</Link>{" "}
								</li>
								<li className="breadcrumb-item active">Place Order</li>
							</ol>
						</div>
					</div>
					<div className="row">
						<div
							className="col-md-8 collapse show"
							id="collapseAll"
							aria-expanded="true">
							<div className="row mb-3">
								<div className="col-lg-12">
									<div
										//  className="card card-primary border-0"
										className={`card card-primary border-0 d-sm-block ${showSearchFilter}`}>
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
																	<label
																		htmlFor="Distributor"
																		className="control-label">
																		Distributor:
																	</label>
																</div>
																<div className="col-md-8">
																	<select
																		name="Distributor"
																		className="form-control"
																		data-live-search="true"
																		onChange={(e) =>
																			getOrderDetails(
																				JSON.parse(e.target.value)
																			)
																		}
																		required>
																		<option value="null">Show All</option>
																		{distributor_details &&
																			distributor_details.map((data, index) => (
																				<option
																					key={index}
																					value={JSON.stringify(data)}>
																					{data.customer_name}
																				</option>
																			))}
																	</select>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="row">
																<div className="col-md-4">
																	<label
																		htmlFor="SalePerson"
																		className="control-label">
																		Sale Person:
																	</label>
																</div>
																<div className="col-md-8">
																	<input
																		type="text"
																		name="SalePerson"
																		className="form-control"
																		defaultValue={salePerson}
																		readOnly={true}
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="form-group row">
														<div className="col-md-6">
															<div className="row">
																<div className="col-md-4">
																	<label
																		htmlFor="SalePerson"
																		className="control-label">
																		Pack Type:
																	</label>
																</div>
																<div className="col-md-8">
																	<div className="lbl-radio-group d-flex">
																		{pack_type_details &&
																			pack_type_details.map(
																				(packType, index) => (
																					<div
																						className="lbl-radio-btn flex-fill"
																						key={packType.pack_type_code}>
																						<input
																							disabled={disableFilter}
																							type="radio"
																							value={JSON.stringify(packType)}
																							id={packType.pack_type_code}
																							name="Pro-type"
																							onChange={(e) =>
																								setSelectedPackType(
																									JSON.parse(e.target.value)
																								)
																							}
																						/>
																						<label
																							htmlFor={packType.pack_type_code}>
																							{packType.pack_type_desc}
																						</label>
																					</div>
																				)
																			)}
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
																		disabled={disableFilter}
																		onChange={(e) =>
																			getProductLine(JSON.parse(e.target.value))
																		}
																		required>
																		<option>Show All</option>

																		{brand_details &&
																			brand_details.map((brand, index) => (
																				<option
																					key={brand.brand_code}
																					value={JSON.stringify(brand)}>
																					{brand.brand_desc}
																				</option>
																			))}
																	</select>
																	<div className="lbl-radio-group hrl-scrl-rdo d-block d-sm-none">
																		{loading ? (
																			<label>show all</label>
																		) : (
																			<>
																				{brand_details &&
																					brand_details.map((brand, index) => (
																						<div
																							className="lbl-radio-btn"
																							key={brand.brand_code}>
																							<input
																								disabled={disableFilter}
																								type="radio"
																								value={JSON.stringify(brand)}
																								id={brand.brand_code}
																								name="brandRdoGrp"
																								onChange={(e) =>
																									getProductLine(
																										JSON.parse(e.target.value)
																									)
																								}
																							/>
																							<label htmlFor={brand.brand_code}>
																								{brand.brand_desc}
																							</label>
																						</div>
																					))}
																			</>
																		)}
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
																		htmlFor="ProductClass"
																		className="control-label">
																		Product Line:
																	</label>
																</div>
																<div className="col-md-8">
																	<select
																		name="ProductClass"
																		className="form-control"
																		data-live-search="true"
																		disabled={disableFilter}
																		onChange={(e) =>
																			getFlavour(JSON.parse(e.target.value))
																		}
																		required>
																		<option>Show All</option>

																		{product_line_details &&
																			product_line_details.map(
																				(product, index) => (
																					<option
																						key={product.product_line_code}
																						value={JSON.stringify(product)}>
																						{product.product_line_desc}
																					</option>
																				)
																			)}
																	</select>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="row">
																<div className="col-md-4">
																	<label
																		htmlFor="ProductClass"
																		className="control-label">
																		Flavour:
																	</label>
																</div>
																<div className="col-md-8">
																	<select
																		name="ProductClass"
																		className="form-control"
																		data-live-search="true"
																		disabled={disableFilter}
																		onChange={(e) =>
																			setSelectedFlavour(
																				JSON.parse(e.target.value)
																			)
																		}
																		required>
																		<option>Show All</option>
																		{flavour_details &&
																			flavour_details.map((flavour, index) => (
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
														<div className="col-md-8"></div>
														<div className="col-md-2">
															<button
																type="button"
																onClick={(e) => setDisableFilter(false)}
																className="btn btn-block btn-danger btn-md d-none d-sm-block">
																<i className="fas fa fa-gear mr-2"></i> Reset
															</button>
														</div>
														<div className="col-md-2">
															<button
																onClick={(e) => (
																	showFilterData(e), setDisableFilter(false)
																)}
																type="button"
																className="btn btn-block btn-primary btn-md"
																data-toggle="collapse"
																data-target="#collapseOne"
																aria-expanded="false">
																Apply
															</button>
														</div>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
							{orderData.length > 0 && (
								<div className="card border-0 rounded-0 mb-3">
									<div className="card-body">
										<div className="table-responsive d-none d-sm-block">
											<table
												className="table table-bordered"
												id="dataTable1"
												width="100%"
												cellSpacing="0">
												<thead>
													<tr>
														<th>Parent Code</th>
														<th>Parent Code Desc</th>
														<th>BO Qty</th>
														<th>W/H Stock</th>
														<th>Price</th>
														<th>UOM</th>
														<th>Qty</th>
														<th>Total Amount</th>
													</tr>
												</thead>
												<tbody>
													{loading ? (
														<ColorRing
															visible={true}
															height="80"
															width="100%"
															ariaLabel="blocks-loading"
															wrapperStyle={{ textAlign: "center" }}
															wrapperClass="blocks-wrapper"
															colors={[
																"#e15b64",
																"#f47e60",
																"#f8b26a",
																"#abbd81",
																"#849b87",
															]}
														/>
													) : (
														<>
															{orderData.length > 0 ? (
																<>
																	{orderData.map(
																		(item, index) => (
																			(cartTotalQty =
																				cartTotalQty + item.sit_inventory_qty),
																			(cartTotal +=
																				item.portal_mrp *
																				item.sit_inventory_qty),
																			(
																				<tr key={index}>
																					<td>{item.portal_item_code}</td>
																					<td>{item.portal_item_desc}</td>
																					<td>{item.erp_commited_qty}</td>
																					<td>{item.physical_inventory_qty}</td>
																					<td>{item.portal_mrp}</td>
																					<td>{item.uom}</td>
																					<td>
																						<input
																							disabled={
																								item.portal_mrp == 0
																									? true
																									: false
																							}
																							style={{ textAlign: "right" }}
																							ref={inputRef1}
																							min={1}
																							max={10}
																							type="number"
																							className="qty-ctl"
																							step="1"
																							// defaultValue={
																							// 	item.sit_inventory_qty
																							// }
																							placeholder={
																								item.sit_inventory_qty
																							}
																							onChange={(e) =>
																								handleQty(
																									e,
																									item.portal_item_code
																								)
																							}
																						/>
																					</td>
																					<td>
																						{item.portal_mrp *
																							item.sit_inventory_qty}
																					</td>
																				</tr>
																			)
																		)
																	)}
																</>
															) : (
																"No data found!"
															)}
														</>
													)}
												</tbody>
											</table>
										</div>
										<div className="cart-prod-list d-block d-sm-none">
											{loading ? (
												<ColorRing
													visible={true}
													height="80"
													width="100%"
													ariaLabel="blocks-loading"
													wrapperStyle={{ textAlign: "center" }}
													wrapperClass="blocks-wrapper"
													colors={[
														"#e15b64",
														"#f47e60",
														"#f8b26a",
														"#abbd81",
														"#849b87",
													]}
												/>
											) : (
												<>
													<div className="col-md-12">
														<ol className="breadcrumb">
															<li className="breadcrumb-item">
																{selectedBrand.brand_desc}
															</li>
															<li className="breadcrumb-item">
																{selectedProductLine.product_line_desc}
															</li>
															<li className="breadcrumb-item active">
																{selectedFlavour.flavour_desc}
															</li>
														</ol>
													</div>

													{orderData.map((item, index) => (
														<div className="cart-prod-div" key={index}>
															<div className="cart-prod-title">
																{item.portal_item_code}

																<span className="pl-2">
																	{item.flag_color === "R" ? (
																		<i className="fas fa-flag text-danger mr-2"></i>
																	) : item.flag_color === "G" ? (
																		<i className="fas fa-flag text-success mr-2"></i>
																	) : item.flag_color === "B" ? (
																		<i className="fas fa-flag text-info mr-2"></i>
																	) : null}
																</span>
															</div>
															<div className="cart-prod-desc">
																<span className="cart-prod-val">
																	{item.portal_item_desc}
																</span>
															</div>
															<div className="cart-prod-desc">
																<span className="cart-prod-lbl">
																	Physical Inventory:{" "}
																</span>
																<span className="cart-prod-val">
																	{item.physical_inventory_qty}
																</span>

																<div
																	className="cart-prod-desc"
																	style={{ float: "right" }}>
																	<span className="cart-prod-lbl">
																		Allocate Qty:{" "}
																	</span>
																	<span className="cart-prod-val">
																		{item.erp_commited_qty}
																	</span>
																</div>
															</div>

															<div className="cart-prod-desc">
																<span className="cart-prod-lbl">UOM: </span>
																<span className="cart-prod-val">
																	{item.uom}
																</span>

																<div
																	className="cart-prod-desc"
																	style={{ float: "right" }}>
																	<span className="cart-prod-lbl">Price: </span>
																	<span className="cart-prod-val">
																		{item.portal_mrp}
																	</span>
																</div>
															</div>

															<div className="cart-prod-desc">
																<span className="cart-prod-lbl">
																	{item && item.scheme ? item.scheme : " "}
																</span>

																<div
																	className="cart-prod-desc"
																	style={{ float: "right" }}>
																	<input
																		disabled={
																			item.portal_mrp == 0 ? true : false
																		}
																		style={{ textAlign: "right" }}
																		min={1}
																		max={10}
																		ref={inputRef1}
																		type="number"
																		className="qty-ctl"
																		step="1"
																		// defaultValue={item.sit_inventory_qty}
																		placeholder={item.sit_inventory_qty}
																		onChange={(e) =>
																			handleQty(e, item.portal_item_code)
																		}
																	/>
																</div>
															</div>
														</div>
													))}
												</>
											)}
										</div>
									</div>
									{orderData.length > 0 && (
										<div className="card-footer bg-white">
											<div className="row">
												<div className="col-md-3 mb-3 d-sm-block">
													<span onClick={addToCart}>
														<button
															type="button"
															className="btn btn-block btn-primary btn-md"
															data-toggle="collapse"
															data-target="#collapseOne"
															aria-expanded="true"
															disabled={
																disableAddToCart || orderData.length === 0
															}>
															<i className="fas fa-cart-shopping mr-2"></i> Add
															to Cart
														</button>
													</span>
												</div>
												<div className="col-md-6 text-center">
													<div className="form-group mb-2">
														{" "}
														<span className="pr-4">
															<i className="fas fa-flag text-success  mr-2"></i>
															New Launch
														</span>{" "}
														<span className="pr-4">
															<i className="fas fa-flag text-info mr-2"></i>{" "}
															Promo
														</span>{" "}
														<span className="pr-4">
															<i className="fas fa-flag  mr-2"></i> Balance
															SKU's{" "}
														</span>{" "}
													</div>
												</div>
												<div className="col-md-3 d-none d-sm-block">
													<h4 className="m-0 text-success  text-center">
														Total: {cartTotal}
													</h4>
												</div>
											</div>
										</div>
									)}
								</div>
							)}

							{empty && <h1 className="card-header">No Data found</h1>}
						</div>
						{addTocart.length > 0 && (
							<>
								<div className="col-md-4 d-sm-block">
									<div className="card card-primary border-0 rounded-0 mb-3">
										<div
											className={`card-header d-sm-block ${showOrderSummary}`}
											// data-toggle="collapse"
											// data-target="#collapseTwo"
											// aria-expanded="true"
											// onClick={() => setShowPlaceOrder(true)}

											// onClick={() => {
											// 	setShowOrderSummary("d-block");
											// 	setShowSearchFilter("d-none");
											// 	setShowPlaceOrder(true);
											// }}
										>
											Order Summary
										</div>

										<div
											// className="card-body collapse"
											className={`card-body collapse d-sm-block ${showOrderSummary}`}
											id="collapseTwo"
											aria-expanded="true">
											<div className="cart-prod-list scroll">
												{addTocart != "null" &&
													addTocart.map(
														(item, index) => (
															(addToCartQty =
																addToCartQty + item.sit_inventory_qty),
															(addToCartTotal +=
																item.portal_mrp * item.sit_inventory_qty),
															(
																<div
																	className="cart-prod-div-order"
																	key={index}>
																	<div className="cart-prod-trash">
																		<i
																			onClick={(e) => removeFromCart(e, item)}
																			className="text-danger fa fa-trash mr-1"></i>
																	</div>
																	<div className="cart-prod-title">
																		{item.portal_item_code}
																	</div>
																	<div className="cart-prod-desc">
																		<span className="cart-prod-val">
																			{item.portal_item_desc}
																		</span>
																	</div>

																	<div className="cart-prod-desc">
																		<span className="cart-prod-lbl">
																			Quantity:{" "}
																		</span>
																		<input
																			min={1}
																			style={{ textAlign: "right" }}
																			onChange={(e) =>
																				handleQtyInCart(
																					e,
																					item.portal_item_code
																				)
																			}
																			// disabled={true}
																			type="number"
																			className="qty-ctl"
																			step="1"
																			// defaultValue={item.sit_inventory_qty}
																			placeholder={item.sit_inventory_qty}
																		/>

																		{/* <span className="cart-prod-lbl ml-2">
																			{item.sit_inventory_qty} *{" "}
																			{item.portal_mrp} =
																			<b>
																				{item.sit_inventory_qty *
																					item.portal_mrp}
																			</b>
																		</span> */}
																		<div
																			className="cart-prod-desc"
																			style={{ float: "right" }}>
																			<span className="cart-prod-lbl">
																				Value:{" "}
																				{item.sit_inventory_qty *
																					item.portal_mrp}
																			</span>
																		</div>
																	</div>
																</div>
															)
														)
													)}
											</div>

											<p className="text-center d-none d-sm-block m-0 font-weight-bold">
												Total Unit:{" "}
												<span className="text-danger">
													{/* {parseInt(addToCartQty, 10)} */}

													{addTocart.length}
												</span>
											</p>
											<h1 className="text-center text-success d-none d-sm-block">
												{addToCartTotal}
											</h1>

											<button
												onClick={() => saveOrder()}
												type="button"
												className="btn btn-primary btn-block btn-lg my-3 d-sm-block d-none">
												Place Order{" "}
												<i className="fa-solid fa-circle-arrow-right"></i>
											</button>
										</div>
									</div>
								</div>
								<div className="col-12 d-sm-none d-sm-none">
									<button
										onClick={() => {
											setShowOrderSummary("d-none");
											setShowSearchFilter("d-block");
											setShowPlaceOrder(false);
										}}
										type="button"
										className={`btn btn-primary btn-block btn-lg my-3 ${showOrderSummary}`}
										// data-toggle="collapse"
										// data-target="#collapseAll"
										// data-toggle="collapse"
										// data-target="#collapseOne"
										aria-expanded="true">
										Add More Line{" "}
										<i className="fa-solid fa-circle-arrow-right"></i>
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<div className="atc-footer-mobile d-block d-sm-none">
				<div className="atcm-button-group">
					{" "}
					<Link
						// to="#modalshowcart"
						className="atcm-total-amount"
						data-toggle="modal">
						<span className="atcm-icon">
							<i className="fas fa-cart-shopping mr-2"></i>
						</span>
						<span className="atcm-text">
							<span className="atc-unit">Count : {addTocart.length}</span>
							<span className="atc-unit">Amt    : {addToCartTotal}</span>
						</span>
					</Link>{" "}
					<a
						className="atcm-place-order"
						data-toggle="collapse"
						data-target="#collapseOne"
						aria-expanded="false"
						style={{ color: "#fff" }}>
						{showPlaceOrder === false && (
							<span
								data-toggle="collapse"
								data-target="#collapseTwo"
								aria-expanded="true"
								onClick={() => {
									if (addTocart.length > 0) {
										setShowOrderSummary("d-block");
										setShowSearchFilter("d-none");
										setShowPlaceOrder(true);
									}
								}}>
								Order Summary
							</span>
						)}

						{showPlaceOrder === true && (
							<span
								onClick={() => {
									setShowPlaceOrder(false);
									saveOrder();
								}}>
								Place Order
							</span>
						)}

						<i className="fa-solid fa-circle-arrow-right"></i>
					</a>{" "}
				</div>
			</div>
			<div
				className="modal bd-example-modal-lg fade"
				id="modalshowcart"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								ORDER SUMMARY
							</h5>
							<button
								className="close"
								type="button"
								data-dismiss="modal"
								aria-label="Close">
								{" "}
								<span aria-hidden="true">×</span>{" "}
							</button>
						</div>
						<div className="modal-body">
							<div className="cart-prod-list">
								<div className="cart-prod-div">
									<div className="cart-prod-title">Macaroni - FG -8114044</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-val">
											CHEF'S BASKET-PASTA-MACARONI-POUCH-60X180gm
										</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Physical Inventory: </span>
										<span className="cart-prod-val">20</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Allocate Qty: </span>
										<span className="cart-prod-val">5</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Price: </span>
										<span className="cart-prod-val">2222.5</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">UOM: </span>
										<span className="cart-prod-val">Case</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Schemes: </span>
										<span className="cart-prod-val">
											Buy 5 case Get 1 Case Free
										</span>
									</div>
									<div className="cart-prod-qty">
										<input
											style={{ textAlign: "right" }}
											type="number"
											className="qty-ctl"
											step="1"
											defaultValue="3"
										/>
									</div>
								</div>
								<div className="cart-prod-div">
									<div className="cart-prod-title">Macaroni - FG -8114044</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-val">
											CHEF'S BASKET-PASTA-MACARONI-POUCH-60X180gm
										</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Physical Inventory: </span>
										<span className="cart-prod-val">20</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Allocate Qty: </span>
										<span className="cart-prod-val">5</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Price: </span>
										<span className="cart-prod-val">2222.5</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">UOM: </span>
										<span className="cart-prod-val">Case</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Schemes: </span>
										<span className="cart-prod-val">
											Buy 5 case Get 1 Case Free
										</span>
									</div>
									<div className="cart-prod-qty">
										<input
											style={{ textAlign: "right" }}
											type="number"
											className="qty-ctl"
											step="1"
											defaultValue="3"
										/>
									</div>
								</div>
								<div className="cart-prod-div">
									<div className="cart-prod-title">Macaroni - FG -8114044</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-val">
											CHEF'S BASKET-PASTA-MACARONI-POUCH-60X180gm
										</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Physical Inventory: </span>
										<span className="cart-prod-val">20</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Allocate Qty: </span>
										<span className="cart-prod-val">5</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Price: </span>
										<span className="cart-prod-val">2222.5</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">UOM: </span>
										<span className="cart-prod-val">Case</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Schemes: </span>
										<span className="cart-prod-val">
											Buy 5 case Get 1 Case Free
										</span>
									</div>
									<div className="cart-prod-qty">
										<input
											style={{ textAlign: "right" }}
											type="number"
											className="qty-ctl"
											step="1"
											defaultValue="3"
										/>
									</div>
								</div>
								<div className="cart-prod-div">
									<div className="cart-prod-title">Macaroni - FG -8114044</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-val">
											CHEF'S BASKET-PASTA-MACARONI-POUCH-60X180gm
										</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Physical Inventory: </span>
										<span className="cart-prod-val">20</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Allocate Qty: </span>
										<span className="cart-prod-val">5</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Price: </span>
										<span className="cart-prod-val">2222.5</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">UOM: </span>
										<span className="cart-prod-val">Case</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">Schemes: </span>
										<span className="cart-prod-val">
											Buy 5 case Get 1 Case Free
										</span>
									</div>
									<div className="cart-prod-qty">
										<input
											style={{ textAlign: "right" }}
											type="number"
											className="qty-ctl"
											step="1"
											defaultValue="3"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<div className="atcm-button-group">
								{" "}
								<Link to="" className="atcm-total-amount">
									<span className="atcm-icon">
										<i className="fas fa-cart-shopping mr-2"></i>
									</span>
									<span className="atcm-text">
										<span className="atc-unit">Unit: 5</span>
										<span className="atc-total">{cartTotal}</span>
									</span>
								</Link>{" "}
								<Link to="" className="atcm-place-order">
									<span>Place Order</span>
									<i className="fa-solid fa-circle-arrow-right"></i>
								</Link>{" "}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Toaster position="bottom-center" reverseOrder={false} />
		</>
	);
};

export default PlaceOrder;
