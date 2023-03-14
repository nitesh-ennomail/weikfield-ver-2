import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function DashBoardModel() {
	const orderLine = useSelector((state) => state.dashboard.orderLine.products);
	const orderNo = useSelector((state) => state.dashboard.orderLine.ord);
	return (
		<div
			className="modal bd-example-modal-lg fade"
			id="vieworderpop"
			tabIndex="-1"
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true">
			<div className="modal-dialog modal-lg" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							Line Items Details{" - "}
							<span className="text-green">{orderNo && orderNo}</span>
						</h5>
						<button
							className="close"
							type="button"
							data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="table-responsive d-none d-sm-block">
							<table
								width="100%"
								border="0"
								cellSpacing="0"
								cellPadding="0"
								className="table tableDash table-striped no-border linkUnd table-hover"
								id="dataTables1">
								<thead>
									<tr>
										<th style={{ minWidth: "100px" }}>Parent Item Code</th>
										<th style={{ minWidth: "100px" }}>Item Code</th>
										<th>Item Desc</th>
										<th>Item Price</th>
										<th>Quantity</th>
										<th>Order Amount</th>
									</tr>
								</thead>
								{/* <tfoot>
										<tr>
											<th>&nbsp;</th>
											<th>&nbsp;</th>
											<th>&nbsp;</th>
											<th>&nbsp;</th>
											<th>&nbsp;</th>
											<th className="text-danger font-weight-bold">Total</th>
											<th className="text-danger font-weight-bold">555.00</th>
										</tr>
									</tfoot> */}
								{console.log("orderLine", orderLine)}

								<tbody>
									{orderLine &&
										orderLine.map((data, index) => (
											<tr key={index}>
												<td>{data.parent_item_code}</td>
												<td>{data.item_code}</td>
												<td style={{ minWidth: "650px" }}>{data.item_desc}</td>

												<td className="p-1">
													{Math.round(data.item_price * 100) / 100}
												</td>
												<td>{Math.round(data.item_qty)}</td>
												<td>
													{Math.round(data.item_price * data.item_qty * 100) /
														100}
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
						<div className="cart-prod-list d-block d-sm-none">
							{orderLine &&
								orderLine.map((data, index) => (
									<div className="cart-prod-div" key={index}>
										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Parent Item Code : </span>
											<span className="cart-prod-val">
												{data.parent_item_code}
											</span>
										</div>
										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Item Code : </span>
											<span className="cart-prod-val">{data.item_code}</span>
										</div>
										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Item Desc : </span>
											<span className="cart-prod-val">{data.item_desc}</span>
										</div>

										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Price : </span>
											<span className="cart-prod-val">
												{Math.round(data.item_price * 100) / 100}
											</span>
											{/* <div
													className="cart-prod-desc"
													style={{ float: "right" }}>
													<span className="cart-prod-lbl">Allocate Qty: </span>
													<span className="cart-prod-val">cascad</span>
												</div> */}
										</div>

										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Qty : </span>
											{Math.round(data.item_qty)}
										</div>

										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Order Amount: </span>
											<span className="cart-prod-val">
												{Math.round(data.item_price * data.item_qty * 100) /
													100}
												{/* {data.item_price * data.item_qty} */}
											</span>
										</div>
									</div>
								))}
						</div>
					</div>
					{/* <div className="modal-footer text-center">
							<button type="submit" className="btn btn-primary btn-md">
								<i className="fa-solid fa-check mr-2"></i> Accept
							</button>
							<button type="reset" className="btn btn-danger btn-md">
								<i className="fa-solid fa-xmark mr-2"></i> Reject
							</button>
							<button
								data-dismiss="modal"
								aria-label="Close"
								type="submit"
								className="btn btn-primary btn-md"
								onClick={() => navigate("/placeorder")}>
								<i className="fa-solid fa-pen mr-2" aria-hidden="true"></i> Edit
								Order
							</button>
						</div> */}
				</div>
			</div>
		</div>
	);
}

export default DashBoardModel;
