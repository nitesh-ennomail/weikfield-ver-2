import React, { Component, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { setDashboard } from "../../redux/actions/dashboardAction";

import DistributorService from "../../axios/services/api/distributor";
import { setDistributor } from "../../redux/actions/distributorAction";
import { ColorRing } from "react-loader-spinner";

const DistributorMaster = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const dashboard = useSelector((state) => state.dashboard.dashboard);

  const distributorGrid = useSelector(
    (state) => state.distributor.distributorGrid
  );
  const { profile_details } = dashboard;
  const [loading, setLoading] = useState(false);
	let pagenation = false

  const getDistibutor = async () => {
    //AXIOS WRAPPER FOR API CALL
    setLoading(true);
    await DistributorService.getDistributorGrid({
      userProfile,
      profile_details,
    }).then((response) => {
      dispatch(setDistributor(response.data.data.distributor_grid));
      {response.data.data.distributor_grid.length>10?pagenation=true:pagenation=false}
      setLoading(false);
    });
    //initialize datatable
	// {distributorGrid.length>10 ? pagenation=true:pagenation=false}
   await $(function () {
      $("#distributorTable").dataTable({
        ordering: true,
        info: false,
        searching: true,
        lengthChange: false,
        paging: pagenation,
      });
    });
    //AXIOS WRAPPER FOR API CALL
  };
  useEffect(() => {
    if (userProfile.usertype !== "null") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getDistibutor();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Helmet title="Distributor" />
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  {" "}
                  <Link to="/dashboard">Dashboard</Link>{" "}
                </li>
                <li className="breadcrumb-item active">Distributor Master</li>
              </ol>
              <div className="row">
                <div className="col-lg-12 mb-2">
                  <h4>List of Distributors - ({distributorGrid.length})</h4>
                </div>
              </div>
              <div className="card border-0 rounded-0 mb-3">
                <div className="card-body">
                  {loading ? 
                  <ColorRing
                  visible={true}
                  height="80"
                  width="100%"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
                  :
                  <div className="table-responsive">
                    {distributorGrid && distributorGrid.length > 0 && (
                      <table
                        className="table table-bordered"
                        id="distributorTable"
                        width="100%"
                        cellSpacing="0"
                      >
                        <thead className="MuiTableHead-root">
                          <tr>
                            <th>Dist Code</th>
                            <th>Dist Name</th>
                            <th>Mobile</th>
                            <th>Mail ID</th>
                            <th>GSTIN</th>
                            <th>Channel</th>
                            <th>Territory</th>
                            <th>Mapped SR</th>
                            <th>Approver Name</th>
                            <th>BM Name</th>
                            <th>ZSM Name</th>
                            <th>W/h Location</th>
                            <th>Block Sale Flag</th>
                            <th>MSSR Flag</th>
                            <th>NDC Flag</th>
                            <th>Claim Flag</th>
                            <th>Partner Type</th>
                            <th>Status</th>
                            <th>TCS Applicable</th>
                          </tr>
                        </thead>
                        <tbody>
                          {distributorGrid &&
                            distributorGrid.map((data, index) => (
                              <tr key={index}>
                                <td className="text-nowrap">{data.customer_code}</td>
                                <td className="text-nowrap">{data.customer_name}</td>
                                <td className="text-nowrap">{data.phone_no1}</td>
                                <td className="text-nowrap">{data.email_id}</td>
                                <td className="text-nowrap">{data.gstin}</td>
                                <td className="text-nowrap">{data.partner_channel}</td>
                                <td className="text-nowrap">{data.sap_territory}</td>
                                <td className="text-nowrap">{data.mapped_sr}</td>
                                <td className="text-nowrap">{data.approver_name}</td>
                                <td className="text-nowrap">{data.bm_name}</td>
                                <td className="text-nowrap">{data.zsm_name}</td>
                                <td className="text-nowrap">{data.wh_location_name}</td>
                                <td className="text-nowrap">{data.block_sale}</td>
                                <td className="text-nowrap">{data.mssr_flag}</td>
                                <td className="text-nowrap">{data.ndc_flag}</td>
                                <td className="text-nowrap">{data.claim_flag}</td>
                                <td className="text-nowrap">{data.partner_type}</td>
                                <td className="text-nowrap">{data.customer_status}</td>
                                <td className="text-nowrap">{data.tcs_applicable}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}
                  </div>
}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DistributorMaster;
