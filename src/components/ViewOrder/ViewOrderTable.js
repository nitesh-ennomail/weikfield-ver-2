import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DashboardService from "../../axios/services/api/dashboard";
import { userType } from "../../pages/pages/constants/constants";
import { setOrderLine } from "../../redux/actions/dashboardAction";
import { setSelectedOrder } from "../../redux/actions/placeOrderAction";

function ViewOrderTable() {
	const userProfile = useSelector((state) => state.userProfile);
	const viewOrder = useSelector((state) => state.viewOrder);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const getOrderLines = async (order) => {
		const { order_no } = order;
		console.log("item ord_no", order_no);
		// AXIOS WRAPPER FOR API CALL
		await DashboardService.getOrderLines(userProfile, order_no).then(
			(response) => {
				dispatch(setOrderLine(response.data.order_line_details, order));
			}
		);
		// AXIOS WRAPPER FOR API CALL
	};

	const getModifyOrder = async (item) => {
		dispatch(setSelectedOrder(item));
		console.log("item", item);
		navigate("/modifyorder");
	};
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
					console.log("response setStatus", response);
					Swal.fire(response.status);
				}
			);
			navigate("/vieworder");
		}
	};
	return (
		<>
			{/* {viewOrder && !isEmptyObject(viewOrder.viewOrderFilter) && ( */}
			{viewOrder && viewOrder.viewOrderFilter !== null && (
				<div className="card border-0 rounded-0 mb-3">
					<div className="card-body">
						<div className="table-responsive">
							<table
								className="table table-bordered"
								id="dataTable"
								width="100%"
								cellSpacing="0">
								<thead>
									<tr>
										<th>Order No</th>
										<th>Order Date</th>

										{userProfile &&
										userProfile.usertype.toUpperCase() ===
											userType.DISTRIBUTOR ? null : (
											<th>Customer Name</th>
										)}

										{/* <th>Customer Name</th> */}
										{/* <th>Order Qty</th> */}
										<th>Order Amount</th>
										{/* <th>Invoice Qty</th> */}
										{/* <th>Invoice Amount</th> */}
										<th style={{ minWidth: "120px" }}>Status</th>
										{/* <th>ERP Ref No.</th> */}
									</tr>
								</thead>
								{/* <tfoot>
									<tr>
										<th>Order No</th>
										<th>Order Date</th>
										<th>Distributor Name</th>
										<th>Order Qty</th>
										<th>Order Amount</th>
										<th>Invoice Qty</th>
										<th>Invoice Amount</th>
										<th>Status</th>
										<th>ERP Ref No.</th>
									</tr>
								</tfoot> */}
								<tbody>
									{viewOrder &&
										viewOrder.viewOrderFilter.map((order, index) => (
											<tr key={index}>
												<td onClick={() => getOrderLines(order)}>
													<a
														className="text-green"
														href="#vieworderpop"
														data-toggle="modal"
														data-tooltip="tooltip"
														title="View Order">
														{order.order_no}
													</a>
												</td>
												<td className="text-nowrap">{order.order_date}</td>
												{userProfile &&
												userProfile.usertype.toUpperCase() ===
													userType.DISTRIBUTOR ? null : (
													<td className="text-nowrap">{order.customer_name}</td>
												)}
												{/* <td>{order.customer_name}</td> */}
												{/* <td>11</td> */}
												<td style={{ textAlign: "center" }}>
													{Math.round(order.order_amount_w_tax * 100) /
														(100).toFixed(2)}
												</td>
												{/* <td>5</td> */}
												{/* <td>25257.25</td> */}

												<td>
													{userProfile &&
													userProfile.usertype.toUpperCase() ===
														userType.APPROVER &&
													// userType.DISTRIBUTOR &&
													order.ui_status.toUpperCase() ===
														"Waiting for Approval".toUpperCase() ? (
														<div>
															<button
																onClick={() => setStatus(order, 0)}
																// type="submit"
																className="btn btn-dash-primary btn-sm mr-2">
																<i className="fa-solid fa-check"></i>
															</button>
															<button
																// type="reset"
																onClick={() => setStatus(order, 1)}
																className="btn btn-dash-danger btn-sm mr-2">
																<i className="fa-solid fa-xmark"></i>
															</button>
															<button
																data-dismiss="modal"
																aria-label="Close"
																className="btn btn-dash-primary btn-sm mr-1"
																onClick={() => getModifyOrder(order)}>
																<i
																	className="fa-solid fa-pen"
																	aria-hidden="true"></i>
															</button>
														</div>
													) : (
														<span className="text-danger text-nowrap">
															{order.ui_status}
														</span>
													)}
												</td>
												{/* <td className="text-danger text-nowrap">
													{order.ui_status}
												</td> */}
												{/* <td>11021</td> */}
											</tr>
										))}

									{viewOrder.viewOrderFilter.length === 0 && (
										<tr>
											<td></td>
											<td></td>
											<td className="text-nowrap">No data found </td>
											<td></td>
											<td></td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}

			{/* {viewOrder && viewOrder.viewOrderFilter.length === 0 && <h1>hello</h1>} */}
		</>
	);
}

export default ViewOrderTable;
