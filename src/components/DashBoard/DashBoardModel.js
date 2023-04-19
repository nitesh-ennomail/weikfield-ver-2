import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import DashboardService from "../../axios/services/api/dashboard";
import PlaceOrderService from "../../axios/services/api/placeOrder";
import { userType } from "../../pages/pages/constants/constants";
import { setOrderDetails } from "../../redux/actions/placeOrderAction";

function DashBoardModel({ id }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userProfile = useSelector((state) => state.userProfile);
	const orderLine = useSelector((state) => state.dashboard.orderLine.products);
	const orderDetail = useSelector((state) => state.dashboard.orderLine.ord);
	const setStatus = async (item, id) => {
		let order_no = item.order_no;
		const { value: remark } = await Swal.fire({
			input: "text",
			inputLabel: "Remark",
			inputPlaceholder: "Please Enter Remark",
		});
		if (remark) {
			await DashboardService.setStatus(userProfile, order_no, id, remark).then(
				(response) => {
					Swal.fire(response.status);
				}
			);
		}
	};

	const getModifyOrder = async (distributor) => {
		await PlaceOrderService.getModifyOrderDetails({
			userProfile,
		}).then((response) => {
			dispatch(setOrderDetails(response.data.order_grid_details));
			navigate("/modifyorder");
		});
	};

	return (
		<div
			className="modal bd-example-modal-lg fade"
			id={id}
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true">
			<div className="modal-dialog modal-lg" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							Line Items Details{" - "}
							<span className="text-green">
								{orderDetail && orderDetail.order_no}
							</span>
						</h5>
						<button
							className="close"
							type="button"
							data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>

					{id === "vieworderpop" && (
						<div className="row ml-0 mt-2">
							<div className="col-12 col-sm-3">
								<div className="cart-prod-hddesc">
									<span className="cart-prod-lbl">Order Date : </span>
									<span className="cart-prod-val">
										{orderDetail && orderDetail.order_date}
									</span>
								</div>
							</div>

							<div className="col-12 col-sm-3">
								<div className="cart-prod-hddesc">
									<span className="cart-prod-lbl">Order Amount : </span>
									<span className="cart-prod-val">
										{orderDetail &&
											Math.round(orderDetail.order_amount_w_tax * 100) /
												(100).toFixed(2)}
									</span>
								</div>
							</div>

							<div className="col-12 col-sm-3">
								<div className="cart-prod-hddesc">
									<span className="cart-prod-lbl">Distributor Name : </span>
									<span className="cart-prod-val">
										{orderDetail && orderDetail.customer_name}
									</span>
								</div>
							</div>

							<div className="col-12 col-sm-3">
								<div className="cart-prod-hddesc">
									<span className="cart-prod-lbl">Status : </span>
									<span className="cart-prod-val">
										{orderDetail && orderDetail.ui_status}
									</span>
								</div>
							</div>
						</div>
					)}
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
										{id === "vieworderpop" && <th>Invoice Qty</th>}
										{id === "vieworderpop" && <th>Invoice Amount</th>}
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

								<tbody>
									{orderLine &&
										orderLine.map((data, index) => (
											<tr key={index}>
												<td>{data.parent_item_code}</td>
												<td>{data.item_code}</td>
												<td style={{ minWidth: "150px" }}>{data.item_desc}</td>

												<td>{Math.round(data.item_price * 100) / 100}</td>
												<td>{Math.round(data.item_qty)}</td>
												<td>
													{Math.round(data.item_price * data.item_qty * 100) /
														100}
												</td>
												{id === "vieworderpop" && (
													<td>{Math.round(data.inv_qty)}</td>
												)}
												{id === "vieworderpop" && (
													<td>{Math.round(data.inv_amount * 100) / 100}</td>
												)}
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
											<span className="cart-prod-lbl">Order Qty : </span>
											<span className="cart-prod-val">
												{Math.round(data.item_qty)}
											</span>

											{id === "vieworderpop" && (
												<div
													className="cart-prod-desc"
													style={{ float: "right" }}>
													<span className="cart-prod-lbl">Inv Qty: </span>
													<span className="cart-prod-val">
														{Math.round(data.inv_qty)}
													</span>
												</div>
											)}
										</div>

										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Order Amount: </span>
											<span className="cart-prod-val">
												{Math.round(data.item_price * data.item_qty * 100) /
													100}
											</span>

											{id === "vieworderpop" && (
												<div
													className="cart-prod-desc"
													style={{ float: "right" }}>
													<span className="cart-prod-lbl">Inv Amt: </span>
													<span className="cart-prod-val">
														{Math.round(data.inv_amount * 100) / 100}
													</span>
												</div>
											)}
										</div>
									</div>
								))}
						</div>
					</div>

					{id === "vieworderpop" &&
						userProfile &&
						userProfile.usertype.toUpperCase() === userType.APPROVER &&
						orderDetail &&
						orderDetail.ui_status.toUpperCase() ===
							"Waiting for Approval".toUpperCase() && (
							<div className="modal-footer text-center">
								<button
									type="btn"
									className="btn btn-primary btn-md"
									onClick={() => setStatus(orderDetail, 0)}>
									<i className="fa-solid fa-check mr-2"></i> Accept
								</button>
								<button
									type="reset"
									className="btn btn-danger btn-md"
									onClick={() => setStatus(orderDetail, 1)}>
									<i className="fa-solid fa-xmark mr-2"></i> Reject
								</button>
								<button
									data-dismiss="modal"
									aria-label="Close"
									type="btn"
									className="btn btn-primary btn-md"
									// onClick={() => getModifyOrder(orderDetail)}
									// onClick={() => navigate("/placeorder")}
								>
									<i className="fa-solid fa-pen mr-2" aria-hidden="true"></i>{" "}
									Edit Order
								</button>
							</div>
						)}
				</div>
			</div>
		</div>
	);
}

export default DashBoardModel;
