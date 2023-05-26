import React from "react";

const ViewOrderModel=({id})=> {
	return (
		<div
			className="modal bd-example-modal-lg fade"
			id={id}
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
										<th style={{ minWidth: "280px" }}>Item Desc</th>
										<th>Item Price</th>
										<th>Quantity</th>
									</tr>
								</thead>
								
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
										
									</tr>
								</tbody>
							</table>
						</div>
                        <div className="cart-prod-list d-block d-sm-none">
							
									<div className="cart-prod-div">
										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Parent Item Code : </span>
											<span className="cart-prod-val">
												item_code
											</span>
										</div>
										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Item Code : </span>
											<span className="cart-prod-val">FS-2021</span>
										</div>
										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Item Desc : </span>
											<span className="cart-prod-val">item_desc</span>
										</div>

										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Price : </span>
											<span className="cart-prod-val">
												100
											</span>
										
										</div>

										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Order Qty : </span>
											<span className="cart-prod-val">
											1
											</span>	
										</div>
									</div>
							
						</div>
					 </div>
					{/*<div className="modal-footer text-center">
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
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default ViewOrderModel;
