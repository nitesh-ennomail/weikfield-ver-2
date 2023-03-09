import React from "react";

function ViewOrderModel() {
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
							Line Items Details
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
						<div className="row bg-info-light m-0">
							<div className="col-md-4">
								<label className="font-weight-bold my-2">Order No:</label>
								202220000214{" "}
							</div>
							<div className="col-md-4">
								<label className="font-weight-bold my-2">Order Date:</label>
								08/02/2022{" "}
							</div>
							<div className="col-md-4">
								<label className="font-weight-bold my-2">Distributor:</label>
								Gautam Foods{" "}
							</div>
						</div>
						<div className="table-responsive">
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
										<th style={{ minWidth: "280px" }}>Item Desc</th>
										<th>Item Price</th>
										<th>Quantity</th>
										<th>Unit</th>
										<th>Order Amount</th>
										<th>Invoice Qty</th>
										<th>Invoice Amount</th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th>&nbsp;</th>
										<th>&nbsp;</th>
										<th>&nbsp;</th>
										<th>&nbsp;</th>
										<th>&nbsp;</th>
										<th className="text-danger font-weight-bold">Total</th>
										<th className="text-danger font-weight-bold">555.00</th>
										<th>&nbsp;</th>
										<th>&nbsp;</th>
									</tr>
								</tfoot>
								<tbody>
									<tr>
										<td>PFG-8111007</td>
										<td>FG-411228</td>
										<td>Weikfield-Pasta-Penne-Pouch-24x500gm</td>
										<td className="p-1">100.50</td>
										<td>
											<input
												type="number"
												className="qty-ctl"
												step="1"
												defaultValue="3"
											/>
										</td>
										<td>Case</td>
										<td>100.50</td>
										<td>0.00</td>
										<td>0.00</td>
									</tr>
									<tr>
										<td>PFG-8111007</td>
										<td>FG-411228</td>
										<td>Weikfield Pasta Penne Pouch 24x400gm</td>
										<td className="p-1">100.50</td>
										<td>
											<input
												type="number"
												className="qty-ctl"
												step="1"
												defaultValue="3"
											/>
										</td>
										<td>Case</td>
										<td>100.50</td>
										<td>0.00</td>
										<td>0.00</td>
									</tr>
									<tr>
										<td>PFG-8111007</td>
										<td>FG-411228</td>
										<td>Weikfield Pasta Penne Pouch 24x200gm</td>
										<td className="p-1">100.50</td>
										<td>
											<input
												type="number"
												className="qty-ctl"
												step="1"
												defaultValue="3"
											/>
										</td>
										<td>Case</td>
										<td>100.50</td>
										<td>0.00</td>
										<td>0.00</td>
									</tr>
									<tr>
										<td>PFG-8111007</td>
										<td>FG-411228</td>
										<td>Weikfield Pasta Penne Pouch 24x100gm</td>
										<td className="p-1">100.50</td>
										<td>
											<input
												type="number"
												className="qty-ctl"
												step="1"
												defaultValue="3"
											/>
										</td>
										<td>Case</td>
										<td>100.50</td>
										<td>0.00</td>
										<td>0.00</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="modal-footer text-center">
						<button type="submit" className="btn btn-primary  btn-md">
							<i className="fa-solid fa-check mr-2"></i> Accept
						</button>
						<button type="reset" className="btn btn-danger btn-md">
							<i className="fa-solid fa-xmark mr-2"></i> Reject
						</button>
						<button
							type="submit"
							className="btn btn-primary  btn-md"
							onClick={() => alert("window.location='PlaceOrder.html'")}>
							<i className="fa-solid fa-pen mr-2"></i> Edit Order
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ViewOrderModel;
