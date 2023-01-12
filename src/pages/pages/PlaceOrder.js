import React, { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
	addProduct,
	selectedProduct,
} from "../../redux/actions/productActions";

const PlaceOrder = (props) => {
	const dispatch = useDispatch();
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
	console.log("productData", productData);

	const [orderData, setOrderData] = useState([]);

	useEffect(() => {
		setOrderData(productData);
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
																		required>
																		<option>Show All</option>
																		<option defaultValue="1">Option 01</option>
																		<option defaultValue="2">Option 02</option>
																		<option defaultValue="3">Option 03</option>
																		<option defaultValue="4">Option 04</option>
																		<option defaultValue="4">Option 05</option>
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
																				type="radio"
																				defaultValue="0"
																				id="proSale"
																				name="Pro-type"
																			/>
																			<label htmlFor="proSale">Consumer</label>
																		</div>
																		<div className="lbl-radio-btn flex-fill">
																			<input
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
																		required>
																		<option>Show All</option>
																		<option defaultValue="1">Option 01</option>
																		<option defaultValue="2">Option 02</option>
																		<option defaultValue="3">Option 03</option>
																		<option defaultValue="4">Option 04</option>
																		<option defaultValue="5">Option 05</option>
																	</select>
																	<div className="lbl-radio-group hrl-scrl-rdo d-block d-sm-none">
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option01"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option01">
																				Option 01
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option02"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option02">
																				Option 02
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option03"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option03">
																				Option 03
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option04"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option04">
																				Option 04
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option05"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option05">
																				Option 05
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option06"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option06">
																				Option 06
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option07"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option07">
																				Option 07
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option08"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option08">
																				Option 08
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option09"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option09">
																				Option 09
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option10"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option10">
																				Option 10
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option11"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option11">
																				Option 11
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option12"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option12">
																				Option 12
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option13"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option13">
																				Option 13
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option14"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option14">
																				Option 14
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option15"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option15">
																				Option 15
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option16"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option16">
																				Option 16
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option17"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option17">
																				Option 17
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option18"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option18">
																				Option 18
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option19"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option19">
																				Option 19
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option20"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option20">
																				Option 20
																			</label>
																		</div>
																		<div className="lbl-radio-btn">
																			<input
																				type="radio"
																				defaultValue="0"
																				id="Option21"
																				name="brandRdoGrp"
																			/>
																			<label htmlFor="Option21">
																				Option 21
																			</label>
																		</div>
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
																		required>
																		<option>Show All</option>
																		<option defaultValue="1">Option 01</option>
																		<option defaultValue="2">Option 02</option>
																		<option defaultValue="3">Option 03</option>
																		<option defaultValue="4">Option 04</option>
																		<option defaultValue="4">Option 05</option>
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
																		required>
																		<option>Show All</option>
																		<option defaultValue="1">Option 01</option>
																		<option defaultValue="2">Option 02</option>
																		<option defaultValue="3">Option 03</option>
																		<option defaultValue="4">Option 04</option>
																		<option defaultValue="4">Option 05</option>
																	</select>
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
