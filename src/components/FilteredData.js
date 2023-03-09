import React, { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueByKey } from "../pages/pages/utils/findUniqueBykey";
import { setAddToCart } from "../redux/actions/placeOrderAction";

const FilteredData = (
	ord,
	selectedBrand,
	selectedFlavour,
	selectedProductLine
) => {
	const dispatch = useDispatch();
	const placeOrder = useSelector((state) => state.placeOrder);
	const { addTocart } = placeOrder;

	const [disableAddToCart, setDisableAddToCart] = useState(true);

	// Assigning local variable
	let cartTotal = 0;
	let cartTotalQty = 0;
	let addToCartTotal = 0;
	let addToCartQty = 0;
	const [orderData, setOrderData] = useState(ord);

	useEffect(() => {
		console.log("orderData", orderData);
		console.log("selectedBrand", selectedBrand);
		console.log("flovour", selectedFlavour);
		console.log("pline", selectedProductLine);
	}, []);

	// Assigning local variable Ends
	const handleQty = (e, id) => {
		// Handle order grid quantity and store in react state.
		let oo = orderData.ord;
		setOrderData((oo) =>
			orderData.map((item) =>
				id === item.portal_item_code
					? { ...item, sit_inventory_qty: e.target.value }
					: item
			)
		);
		setDisableAddToCart(false);
	};
	const addToCart = () => {
		let currItemList = orderData.orderData.filter(function (el) {
			return el.sit_inventory_qty >= 1;
		});
		// Merge previous order and current order
		let added_to_cart = [...addTocart, ...currItemList];
		// For removing duplicate key
		const key = "portal_item_code";
		const order_grid_details_UniqueByKey = getUniqueByKey(added_to_cart, key);
		// store the data in redux store
		dispatch(setAddToCart(order_grid_details_UniqueByKey));
		// setShowPlaceOrder(false);
		// setOrderData([]);
		setDisableAddToCart(true);
	};
	return (
		<>
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
								<>
									{orderData &&
										orderData.ord.map(
											(item, index) => (
												(cartTotalQty = cartTotalQty + item.sit_inventory_qty),
												(cartTotal += item.portal_mrp * item.sit_inventory_qty),
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
																disabled={item.portal_mrp == 0 ? true : false}
																style={{ textAlign: "right" }}
																// ref={inputRef1}
																min={1}
																max={10}
																type="number"
																className="qty-ctl"
																step="1"
																// defaultValue={
																// 	item.sit_inventory_qty
																// }
																placeholder={item.sit_inventory_qty}
																onChange={(e) =>
																	handleQty(e, item.portal_item_code)
																}
															/>
														</td>
														<td>{item.portal_mrp * item.sit_inventory_qty}</td>
													</tr>
												)
											)
										)}
								</>
							</tbody>
						</table>
					</div>
					<div className="cart-prod-list d-block d-sm-none">
						<>
							<div className="col-md-12">
								<ol className="breadcrumb">
									<li className="breadcrumb-item">
										{orderData.selectedBrand.brand_desc}
									</li>
									<li className="breadcrumb-item">
										{orderData.selectedProductLine.product_line_desc}
									</li>
									<li className="breadcrumb-item active">
										{orderData.selectedFlavour.flavour_desc}
									</li>
								</ol>
							</div>

							{orderData.ord.map((item, index) => (
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
										<span className="cart-prod-lbl">Physical Inventory: </span>
										<span className="cart-prod-val">
											{item.physical_inventory_qty}
										</span>

										<div className="cart-prod-desc" style={{ float: "right" }}>
											<span className="cart-prod-lbl">Allocate Qty: </span>
											<span className="cart-prod-val">
												{item.erp_commited_qty}
											</span>
										</div>
									</div>

									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">UOM: </span>
										<span className="cart-prod-val">{item.uom}</span>

										<div className="cart-prod-desc" style={{ float: "right" }}>
											<span className="cart-prod-lbl">Price: </span>
											<span className="cart-prod-val">{item.portal_mrp}</span>
										</div>
									</div>

									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">
											{item && item.scheme ? item.scheme : " "}
										</span>

										<div className="cart-prod-desc" style={{ float: "right" }}>
											<input
												disabled={item.portal_mrp == 0 ? true : false}
												style={{ textAlign: "right" }}
												min={1}
												max={10}
												// ref={inputRef1}
												type="number"
												className="qty-ctl"
												step="1"
												// defaultValue={item.sit_inventory_qty}
												placeholder={item.sit_inventory_qty}
												onChange={(e) => handleQty(e, item.portal_item_code)}
											/>
										</div>
									</div>
								</div>
							))}
						</>
					</div>
				</div>
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
									disabled={disableAddToCart || orderData.ord.length === 0}>
									<i className="fas fa-cart-shopping mr-2"></i> Add to Cart
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
		</>
	);
};

export default FilteredData;
