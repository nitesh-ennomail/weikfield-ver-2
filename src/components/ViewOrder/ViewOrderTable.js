import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DashboardService from "../../axios/services/api/dashboard";
import { userType } from "../../pages/pages/constants/constants";
import { setOrderLine } from "../../redux/actions/dashboardAction";
import { setSelectedOrder } from "../../redux/actions/placeOrderAction";
import $ from "jquery";
import Pagenation from "../../pages/pages/utils/Pagenation";
import { selectedPagesNumber, setViewOrderTotalPages } from "../../redux/actions/viewOrderAction";
import Pagination from "./Pagination";
// import Pagination from "./Pagination";
function ViewOrderTable({handleStatus}) {
	const userProfile = useSelector((state) => state.userProfile);
	const viewOrder = useSelector((state) => state.viewOrder);
	const { viewOrderFilter, viewOrderTotalPages, selectedPage} = viewOrder;
	const dispatch = useDispatch();
	const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
	const numbers = [...Array(viewOrderTotalPages + 1).keys()].slice(1);

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
	useEffect(() => {
		//initialize datatable
		if ($.fn.dataTable.isDataTable("#viewDataTable")) {
			$("#viewDataTable").DataTable();
		} else {
			$("#viewDataTable").DataTable({
				ordering: true,
				paging: false,
				searching: true,
				lengthChange: false,
        info: false,
			});
		}
	}, [viewOrder]);
	const selectedPageNumber = (pageNo) =>{
		dispatch(selectedPagesNumber(pageNo));
	}
	return (
    <>
      {/* {viewOrder && !isEmptyObject(viewOrder.viewOrderFilter) && ( */}
      {viewOrderFilter && viewOrderFilter !== null && (
        <div className="card border-0 rounded-0 mb-3">
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="viewDataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>Order No</th>
                    <th>Order Date</th>

                    {userProfile &&
                    userProfile.usertype.toUpperCase() ===
                      userType.DISTRIBUTOR ? null : (
                      <th>Customer Name</th>
                    )}
                    <th>Order Amount</th>
                    <th style={{ minWidth: "120px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {viewOrderFilter &&
                    viewOrderFilter.map((order, index) => (
                      <tr key={index}>
                        <td onClick={() => getOrderLines(order)}>
                          <a
                            className="text-green"
                            href="#vieworderpop"
                            data-toggle="modal"
                            data-tooltip="tooltip"
                            title="View Order"
                          >
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
                                className="btn btn-dash-primary btn-sm mr-2"
                              >
                                <i className="fa-solid fa-check"></i>
                              </button>
                              <button
                                // type="reset"
                                onClick={() => setStatus(order, 1)}
                                className="btn btn-dash-danger btn-sm mr-2"
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                              <button
                                data-dismiss="modal"
                                aria-label="Close"
                                className="btn btn-dash-primary btn-sm mr-1"
                                onClick={() => getModifyOrder(order)}
                              >
                                <i
                                  className="fa-solid fa-pen"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          ) : (
                            <span className="text-danger text-nowrap">
                              {order.ui_status}
                            </span>
                          )}
                        </td>
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

              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={viewOrderTotalPages}
                onPageChange={page => setCurrentPage(page)}
              />

              {/* <nav >
                <ul className="pagination">
                  <li className="page-item">
                  <a className="page-link"  onClick={ selectedPage>0 ?()=>selectedPageNumber(selectedPage-1):(event) => event.preventDefault()}>
                      Previous
                    </a>
                  </li>
                  {console.log("selectedPage", selectedPage)}
                  {numbers.map((n, i) => (
                  <li className={selectedPage === i ? "page-item active" : "page-item"} key={i}>
                    <a className="page-link" onClick={() => selectedPageNumber(i)}>
                      {n}
                    </a>
                  </li>
                ))}
                  <li className="page-item">
                    <a className="page-link"  onClick={ numbers.length > selectedPage+1 ?()=>selectedPageNumber(selectedPage+1):(event) => event.preventDefault()}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewOrderTable;
