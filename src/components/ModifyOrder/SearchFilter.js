import React from "react";
import { toast } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

function SearchFilter({
	showSearchFilter,
	getOrderDetails,
	distributor_details,
	salePerson,
	pack_type_details,

	disableFilter,
	disableAddToCart,
	selectedPackType,
	getProductLine,
	brand_details,
	selectedBrand,
	getFlavour,
	product_line_details,
	setSelectedFlavour,
	flavour_details,
	showFilterData,
	handlePackType,
	setDisableFilter,
	setDisableAddToCart,
	setOrderData,
	orderData,
	loading,
	cartTotalQty,
	cartTotal,
	inputRef1,
	maxLengthCheck,
	handleQty,
	selectedProductLine,
	selectedFlavour,
	addToCart,
	empty,
	addTocart,
	showOrderSummary,
	addToCartQty,
	addToCartTotal,
	removeFromCart,
	handleQtyInCart,
	saveOrder,
	disableConfirm,
	setShowOrderSummary,
	setShowSearchFilter,
	setShowPlaceOrder,
}) {
	return (
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
															// disabled={
															// 	disableFilter || !disableAddToCart
															// }
															onChange={(e) =>
																getOrderDetails(JSON.parse(e.target.value))
															}
															required>
															<option value={JSON.stringify("")}>
																Show All
															</option>
															{distributor_details &&
																distributor_details.map((data, index) => (
																	<option
																		key={index}
																		value={JSON.stringify(data)}>
																		{data.customer_name} - {data.customer_code}
																		{(data.customer_block_flag ||
																			data.mssr_flag ||
																			data.ndc_flag ||
																			data.claim_flag) === "NO"
																			? ""
																			: "*"}
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
																pack_type_details.map((packType, index) => (
																	<div
																		className="lbl-radio-btn flex-fill"
																		key={packType.pack_type_code}>
																		<input
																			disabled={
																				disableFilter || !disableAddToCart
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
																			onChange={(e) => handlePackType(e)}
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
															disabled={disableFilter || !disableAddToCart}
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
															disabled={disableFilter || !disableAddToCart}
															onChange={(e) =>
																getFlavour(JSON.parse(e.target.value))
															}
															required>
															<option value={JSON.stringify("")}>
																Show All
															</option>

															{product_line_details &&
																product_line_details.map((product, index) => (
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
															disabled={disableFilter || !disableAddToCart}
															onChange={(e) =>
																setSelectedFlavour(JSON.parse(e.target.value))
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
											<div className="col-md-12" style={{ textAlign: "right" }}>
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
																(cartTotalQty = cartTotalQty + item.item_qty),
																(cartTotal +=
																	item.portal_billing_price * item.item_qty),
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
																						item.portal_billing_price * 100
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
																				// 	item.item_qty
																				// }
																				placeholder={item.item_qty}
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
                                                                        item.item_qty} */}

																			{Math.round(
																				item.portal_billing_price *
																					item.item_qty *
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
													<span className="cart-prod-val">{item.uom}</span>

													<div
														className="cart-prod-desc"
														style={{ float: "right" }}>
														<span className="cart-prod-lbl">Price: </span>
														<span className="cart-prod-val">
															{item.portal_billing_price > 0 ? (
																Math.round(item.portal_billing_price * 100) /
																(100).toFixed(2)
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
																item.portal_billing_price == 0 ? true : false
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
															placeholder={item.item_qty}
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
												disabled={disableAddToCart || orderData.length === 0}>
												<i className="fas fa-cart-shopping mr-2"></i> Add to
												Cart
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
											Total: {Math.round(cartTotal * 100) / (100).toFixed(2)}
										</h4>
									</div>
								</div>
							</div>
						)}
					</div>
				)}

				{empty && <h1 className="text-center card-header">No Data found</h1>}
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
												(addToCartQty = addToCartQty + item.item_qty),
												(addToCartTotal +=
													item.portal_billing_price * item.item_qty),
												(
													<div className="cart-prod-div-order" key={index}>
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
															<span className="cart-prod-lbl">Quantity: </span>
															<input
																min={1}
																maxLength="3"
																onInput={maxLengthCheck}
																style={{ textAlign: "right" }}
																onChange={(e) =>
																	handleQtyInCart(e, item.portal_item_code)
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
																// defaultValue={item.item_qty}
																placeholder={item.item_qty}
															/>

															{/* <span className="cart-prod-lbl ml-2">
                                                        {item.item_qty} *{" "}
                                                        {item.portal_billing_price} =
                                                        <b>
                                                            {item.item_qty *
                                                                item.portal_billing_price}
                                                        </b>
                                                    </span> */}
															<div
																className="cart-prod-desc"
																style={{ float: "right" }}>
																<span className="cart-prod-lbl">
																	Value:{" "}
																	{Math.round(
																		(item.item_qty *
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
									Confirm Order{" "}
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
							Add More Line <i className="fa-solid fa-circle-arrow-right"></i>
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default SearchFilter;
