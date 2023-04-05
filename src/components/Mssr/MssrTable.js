import React from "react";
import { useDispatch, useSelector } from "react-redux";

function MssrTable() {
	const dispatch = useDispatch();

	const userProfile = useSelector((state) => state.userProfile);
	const mssr = useSelector((state) => state.mssr);
	const { mssr_line_list, mssr_filter_list } = mssr;
	return (
		<div className="card border-0 rounded-0 mb-3">
			<div className="card-body">
				<div className="table-responsive d-none d-sm-block">
					<table
						className="table table-bordered sticky"
						id="dataTable1"
						width="100%"
						cellSpacing="0">
						<thead>
							<tr>
								<th>Parent Code</th>
								<th>Parent Code Desc</th>
								<th>Enter Closing stock</th>
								<th>Enter Physical</th>
								<th>Enter Expire Qty</th>
							</tr>
						</thead>
						<tbody>
							<>
								{mssr_filter_list &&
									mssr_filter_list.map((item, index) => (
										<tr key={index}>
											<td className="font12">{item.item_code}</td>

											<td className="font12">{item.item_name}</td>
											<td className="font12">
												<input
													style={{ textAlign: "right" }}
													min={0}
													maxLength="3"
													// onInput={maxLengthCheck}
													type="number"
													className="qty-ctl"
													step="1"
													// placeholder={"Enter closing stock"}
													onKeyPress={(event) => {
														if (event.charCode < 48 || event.charCode > 58) {
															event.preventDefault();
														}
													}}
													// onBlur={(e) => handleQty(e, item)}
												/>
											</td>
											<td className="font12">
												<input
													style={{ textAlign: "right" }}
													min={0}
													maxLength="3"
													// onInput={maxLengthCheck}
													type="number"
													className="qty-ctl"
													step="1"
													// placeholder={"Enter closing stock"}
													onKeyPress={(event) => {
														if (event.charCode < 48 || event.charCode > 58) {
															event.preventDefault();
														}
													}}
													// onBlur={(e) => handleQty(e, item)}
												/>
											</td>
											<td className="font12">
												<input
													style={{ textAlign: "right" }}
													min={0}
													maxLength="3"
													// onInput={maxLengthCheck}
													type="number"
													className="qty-ctl"
													step="1"
													// placeholder={"Enter closing stock"}
													onKeyPress={(event) => {
														if (event.charCode < 48 || event.charCode > 58) {
															event.preventDefault();
														}
													}}
													// onBlur={(e) => handleQty(e, item)}
												/>
											</td>
										</tr>
									))}
							</>
						</tbody>
					</table>
				</div>
				<div className="cart-prod-list d-block d-sm-none">
					<>
						{/* <div className="col-md-12">
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
							</div> */}

						{mssr_filter_list &&
							mssr_filter_list.map((item, index) => (
								<div className="cart-prod-div" key={index}>
									<div className="cart-prod-title">
										{item.item_code} - (
										{Math.round(item.dist_case_price * 100) / (100).toFixed(2)})
										{/* <span className="pl-2">
											{item.flag_color === "R" ? (
												<i className="fas fa-flag text-danger mr-2"></i>
											) : item.flag_color === "G" ? (
												<i className="fas fa-flag text-success mr-2"></i>
											) : item.flag_color === "B" ? (
												<i className="fas fa-flag text-info mr-2"></i>
											) : null}
										</span> */}
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-val">{item.item_name}</span>
									</div>
									<div className="cart-prod-desc">
										<span className="cart-prod-lbl">UOM: </span>
										<span className="cart-prod-val">case</span>

										<div className="cart-prod-desc" style={{ float: "right" }}>
											<span className="cart-prod-lbl">Price: </span>
											<span className="cart-prod-val">
												<span className="text-danger">
													{Math.round(item.dist_case_price * 100) /
														(100).toFixed(2)}
												</span>
											</span>
										</div>
									</div>

									<div className="cart-prod-desc">
										<input
											min={0}
											maxLength="3"
											type="number"
											className="qty-ctl-mssr m-1"
											step="1"
											placeholder={"Enter closing stock"}
											onKeyPress={(event) => {
												if (event.charCode < 48 || event.charCode > 58) {
													event.preventDefault();
												}
											}}
											// onBlur={(e) => handleQty(e, item)}
										/>
										<input
											min={0}
											maxLength="3"
											type="number"
											className="qty-ctl-mssr m-1"
											step="1"
											placeholder={"Enter phy qty"}
											onKeyPress={(event) => {
												if (event.charCode < 48 || event.charCode > 58) {
													event.preventDefault();
												}
											}}
											// onBlur={(e) => handleQty(e, item)}
										/>
										<input
											min={0}
											maxLength="3"
											type="number"
											className="qty-ctl-mssr m-1"
											step="1"
											placeholder={"Enter Expire qty"}
											onKeyPress={(event) => {
												if (event.charCode < 48 || event.charCode > 58) {
													event.preventDefault();
												}
											}}
											// onBlur={(e) => handleQty(e, item)}
										/>
									</div>
								</div>
							))}
					</>
				</div>
			</div>
		</div>
	);
}

export default MssrTable;
