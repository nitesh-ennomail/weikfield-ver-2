import { isEmptyObject } from "jquery";
import React from "react";
import { useSelector } from "react-redux";
import { userType } from "../../pages/pages/constants/constants";

function ViewOrderTable() {
	const userProfile = useSelector((state) => state.userProfile);
	const viewOrder = useSelector((state) => state.viewOrder);

	return (
		<>
			{console.log(
				viewOrder.viewOrderFilter,
				isEmptyObject(viewOrder.viewOrderFilter)
			)}

			{viewOrder && !isEmptyObject(viewOrder.viewOrderFilter) && (
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
											<tr>
												<td>
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
													{order.order_amount_w_tax}
												</td>
												{/* <td>5</td> */}
												{/* <td>25257.25</td> */}
												<td className="text-danger text-nowrap">
													{order.ui_status}
												</td>
												{/* <td>11021</td> */}
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ViewOrderTable;
