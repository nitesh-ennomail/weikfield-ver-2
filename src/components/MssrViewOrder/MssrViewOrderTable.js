import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MssrService from "../../axios/services/api/mssr";
import DashboardService from "../../axios/services/api/dashboard";
import { userType } from "../../pages/pages/constants/constants";
import { setOrderLine } from "../../redux/actions/dashboardAction";
import {
  getViewMssrDetailsLines,
  getStockEntryNo,
} from "../../redux/actions/mssrAction";
import { setSelectedOrder } from "../../redux/actions/placeOrderAction";
import $ from "jquery";
import MssrViewOrderModel from "./MssrViewOrderModel";
import {
  selectedPagesNumber,
  setViewOrderTotalPages,
} from "../../redux/actions/viewOrderAction";

import { saveAs } from "file-saver";
import axios from "axios";
import { baseURL } from "../../axios/shared/constants";

function MssrViewOrderTable({ handleStatus }) {
  const userProfile = useSelector((state) => state.userProfile);
  const dashboard = useSelector((state) => state.dashboard.dashboard);
  const { menu_details, profile_details } = dashboard;
  const mssr = useSelector((state) => state.mssr);
  const { viewMssrFilter, viewMssrTotalPages } = mssr;
  
  const [loadingItems, setLoadingItems] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const numbers = [...Array(viewMssrTotalPages + 1).keys()].slice(1);

  const getOrderLines = async (mssr) => {
    console.log("MSSR", mssr);
    const stock_entry_no = mssr.mssr_entry_no;

    // AXIOS WRAPPER FOR API CALL
    await MssrService.getViewStockDetailsLines(
      userProfile,
      stock_entry_no
    ).then((response) => {
      // dispatch(getStockEntryNo(stock_entry_no));
      dispatch(getStockEntryNo(mssr));

      dispatch(getViewMssrDetailsLines(response.data.data.stock_line_details));
    });
    // getViewOrderDetails()
    // AXIOS WRAPPER FOR API CAL
  };

  const setValidationStatus = async (item) => {
    let stock_entry_no = item.mssr_entry_no;
    let cur_status_code = item.status_code;
    const { value: remark } = await Swal.fire({
      title: "Enter Validarion Remark ",
      input: "text",
      inputPlaceholder: "Please Enter Remark",
    });
    if (remark) {
      await MssrService.setValidationStatus(
        userProfile,
        stock_entry_no,
        cur_status_code,
        remark.toUpperCase()
      ).then((response) => {
        Swal.fire(response.data.data.message);
        // handleStatus()
        // window.location.reload(true)
      });
      navigate("/dashboard");
    }
  };
  const selectedPageNumber = (pageNo) => {
    dispatch(selectedPagesNumber(pageNo));
  };

  const downloadPDF = async(mssr) => {

    setLoadingItems((prevLoadingItems) => [...prevLoadingItems, mssr]);

    const filePath = mssr.download_path;
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    const fileUrl = `${baseURL}/dashboard/downloadFile/test.pdf`;
    // const fileUrl = `${baseURL}/dashboard/downloadFile/${fileName}`;
    console.log("fileName : ", fileName)

   await fetch(fileUrl,{
      method: 'GET', 
      headers: {
      //   'Content-Type': 'application/json', // Replace with the desired content type
      //   'Authorization': `Bearer ${userProfile.token}`, // Replace with your actual authorization token
      // Add any additional headers as needed
      },
      })
      .then(response => response.blob())
      .then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // link.download = `${fileName}`;
      link.download = `test.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      })
      .catch(error => {
      console.error('Error downloading file:', error);
      });
      setLoadingItems((prevLoadingItems) =>
      prevLoadingItems.filter((loadingItem) => loadingItem !== mssr)
    );
    };

  return (
    <>
      {/* {viewOrder && !isEmptyObject(viewOrder.viewMssrFilter) && ( */}
      {viewMssrFilter && viewMssrFilter !== null && (
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
                    <th style={{ textAlign: "center" }}>MSSR Entry No</th>
                    <th style={{ textAlign: "center" }}>Customer Code</th>
                    <th style={{ textAlign: "center" }}>Customer Name</th>
                    <th style={{ textAlign: "center" }}>Pending with</th>
                    <th style={{ minWidth: "120px" }}>Status</th>
                    <th style={{ minWidth: "120px" }}>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {viewMssrFilter &&
                    viewMssrFilter.map((mssr, index) => (
                      <tr key={index}>
                        <td>
                          <a
                            onClick={() => getOrderLines(mssr)}
                            className="text-green"
                            href="#viewmssrorderpop"
                            data-toggle="modal"
                            data-tooltip="tooltip"
                            title="View Order"
                          >
                            {mssr.mssr_entry_no}
                          </a>
                        </td>
                        <td className="text-nowrap">{mssr.customer_code}</td>

                        <td style={{ textAlign: "center" }}>
                          {mssr.customer_name}
                        </td>

                        <td style={{ textAlign: "left" }}>
                          {Number(mssr.status_code) < 2 ? (
                            <>{mssr.approver_name}</>
                          ) : (
                            ""
                          )}
                        </td>

                        <td>
                          {profile_details.user_id == mssr.approver_uid &&
                          Number(mssr.status_code) < 2 ? (
                            <div>
                              <button
                                title="validate"
                                data-dismiss="modal"
                                aria-label="Close"
                                className="btn btn-dash-primary btn-sm mr-1"
                                onClick={() => setValidationStatus(mssr)}
                              >
                                <i
                                  className="fa fa-check"
                                  style={{ color: "green" }}
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          ) : (
                            <span className="text-danger text-nowrap">
                              {mssr.ui_status}
                            </span>
                          )}
                        </td>

                        <td>
                          {loadingItems.includes(mssr) ?
                            <i
                              class="fa fa-spinner fa-spin"
                              style={{ fontSize: "24px", color:"red" }}
                            ></i>
                            :
                            <i
                            onClick={() => downloadPDF(mssr)}
                            className="fa fa-download"
                            style={{ fontSize: "24px", color: "green" }}
                            aria-hidden="true"
                          ></i>
                          }
                        </td>
                      </tr>
                    ))}

                  {viewMssrFilter.length === 0 && (
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

              {/* <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={viewOrderTotalPages}
                onPageChange={page => setCurrentPage(page)}
              /> */}

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
            <MssrViewOrderModel id="viewmssrorderpop" />
          </div>
        </div>
      )}
    </>
  );
}

export default MssrViewOrderTable;
