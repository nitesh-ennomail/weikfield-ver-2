import React from "react";
import { useSelector } from "react-redux";

function ViewOrderTable() {
	const userProfile = useSelector((state) => state.userProfile);
	const viewOrder = useSelector((state) => state.viewOrder);

	return (
		<>
			{viewOrder && viewOrder.viewOrderFilter != null && (
				<div className="card border-0 rounded-0 mb-3">
					{/* <h1>{viewOrder.viewOrderFilter.order_details[0].order_no}</h1> */}

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
										<th>Distributor Name</th>
										<th>Order Qty</th>
										<th>Order Amount</th>
										<th>Invoice Qty</th>
										<th>Invoice Amount</th>
										<th style={{ minWidth: "120px" }}>Status</th>
										<th>ERP Ref No.</th>
									</tr>
								</thead>
								<tfoot>
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
								</tfoot>
								<tbody>
									<tr>
										<td>
											<a
												href="#vieworderpop"
												data-toggle="modal"
												data-tooltip="tooltip"
												title="View Order">
												2022200001
											</a>
										</td>
										<td>08/02/2022</td>
										<td>Gautam Foods</td>
										<td>11</td>
										<td>25257.25</td>
										<td>5</td>
										<td>25257.25</td>
										<td>Waiting for approval</td>
										<td>11021</td>
									</tr>
									<tr>
										<td>
											<a
												href="#vieworderpop"
												data-toggle="modal"
												data-tooltip="tooltip"
												title="View Order">
												2022200002
											</a>
										</td>
										<td>09/02/2022</td>
										<td>Gautam Foods</td>
										<td>15</td>
										<td>14525.25</td>
										<td>4</td>
										<td>14525.25</td>
										<td>Waiting for approval</td>
										<td>00122</td>
									</tr>
									<tr>
										<td>
											<a
												href="#vieworderpop"
												data-toggle="modal"
												data-tooltip="tooltip"
												title="View Order">
												2022200003
											</a>
										</td>
										<td>10/02/2022</td>
										<td>Gautam Foods</td>
										<td>18</td>
										<td>36521.25</td>
										<td>1</td>
										<td>36521.25</td>
										<td>Waiting for approval</td>
										<td>00123</td>
									</tr>
									<tr>
										<td>
											<a
												href="#vieworderpop"
												data-toggle="modal"
												data-tooltip="tooltip"
												title="View Order">
												2022200004
											</a>
										</td>
										<td>11/02/2022</td>
										<td>Gautam Foods</td>
										<td>22</td>
										<td>12458.29</td>
										<td>3</td>
										<td>12458.29</td>
										<td>Waiting for approval</td>
										<td>00124</td>
									</tr>
									<tr>
										<td>
											<a
												href="#vieworderpop"
												data-toggle="modal"
												data-tooltip="tooltip"
												title="View Order">
												2022200005
											</a>
										</td>
										<td>12/02/2022</td>
										<td>Gautam Foods</td>
										<td>12</td>
										<td>15624.32</td>
										<td>6</td>
										<td>15624.32</td>
										<td>Waiting for approval</td>
										<td>00125</td>
									</tr>
									<tr>
										<td>
											<a
												href="#vieworderpop"
												data-toggle="modal"
												data-tooltip="tooltip"
												title="View Order">
												2022200006
											</a>
										</td>
										<td>13/02/2022</td>
										<td>SA Enterproses</td>
										<td>15</td>
										<td>19852.12</td>
										<td>8</td>
										<td>19852.12</td>
										<td>Approved</td>
										<td>00126</td>
									</tr>
									<tr>
										<td>
											<a
												href="#vieworderpop"
												data-toggle="modal"
												data-tooltip="tooltip"
												title="View Order">
												2022200007
											</a>
										</td>
										<td>14/02/2022</td>
										<td>SA Enterproses</td>
										<td>10</td>
										<td>11256.26</td>
										<td>2</td>
										<td>11256.26</td>
										<td>Approved</td>
										<td>00127</td>
									</tr>
									<tr>
										<td>
											<a
												href="#vieworderpop"
												data-toggle="modal"
												data-tooltip="tooltip"
												title="View Order">
												2022200008
											</a>
										</td>
										<td>15/02/2022</td>
										<td>SA Enterproses</td>
										<td>25</td>
										<td>17852.96</td>
										<td>3</td>
										<td>17852.96</td>
										<td>Approved</td>
										<td>00128</td>
									</tr>
									<tr>
										<td>
											<a
												href="#vieworderpop"
												data-toggle="modal"
												data-tooltip="tooltip"
												title="View Order">
												2022200009
											</a>
										</td>
										<td>16/02/2022</td>
										<td>SA Enterproses</td>
										<td>24</td>
										<td>21458.11</td>
										<td>5</td>
										<td>21458.11</td>
										<td>Approved</td>
										<td>00129</td>
									</tr>
									<tr>
										<td>
											<a
												href="#vieworderpop"
												data-toggle="modal"
												data-tooltip="tooltip"
												title="View Order">
												2022200010
											</a>
										</td>
										<td>17/02/2022</td>
										<td>SA Enterproses</td>
										<td>13</td>
										<td>25412.36</td>
										<td>7</td>
										<td>25412.36</td>
										<td>Approved</td>
										<td>00130</td>
									</tr>
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
