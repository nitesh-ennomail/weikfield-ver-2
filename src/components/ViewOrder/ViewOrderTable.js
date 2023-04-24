import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DashboardService from "../../axios/services/api/dashboard";
import { userType } from "../../pages/pages/constants/constants";
import { setOrderLine } from "../../redux/actions/dashboardAction";
import { setSelectedOrder } from "../../redux/actions/placeOrderAction";
import $ from "jquery";
import Pagenation from "../../pages/pages/utils/Pagenation";

function ViewOrderTable({handleStatus}) {
	const userProfile = useSelector((state) => state.userProfile);
	const viewOrder = useSelector((state) => state.viewOrder);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const getOrderLines = async (order) => {
		const { order_no } = order;
		// AXIOS WRAPPER FOR API CALL
		await DashboardService.getOrderLines(userProfile, order_no).then(
			(response) => {
				dispatch(setOrderLine(response.data.data.order_line_details, order));
			}
		);
		// getViewOrderDetails()
		// AXIOS WRAPPER FOR API CAL
	};

	const getModifyOrder = async (item) => {
		dispatch(setSelectedOrder(item));
		navigate("/modifyorder");
	};
	const setStatus = async (item, id) => {
		let label = "";
		{id === 0 ? label = "Remark for Approval" : label="Remark for Rejection"}
		let order_no = item.order_no;
		const { value: remark } = await Swal.fire({
			input: "text",
			inputLabel: `${label}`,
			inputPlaceholder: "Please Enter Remark",
		});
		if (remark) {
			await DashboardService.setStatus(userProfile, order_no, id, remark).then(
				(response) => {
					Swal.fire(response.data.data.message);
					handleStatus()
					// window.location.reload(true)
				}
			);
			navigate("/vieworder");
		}
	};
// pagination 

// const [postsPerPage, setPostsPerPage] = useState(10)
// 	const showPagination = () => {
// 		const { postsPerPage, data } = this.state;
// 		const pageNumbers = [];
// 		const totalPosts = data.length;
   
// 		for(let i = 1; i<=Math.ceil(totalPosts/postsPerPage); i++){
// 		  pageNumbers.push(i)
// 		}
   
// 		const pagination = (pageNumbers) => {
// 		  this.setState({currentPage: pageNumbers})
// 		}
   
// 		return(
// 		  <nav>
// 		  <ul className="pagination">
// 		  {pageNumbers.map(number => (
// 			<li key={number} className={this.state.currentPage === number ? 'page-item active' : 'page-item' }>
// 			<button onClick={()=> pagination(number)} className="page-link"> {number} </button>
// 			</li>
// 		  ))}
// 		  </ul>
// 		  </nav>
// 		)
   
   
// 	  }

	useEffect(() => {
		//initialize datatable
		if ($.fn.dataTable.isDataTable("#viewDataTable")) {
			$("#viewDataTable").DataTable();
		} else {
			$("#viewDataTable").DataTable({
				ordering: true,
				paging: true,
				searching: true,
				lengthChange: false,
			});
		}
	}, [viewOrder]);

	return (
		<>
			{/* {viewOrder && !isEmptyObject(viewOrder.viewOrderFilter) && ( */}
			{viewOrder && viewOrder.viewOrderFilter !== null && (
				<div className="card border-0 rounded-0 mb-3">
					<div className="card-body">
						<div className="table-responsive">
							<table
								className="table table-bordered"
								id="viewDataTable"
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
												<td style={{ textAlign: "center" }}>
													{Math.round(order.order_amount_w_tax * 100) /
														(100).toFixed(2)}
												</td>

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
							{/* <Pagenation /> */}
							{/* <div style={{ float: 'right' }}>
       {showPagination()}
       </div> */}
						</div>
					</div>
				</div>
			)}

			{/* {viewOrder && viewOrder.viewOrderFilter.length === 0 && <h1>hello</h1>} */}
		</>
	);
}

export default ViewOrderTable;
