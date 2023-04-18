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
import { getRoundOff, getUniqueByKey } from "./utils/findUniqueBykey";
import Swal from "sweetalert2";
import { toast, Toaster } from "react-hot-toast";
import SearchFilter from "../../components/ModifyOrder/SearchFilter";

const ModifyOrders = (props) => {
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
	const { order_grid_details_UniqueByKey, order_details } = orderDetails;
	const { addTocart, selectedOrder } = placeOrder;
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
	const [selectedBrand, setSelectedBrand] = useState({});
	const [selectedFlavour, setSelectedFlavour] = useState("");
	const [selectedProductLine, setSelectedProductLine] = useState("");
	const [selectedPackType, setSelectedPackType] = useState("");
	const [disableFilter, setDisableFilter] = useState(false);
	const [disableAddToCart, setDisableAddToCart] = useState(true);
	const [showOrderSummary, setShowOrderSummary] = useState("d-none");
	const [showSearchFilter, setShowSearchFilter] = useState("d-none");
	const [showPlaceOrder, setShowPlaceOrder] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [empty, setEmpty] = useState(false);
	const [disableConfirm, setDisableConfirm] = useState(false);
	const [showPromoModel, setShowPromoModel] = useState(true);
	const [cartLoading, setCartLoading] = useState(false);

	useEffect(() => {
		if (userProfile.usertype !== "null") {
			dispatch(setOrderDetails("null"));
			dispatch(setAddToCart([]));
			setSelectedPackType("");
			setSelectedBrand({});
			dispatch(setProductLine("null"));
			dispatch(setFlavour("null"));
			setOrderData([]);
			window.scrollTo({ top: 0, behavior: "smooth" });
			getOrderFilters();

			// setShowOrderSummary("d-block");
			// // setShowSearchFilter("d-block");
			// setShowPlaceOrder(true);
		} else {
			navigate("/");
		}
	}, [userProfile]);

	const handlePackType = (e) => {
		{
			setEmpty(false);
		}
		{
			setOrderData([]);
		}
		{
			setSelectedBrand({});
		}
		{
			setSelectedFlavour("");
		}
		{
			dispatch(setFlavour("null"));
		}
		{
			dispatch(setProductLine("null"));
		}
		setSelectedPackType(JSON.parse(e.target.value));
	};
	// Storing or Modifing data through react state Ends

	const checkCartData = (cartCount) => {
		setCartLoading(false);
		if (cartCount.payload.length === 0) {
			setShowSearchFilter("d-block");
		} else {
			setShowOrderSummary("d-block");
			setShowPlaceOrder(true);
		}
	};
	const getOrderFilters = async () => {
		setCartLoading(true);
		await PlaceOrderService.getModifyOrderDetails({
			userProfile,
			selectedOrder,
		}).then((response) => {
			const key = "portal_item_code";
			const order_grid_details_UniqueByKey = getUniqueByKey(
				response.data.order_grid_details,
				key
			);
			let order_details = response.data.order_details;
			let data = { order_grid_details_UniqueByKey, order_details };
			dispatch(setOrderDetails(data));
			let cartCount = dispatch(
				setAddToCart(
					order_grid_details_UniqueByKey.filter(function (el) {
						return el.pp_ordered_qty > 0;
					})
				)
			);

			// setShowOrderSummary("d-block");
			// // setShowSearchFilter("d-block");
			// setShowPlaceOrder(true);
			// setCartLoading(false);
			checkCartData(cartCount);

			// setOrderData(
			// 	order_grid_details_UniqueByKey.filter(function (el) {
			// 		return el.pp_ordered_qty === "0.0";
			// 	})
			// );
		});

		//AXIOS WRAPPER FOR API CALL
		await PlaceOrderService.getOrderFilters(userProfile).then((response) => {
			dispatch(setOrderFilter(response.data));
		});
		//AXIOS WRAPPER FOR API CALL
	};

	const getProductLine = async (brand) => {
		// AXIOS WRAPPER FOR API CALL
		setSelectedBrand(brand);
		setSelectedProductLine("");
		setSelectedFlavour("");
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

	// useEffect(() => {
	// 	if (addTocart.length === 0) {
	// 		setShowSearchFilter("d-block");
	// 		setShowSearchFilter(true);
	// 		setShowOrderSummary("d-none");
	// 		setShowPlaceOrder(false);
	// 	}
	// }, [disableFilter, addTocart, orderData]);

	const showFilterData = async (e) => {
		e.preventDefault();
		if (Object.keys(selectedPackType).length === 0) {
			return toast.error("You missed selecting Pack type");
		} else if (Object.keys(selectedBrand).length === 0) {
			return toast.error("You missed selecting Brand");
		}

		// Show filtered data based on packType, selectedBrand, selectedProductLine and selectedFlavour
		let filterData = order_grid_details_UniqueByKey.filter(function (el) {
			if (
				selectedPackType &&
				selectedBrand &&
				selectedProductLine &&
				selectedFlavour
			) {
				return (
					el.customer_type === selectedPackType.pack_type_desc &&
					el.brand === selectedBrand.brand_desc &&
					el.product_line === selectedProductLine.product_line_desc &&
					el.flavour === selectedFlavour.flavour_desc
				);
			} else if (selectedPackType && selectedBrand && selectedProductLine) {
				return (
					el.customer_type === selectedPackType.pack_type_desc &&
					el.brand === selectedBrand.brand_desc &&
					el.product_line === selectedProductLine.product_line_desc
				);
			} else if (selectedPackType && selectedBrand) {
				return (
					el.customer_type === selectedPackType.pack_type_desc &&
					el.brand === selectedBrand.brand_desc
				);
			}
		});
		setDisableAddToCart(true);
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

	const addToCart = () => {
		let currItemList = orderData.filter(function (el) {
			return el.pp_ordered_qty >= 1;
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
		// 		return el.pp_ordered_qty == 0;
		// 	})
		// );
		setDisableAddToCart(true);
	};

	const removeFromCart = (e, id) => {
		id.pp_ordered_qty = 0;
		//Removing item from order summary based on selected portal_item_code
		if (addTocart.length === 1) {
			setShowSearchFilter("d-block");
			setShowPlaceOrder(false);
		}
		dispatch(
			setAddToCart(
				addTocart.filter(
					(item, i) => item.portal_item_code !== id.portal_item_code
				)
			)
		);

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

	const maxLengthCheck = (object) => {
		if (object.target.value.length > object.target.maxLength) {
			object.target.value = object.target.value.slice(
				0,
				object.target.maxLength
			);
		}

		object.target.value =
			!!object.target.value && Math.abs(object.target.value) >= 0
				? Math.abs(object.target.value)
				: null;
	};

	const handleQty = (e, item) => {
		// Handle order grid quantity and store in react state.
		const inputFieldQty = document.getElementById(
			`quantityFieldId-${item.portal_item_code}`
		);
		const inputFieldQty1 = document.getElementById(
			`quantityFieldId1-${item.portal_item_code}`
		);
		// console.log(inputFieldQty)
		// console.log(inputFieldQty1);
		// if (item.portal_reg_promo_flag === "N" && item.item_promo_flag === "Y") { RFG-8113002
		if (
			item.portal_reg_promo_flag === "Y" &&
			item.item_promo_flag === "N"
			//  && !showPromoModel
		) {
			Swal.fire({
				title:
					"You have a Promo Running item Code, please enter your Order in Promo Item Code",
				showCancelButton: true,
				confirmButtonText: "Yes",
				customClass: {
					actions: "my-actions",
					confirmButton: "order-1 right-gap",
					cancelButton: "order-2",
				},
			}).then((result) => {
				if (result.isConfirmed) {
					{
						inputFieldQty.value = 0;
					}
					{
						inputFieldQty1.value = 0;
					}
					setOrderData((orderData) =>
						orderData.map((data) =>
							item.portal_item_code === data.portal_item_code
								? { ...data, pp_ordered_qty: 0 }
								: data
						)
					);
					// console.log("input value after click :", orderData);
					// Swal.fire("Saved!", "", "success");
				} else if (result.isDenied) {
					Swal.fire("Changes are not saved", "", "info");
				}
			});
		}

		setOrderData((orderData) =>
			orderData.map((data) =>
				item.portal_item_code === data.portal_item_code
					? { ...data, pp_ordered_qty: e.target.value }
					: data
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
						? { ...item, pp_ordered_qty: e.target.value }
						: item
				)
			)
		);
		// setDisableAddToCart(false);
	};

	const saveOrder = async (e) => {
		// setShowPlaceOrder(false)
		e.preventDefault();
		setDisableConfirm(true);
		if (addTocart.length > 0) {
			addToCartTotal = getRoundOff(addToCartTotal, 2);
			await PlaceOrderService.saveModifyOrder({
				userProfile,
				order_details,
				profile_details,
				addToCartTotal,
				addTocart,
				selectedOrder,
			}).then((response) => {
				{
					response.data.error_code === "0"
						? toast.success(
								<span>
									{`${response.data.message}-- ${response.data.order_no}`}
								</span>,
								{ duration: 4000 },
								dispatch(setAddToCart([]), navigate("/dashboard"))
						  )
						: toast.error(
								<span>
									{`${response.data.message}-- ${response.data.add_message}`}
								</span>
						  );
				}
			});
		} else {
			setDisableConfirm(false);
		}
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
								<li className="breadcrumb-item active">Modify Order</li>
							</ol>
						</div>
					</div>
					{/* <SearchFilter
						showSearchFilter={showSearchFilter}
						getOrderDetails={getOrderDetails}
						distributor_details={distributor_details}
						salePerson={salePerson}
						pack_type_details={pack_type_details}
						disableFilter={disableFilter}
						disableAddToCart={disableAddToCart}
						selectedPackType={selectedPackType}
						getProductLine={getProductLine}
						brand_details={brand_details}
						selectedBrand={selectedBrand}
						getFlavour={getFlavour}
						product_line_details={product_line_details}
						setSelectedFlavour={setSelectedFlavour}
						flavour_details={flavour_details}
						showFilterData={showFilterData}
						handlePackType={handlePackType}
						setDisableFilter={setDisableFilter}
						setDisableAddToCart={setDisableAddToCart}
						setOrderData={setOrderData}
						orderData={orderData}
						loading={loading}
						cartTotalQty={cartTotalQty}
						cartTotal={cartTotal}
						inputRef1={inputRef1}
						maxLengthCheck={maxLengthCheck}
						handleQty={handleQty}
						selectedProductLine={selectedProductLine}
						selectedFlavour={selectedFlavour}
						addToCart={addToCart}
						empty={empty}
						addTocart={addTocart}
						showOrderSummary={showOrderSummary}
						addToCartQty={addToCartQty}
						addToCartTotal={addToCartTotal}
						removeFromCart={removeFromCart}
						handleQtyInCart={handleQtyInCart}
						saveOrder={saveOrder}
						disableConfirm={disableConfirm}
						setShowOrderSummary={setShowOrderSummary}
						setShowSearchFilter={setShowSearchFilter}
						setShowPlaceOrder={setShowPlaceOrder}
					/>

					 */}
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
																		disabled={true}
																		required>
																		<option>
																			{selectedOrder &&
																				selectedOrder.customer_name}
																		</option>
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
																		defaultValue={
																			order_details && order_details.so_name
																		}
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
																							disabled={
																								disableFilter ||
																								!disableAddToCart
																							}
																							checked={
																								selectedPackType &&
																								selectedPackType.pack_type_code ===
																									packType.pack_type_code
																							}
																							type="radio"
																							value={JSON.stringify(packType)}
																							id={packType.pack_type_code}
																							name="Pro-type"
																							onChange={(e) =>
																								handlePackType(e)
																							}
																						/>
																						<label
																							onClick={() => {
																								if (!disableAddToCart) {
																									toast.error(
																										"Please add item to cart or reset!"
																									);
																									// alert("plese order first");
																								}
																							}}
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
																		disabled={
																			disableFilter || !disableAddToCart
																		}
																		onClick={(e) =>
																			getProductLine(JSON.parse(e.target.value))
																		}
																		required>
																		<option>Select Brand</option>
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
																		{brand_details &&
																			brand_details.map((brand, index) => (
																				<div
																					className="lbl-radio-btn"
																					key={brand.brand_code}>
																					<input
																						disabled={
																							disableFilter || !disableAddToCart
																						}
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
																							getProductLine(
																								JSON.parse(e.target.value)
																							)
																						}
																					/>

																					{/* <label>{brand.brand_desc}</label> */}
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
																		disabled={
																			disableFilter || !disableAddToCart
																		}
																		onChange={(e) =>
																			getFlavour(JSON.parse(e.target.value))
																		}
																		required>
																		<option value={JSON.stringify("")}>
																			Show All
																		</option>

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
																		disabled={
																			disableFilter || !disableAddToCart
																		}
																		onChange={(e) =>
																			setSelectedFlavour(
																				JSON.parse(e.target.value)
																			)
																		}
																		required>
																		<option value={JSON.stringify("")}>
																			Show All
																		</option>
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
													<div className="row">
														<div
															className="col-md-12"
															style={{ textAlign: "right" }}>
															<button
																type="button"
																onClick={(e) => (
																	setDisableFilter(false),
																	setDisableAddToCart(true),
																	// setSelectedPackType("null"),
																	// dispatch(setFlavour("null")),
																	// dispatch(setProductLine("null")),
																	setOrderData([])
																)}
																className="btn btn-danger btn-md">
																<i className="fas fa fa-gear mr-2"></i> Reset
															</button>

															<button
																onClick={(e) => (
																	showFilterData(e), setDisableFilter(false)
																)}
																// disabled={disableFilter || salePerson === null}
																type="button"
																className="btn btn-primary btn-md ml-2"
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
																				cartTotalQty + item.pp_ordered_qty),
																			(cartTotal +=
																				item.portal_billing_price *
																				item.pp_ordered_qty),
																			(
																				<tr key={index}>
																					<td className="font12">
																						{item.portal_item_code}
																					</td>
																					<td className="font12">
																						{item.portal_item_desc}
																					</td>
																					<td className="font12">
																						{item.erp_commited_qty}
																					</td>
																					<td className="font12">
																						{item.physical_inventory_qty}
																					</td>
																					<td className="font12">
																						{/* {item.portal_billing_price > 0
                                                                        ? item.portal_billing_price
                                                                        : "Price not found"} */}
																						{item.portal_billing_price > 0 ? (
																							(
																								Math.round(
																									item.portal_billing_price *
																										100
																								) / 100
																							).toFixed(2)
																						) : (
																							<span className="text-danger">
																								Price not found
																							</span>
																						)}
																					</td>
																					<td className="font12">{item.uom}</td>
																					<td className="font12">
																						<input
																							disabled={
																								item.portal_billing_price == 0
																									? true
																									: false
																							}
																							style={{ textAlign: "right" }}
																							ref={inputRef1}
																							min={0}
																							maxLength="3"
																							onInput={maxLengthCheck}
																							type="number"
																							className="qty-ctl"
																							id={`quantityFieldId1-${item.portal_item_code}`}
																							step="1"
																							// defaultValue={
																							// 	item.pp_ordered_qty
																							// }
																							placeholder={item.pp_ordered_qty}
																							onKeyPress={(event) => {
																								if (
																									event.charCode < 48 ||
																									event.charCode > 58
																								) {
																									event.preventDefault();
																								}
																							}}
																							// onChange={(e) =>
																							// 	handleQty(e, item)
																							// }
																							onBlur={(e) => handleQty(e, item)}
																						/>
																					</td>
																					<td className="font12">
																						{/* {item.portal_billing_price *
                                                                        item.pp_ordered_qty} */}

																						{Math.round(
																							item.portal_billing_price *
																								item.pp_ordered_qty *
																								100
																						) / (100).toFixed(2)}
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
																{selectedProductLine.product_line_desc
																	? selectedProductLine.product_line_desc
																	: "All"}
															</li>
															<li className="breadcrumb-item active">
																{selectedFlavour.flavour_desc
																	? selectedFlavour.flavour_desc
																	: "All"}
															</li>
														</ol>
													</div>

													{orderData.map((item, index) => (
														<div className="cart-prod-div" key={index}>
															<div className="cart-prod-title">
																{item.portal_item_code} - ({item.portal_mrp})
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
																		{item.portal_billing_price > 0 ? (
																			Math.round(
																				item.portal_billing_price * 100
																			) / (100).toFixed(2)
																		) : (
																			<span className="text-danger">
																				Price not found
																			</span>
																		)}
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
																			item.portal_billing_price == 0
																				? true
																				: false
																		}
																		style={{ textAlign: "right" }}
																		min={0}
																		maxLength="3"
																		onInput={maxLengthCheck}
																		// max={10}
																		ref={inputRef1}
																		type="number"
																		className="qty-ctl"
																		id={`quantityFieldId-${item.portal_item_code}`}
																		step="1"
																		placeholder={item.pp_ordered_qty}
																		onKeyPress={(event) => {
																			if (
																				event.charCode < 48 ||
																				event.charCode > 58
																			) {
																				event.preventDefault();
																			}
																		}}
																		onBlur={(e) => handleQty(e, item)}
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
														Total:{" "}
														{Math.round(cartTotal * 100) / (100).toFixed(2)}
													</h4>
												</div>
											</div>
										</div>
									)}
								</div>
							)}

							{empty && (
								<h1 className="text-center card-header">No Data found</h1>
							)}
						</div>
						{addToCart && cartLoading && (
							<ColorRing
								visible={true}
								height="80"
								width="100%"
								ariaLabel="blocks-loading"
								wrapperStyle={{ textAlign: "center" }}
								wrapperClass="blocks-wrapper"
								colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
							/>
						)}
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
											// className={`card-body collapse d-sm-block ${showOrderSummary}`}
											className={`card-body collapse d-sm-block ${showOrderSummary}`}
											id="collapseTwo"
											aria-expanded="true">
											<div className="cart-prod-list scroll">
												{addTocart != "null" &&
													addTocart.map(
														(item, index) => (
															(addToCartQty =
																addToCartQty + item.pp_ordered_qty),
															(addToCartTotal +=
																item.portal_billing_price *
																item.pp_ordered_qty),
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
																			maxLength="3"
																			onInput={maxLengthCheck}
																			style={{ textAlign: "right" }}
																			onChange={(e) =>
																				handleQtyInCart(
																					e,
																					item.portal_item_code
																				)
																			}
																			onKeyPress={(event) => {
																				if (event.charCode < 48) {
																					event.preventDefault();
																				}
																			}}
																			// disabled={true}
																			type="number"
																			className="qty-ctl"
																			step="1"
																			// defaultValue={item.pp_ordered_qty}
																			placeholder={item.pp_ordered_qty}
																		/>

																		{/* <span className="cart-prod-lbl ml-2">
                                                        {item.pp_ordered_qty} *{" "}
                                                        {item.portal_billing_price} =
                                                        <b>
                                                            {item.pp_ordered_qty *
                                                                item.portal_billing_price}
                                                        </b>
                                                    </span> */}
																		<div
																			className="cart-prod-desc"
																			style={{ float: "right" }}>
																			<span className="cart-prod-lbl">
																				Value:{" "}
																				{Math.round(
																					(item.pp_ordered_qty *
																						item.portal_billing_price *
																						100) /
																						100
																				).toFixed(2)}
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
												{Math.round(addToCartTotal * 100) / (100).toFixed(2)}
											</h1>

											<button
												onClick={(e) => saveOrder(e)}
												type="button"
												disabled={disableConfirm}
												className="btn btn-primary btn-block btn-lg my-3 d-sm-block d-none">
												Approve{" "}
												<i className="fa-solid fa-circle-arrow-right"></i>
											</button>
										</div>
									</div>
								</div>
								<div className="col-12 d-sm-none">
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
							<span className="atc-unit">
								Amt    : 
								{Math.round(addToCartTotal * 100) / (100).toFixed(2)}
							</span>
						</span>
					</Link>{" "}
					{showPlaceOrder === false && (
						<Link
							className="atcm-place-order"
							// data-toggle="collapse"
							// data-target="#collapseOne"
							// aria-expanded="false"
							onClick={() => {
								if (!disableAddToCart) {
									toast.error("Please add item to cart or reset!");
									// alert("plese order first");
								} else if (addTocart.length > 0) {
									setShowOrderSummary("d-block");
									setShowSearchFilter("d-none");
									setShowPlaceOrder(true);
									setEmpty(false);
									setOrderData([]);
								} else {
									toast.error("Order Summary is empty");
								}
							}}
							style={{ color: "#fff" }}>
							<span
							// data-toggle="collapse"
							// data-target="#collapseTwo"
							// aria-expanded="true"
							>
								Order Summary
							</span>
							<i className="fa-solid fa-circle-arrow-right"></i>
						</Link>
					)}
					{showPlaceOrder === true && (
						<button
							onClick={(e) => saveOrder(e)}
							type="button"
							className="atcm-place-order"
							disabled={disableConfirm}>
							<span>Approve</span>{" "}
							<i className="fa-solid fa-circle-arrow-right"></i>
						</button>
					)}
					{/* <i className="fa fa-spinner fa-spin">no spinner but why</i> */}
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
			{/* <Toaster position="bottom-center" reverseOrder={false} /> */}
		</>
	);
};

export default ModifyOrders;
