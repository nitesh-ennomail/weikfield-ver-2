import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import PlaceOrderService from "../../axios/services/api/placeOrder";
import {
	setFlavour,
	setOrderDetails,
	setOrderFilter,
	setProductLine,
} from "../../redux/actions/placeOrderAction";

import {
	addProduct,
	selectedProduct,
} from "../../redux/actions/productActions";

const PlaceOrder = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userProfile = useSelector((state) => state.userProfile);
	const orderFilter = useSelector((state) => state.placeOrder.orderFilter);
	const productLine = useSelector((state) => state.placeOrder.productLine);
	const flavour = useSelector((state) => state.placeOrder.flavour);
	const { flavour_details } = flavour;
	const { product_line_details } = productLine;
	const { distributor_details, brand_details } = orderFilter;

	let cartTotal = 0;
	const [input, setInput] = useState([]);
	const productData = [
		{
			id: 101,
			p_code: "FG-8114046",
			p_code_desc: "C0103",
			bo_qty: 130,
			w_h_stock: 1130,
			price: 100,
			uom: 65,
			qty: 1,
		},
		{
			id: 102,
			p_code: "FG-8114047",
			p_code_desc: "C0104",
			bo_qty: 45,
			w_h_stock: 1140,
			price: 140,
			uom: 40,
			qty: 1,
		},

		{
			id: 103,
			p_code: "FG-8114048",
			p_code_desc: "C0102",
			bo_qty: 110,
			w_h_stock: 1120,
			price: 120,
			uom: 50,
			qty: 1,
		},
		{
			id: 104,
			p_code: "FG-8114049",
			p_code_desc: "C0103",
			bo_qty: 130,
			w_h_stock: 1130,
			price: 100,
			uom: 65,
			qty: 1,
		},
		{
			id: 105,
			p_code: "FG-8114050",
			p_code_desc: "C0104",
			bo_qty: 45,
			w_h_stock: 1140,
			price: 140,
			uom: 40,
			qty: 1,
		},

		{
			id: 106,
			p_code: "FG-8114051",
			p_code_desc: "C0102",
			bo_qty: 110,
			w_h_stock: 1120,
			price: 1200,
			uom: 50,
			qty: 1,
		},
		{
			id: 107,
			p_code: "FG-8114052",
			p_code_desc: "C0103",
			bo_qty: 130,
			w_h_stock: 1130,
			price: 100,
			uom: 65,
			qty: 1,
		},
	];

	const [orderData, setOrderData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedBrand, setSelectedBrand] = useState(null);
	const [selectedFlavour, setSelectedFlavour] = useState(null);
	const [selectedProductLine, setSelectedProductLine] = useState(null);

	const [disableFilter, setDisableFilter] = useState(true);

	const getOrderFilters = async () => {
		//AXIOS WRAPPER FOR API CALL
		setLoading(true);
		await PlaceOrderService.getOrderFilters(userProfile).then((response) => {
			dispatch(setOrderFilter(response.data));
			setLoading(false);
		});
		//AXIOS WRAPPER FOR API CALL
	};

	const getOrderDetails = async (data) => {
		// AXIOS WRAPPER FOR API CALL
		{
			data !== null ? (
				<>
					{
						(setLoading(true),
						await PlaceOrderService.getOrderDetails({ userProfile, data }).then(
							(response) => {
								dispatch(setOrderDetails(response.data));
								setLoading(false);
								setDisableFilter(false);
							}
						))
					}
				</>
			) : (
				setDisableFilter(true)
			);
		}
		// AXIOS WRAPPER FOR API CALL
	};

	const getProductLine = async (brand) => {
		// AXIOS WRAPPER FOR API CALL
		setSelectedBrand(brand);
		dispatch(setFlavour("null"));
		dispatch(setProductLine("null"));
		setLoading(true);
		await PlaceOrderService.getProductLine({ userProfile, brand }).then(
			(response) => {
				dispatch(setProductLine(response.data));
				setLoading(false);
			}
		);
		// AXIOS WRAPPER FOR API CALL
	};

	const getFlavour = async (productLine) => {
		// AXIOS WRAPPER FOR API CALL
		setSelectedProductLine(productLine);
		setLoading(true);
		await PlaceOrderService.getFlavour({
			userProfile,
			selectedBrand,
			productLine,
		}).then((response) => {
			dispatch(setFlavour(response.data));
			setLoading(false);
		});
		// AXIOS WRAPPER FOR API CALL
	};

	// useEffect(() => {
	// 	setOrderData(productData);
	// }, []);

	const showFilterData = async () => {
		console.log(
			selectedBrand.brand_desc,
			selectedProductLine.product_line_desc,
			selectedFlavour.flavour_desc
		);
	};

	useEffect(() => {
		if (userProfile.usertype !== "null") {
			getOrderFilters();
		} else {
			navigate("/");
		}
	}, []);

	const addToCart = (product) => {
		dispatch(addProduct(product));
	};

	const handleQty = (e, id) => {
		setOrderData((orderData) =>
			orderData.map((item) =>
				id === item.p_code ? { ...item, qty: e.target.value } : item
			)
		);
	};
	return (
		<>
			<div className="content-wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									{" "}
									<a href="Dashboard.html">Dashboard</a>{" "}
								</li>
								<li className="breadcrumb-item active">Place Order</li>
							</ol>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8">
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
																		defaultValue="Subhadeep Sen"
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
																		<div className="lbl-radio-btn flex-fill">
																			<input
																				disabled={disableFilter}
																				type="radio"
																				defaultValue="0"
																				id="proSale"
																				name="Pro-type"
																			/>
																			<label htmlFor="proSale">Consumer</label>
																		</div>
																		<div className="lbl-radio-btn flex-fill">
																			<input
																				disabled={disableFilter}
																				type="radio"
																				defaultValue="0"
																				id="proRent"
																				name="Pro-type"
																			/>
																			<label htmlFor="proRent">
																				Institution
																			</label>
																		</div>
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
																			// getProductLine(e.target.value)
																			getProductLine(JSON.parse(e.target.value))
																		}
																		required>
																		<option>Show All</option>

																		{brand_details &&
																			brand_details.map((brand, index) => (
																				<option
																					key={brand.brand_code}
																					// value={brand.brand_code}
																					value={JSON.stringify(brand)}>
																					{brand.brand_desc}
																				</option>
																			))}
																	</select>
																	<div className="lbl-radio-group hrl-scrl-rdo d-block d-sm-none">
																		{disableFilter ? (
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
														<div className="col-md-10"></div>
														<div className="col-md-2">
															{/* <button className="form-control"> */}

															<button
																disabled={disableFilter}
																type="button"
																onClick={() => showFilterData()}
																className="btn btn-block btn-primary btn-md">
																<i className="fas fa fa-search mr-2"></i> Search
															</button>
														</div>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card border-0 rounded-0 mb-3">
								<div className="card-body">
									<div className="table-responsive d-none d-sm-block">
										<table
											className="table table-bordered"
											id="dataTables1"
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
												{orderData.map(
													(item, index) => (
														(cartTotal += item.price * item.qty),
														(
															<tr key={index}>
																<td>{item.p_code}</td>
																<td>{item.p_code_desc}</td>
																<td>{item.bo_qty}</td>
																<td>{item.w_h_stock}</td>
																<td>{item.price}</td>
																<td>{item.uom}</td>
																<td>
																	<input
																		min={1}
																		max={10}
																		type="number"
																		className="qty-ctl"
																		step="1"
																		defaultValue={item.qty}
																		onChange={(e) => handleQty(e, item.p_code)}
																		// onKeyDown={(event) =>
																		// 	(event.keyCode != 8 && event.keyCode == 0) ||
																		// 	(event.keyCode >= 48 && event.keyCode <= 57)
																		// }

																		// onKeyDown={(event) =>
																		// 	console.log(event.keyCode)
																		// }
																		// value={item.qty}
																		// value={`${input[index]}`}
																		// onInput={(e) => setInput(e.target.value)}

																		// onChange={(e) =>
																		// 	dispatch(
																		// 		addProduct({
																		// 			p_code: item.p_code,
																		// 			p_price: item.price,
																		// 			p_qty: e.target.value,
																		// 			total: e.target.value * item.price,
																		// 		})
																		// 	)
																		// }

																		// onChange={addToCart({
																		// 	p_code: item.p_code,
																		// 	p_code_desc: item.p_code_desc,
																		// 	bo_qty: item.bo_qty,
																		// 	price: item.price,
																		// 	total: item.price * item.qty,
																		// 	qty: item.qty,
																		// })}
																	/>
																</td>
																<td>{item.price * item.qty}</td>
															</tr>
														)
													)
												)}
											</tbody>
											{/* <tbody>
												<tr>
													<td>Data 22</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>
														<input
															type="number"
															className="qty-ctl"
															step="1"
															defaultValue=""
														/>
													</td>
													<td>Data</td>
												</tr>
												<tr>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>
														<input
															type="number"
															className="qty-ctl"
															step="1"
															defaultValue=""
														/>
													</td>
													<td>Data</td>
												</tr>
												<tr>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>
														<input
															type="number"
															className="qty-ctl"
															step="1"
															defaultValue=""
														/>
													</td>
													<td>Data</td>
												</tr>
												<tr>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>
														<input
															type="number"
															className="qty-ctl"
															step="1"
															defaultValue=""
														/>
													</td>
													<td>Data</td>
												</tr>
												<tr>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>Data</td>
													<td>
														<input
															type="number"
															className="qty-ctl"
															step="1"
															defaultValue=""
														/>
													</td>
													<td>Data</td>
												</tr>
											</tbody> */}
										</table>
									</div>
									<div className="cart-prod-list d-block d-sm-none">
										<div className="cart-prod-div">
											<div className="cart-prod-title">
												Macaroni - FG -8114044
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-val">
													CHEF'S BASKET-PASTA-MACARONI-POUCH-60X180gm
												</span>
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-lbl">
													Physical Inventory:{" "}
												</span>
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
													type="number"
													className="qty-ctl"
													step="1"
													defaultValue="3"
												/>
											</div>
										</div>
										<div className="cart-prod-div">
											<div className="cart-prod-title">
												Macaroni - FG -8114044
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-val">
													CHEF'S BASKET-PASTA-MACARONI-POUCH-60X180gm
												</span>
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-lbl">
													Physical Inventory:{" "}
												</span>
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
													type="number"
													className="qty-ctl"
													step="1"
													defaultValue="3"
												/>
											</div>
										</div>
										<div className="cart-prod-div">
											<div className="cart-prod-title">
												Macaroni - FG -8114044
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-val">
													CHEF'S BASKET-PASTA-MACARONI-POUCH-60X180gm
												</span>
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-lbl">
													Physical Inventory:{" "}
												</span>
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
													type="number"
													className="qty-ctl"
													step="1"
													defaultValue="3"
												/>
											</div>
										</div>
										<div className="cart-prod-div">
											<div className="cart-prod-title">
												Macaroni - FG -8114044
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-val">
													CHEF'S BASKET-PASTA-MACARONI-POUCH-60X180gm
												</span>
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-lbl">
													Physical Inventory:{" "}
												</span>
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
													type="number"
													className="qty-ctl"
													step="1"
													defaultValue="3"
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="card-footer bg-white">
									<div className="row">
										<div className="col-md-3 mb-3 d-none d-sm-block">
											<button
												type="button"
												className="btn btn-block btn-primary btn-md">
												<i className="fas fa-cart-shopping mr-2"></i> Add to
												Cart
											</button>
										</div>
										<div className="col-md-6 text-center">
											<div className="form-group mb-2">
												{" "}
												<span className="pr-4">
													<i className="fas fa-flag text-success  mr-2"></i>New
													Launch
												</span>{" "}
												<span className="pr-4">
													<i className="fas fa-flag text-info mr-2"></i> Promo
												</span>{" "}
												<span className="pr-4">
													<i className="fas fa-flag  mr-2"></i> Balance SKU's{" "}
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
							</div>
						</div>
						<div className="col-md-4 d-none d-sm-block">
							<div className="card card-primary border-0 rounded-0 mb-3">
								<div className="card-header">Order Summary</div>
								<div className="card-body">
									<div className="cart-prod-list scroll">
										<div className="cart-prod-div">
											<div className="cart-prod-title">
												Macaroni - FG -8114044
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-val">
													CHEF'S BASKET-PASTA-MACARONI-POUCH-60X180gm
												</span>
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-lbl">
													Physical Inventory:{" "}
												</span>
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
													type="number"
													className="qty-ctl"
													step="1"
													defaultValue="3"
												/>
											</div>
										</div>
										<div className="cart-prod-div">
											<div className="cart-prod-title">
												Macaroni - FG -8114044
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-val">
													CHEF'S BASKET-PASTA-MACARONI-POUCH-60X180gm
												</span>
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-lbl">
													Physical Inventory:{" "}
												</span>
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
													type="number"
													className="qty-ctl"
													step="1"
													defaultValue="3"
												/>
											</div>
										</div>
										<div className="cart-prod-div">
											<div className="cart-prod-title">
												Macaroni - FG -8114044
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-val">
													CHEF'S BASKET-PASTA-MACARONI-POUCH-60X180gm
												</span>
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-lbl">
													Physical Inventory:{" "}
												</span>
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
													type="number"
													className="qty-ctl"
													step="1"
													defaultValue="3"
												/>
											</div>
										</div>
										<div className="cart-prod-div">
											<div className="cart-prod-title">
												Macaroni - FG -8114044
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-val">
													CHEF'S BASKET-PASTA-MACARONI-POUCH-60X180gm
												</span>
											</div>
											<div className="cart-prod-desc">
												<span className="cart-prod-lbl">
													Physical Inventory:{" "}
												</span>
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
													type="number"
													className="qty-ctl"
													step="1"
													defaultValue="3"
												/>
											</div>
										</div>
									</div>
									<p className="text-center m-0 font-weight-bold">
										Total Unit: <span className="text-danger">12</span>
									</p>
									<h1 className="text-center text-success">₹599.00</h1>
									<button
										type="button"
										className="btn btn-primary btn-block btn-lg my-3">
										Place Order{" "}
										<i className="fa-solid fa-circle-arrow-right"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="atc-footer-mobile d-block d-sm-none">
				<div className="atcm-button-group">
					{" "}
					<a
						href="#modalshowcart"
						className="atcm-total-amount"
						data-toggle="modal">
						<span className="atcm-icon">
							<i className="fas fa-cart-shopping mr-2"></i>
						</span>
						<span className="atcm-text">
							<span className="atc-unit">Unit: 5</span>
							<span className="atc-total">₹599.00</span>
						</span>
					</a>{" "}
					<a href="#" className="atcm-place-order">
						<span>Place Order</span>
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
								<a href="#" className="atcm-total-amount">
									<span className="atcm-icon">
										<i className="fas fa-cart-shopping mr-2"></i>
									</span>
									<span className="atcm-text">
										<span className="atc-unit">Unit: 5</span>
										<span className="atc-total">₹599.00</span>
									</span>
								</a>{" "}
								<a href="#" className="atcm-place-order">
									<span>Place Order</span>
									<i className="fa-solid fa-circle-arrow-right"></i>
								</a>{" "}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PlaceOrder;
