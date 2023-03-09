import React, { Component, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import SearchBar from "../../components/ViewOrder/SearchBar";
import ViewOrderModel from "../../components/ViewOrder/ViewOrderModel";
import ViewOrderTable from "../../components/ViewOrder/ViewOrderTable";
const ViewOrder = () => {
	const userProfile = useSelector((state) => state.userProfile);
	// const getOrderFilters = async () => {
	// 	//AXIOS WRAPPER FOR API CALL
	// 	await ViewOrderService.getViewOrderDetails(userProfile).then((response) => {
	// 		//store response data in redux store
	// 		console.log("asd");
	// 		// dispatch(setOrderFilter(response.data));
	// 	});
	// 	//AXIOS WRAPPER FOR API CALL
	// };
	useEffect(() => {
		// getOrderFilters();

		return () => {
			// second
		};
	}, []);

	return (
		<>
			<div className="content-wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									{" "}
									<a href="Dashboard.html">Dashboard</a>{" "}
								</li>
								<li className="breadcrumb-item active">View Order</li>
							</ol>
							<div className="row">
								<div className="col-lg-12 mb-2">
									<h4>List of Oders</h4>
								</div>
							</div>
							<SearchBar />
							<ViewOrderTable />
						</div>
					</div>
				</div>
			</div>
			<ViewOrderModel />
		</>
	);
};

export default ViewOrder;
