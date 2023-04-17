import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ViewOrderService from "../../axios/services/api/viewOrder";
import DashBoardModel from "../../components/DashBoard/DashBoardModel";
import SearchBar from "../../components/ViewOrder/SearchBar";
import ViewOrderModel from "../../components/ViewOrder/ViewOrderModel";
import ViewOrderTable from "../../components/ViewOrder/ViewOrderTable";
import { setViewOrderFilter } from "../../redux/actions/viewOrderAction";
import { Helmet } from "react-helmet";
const ViewOrder = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userProfile = useSelector((state) => state.userProfile);

	const [channel, setChannel] = useState(0);

	const getViewOrderChannelFilter = async () => {
		await ViewOrderService.getViewOrderChannelFilter(userProfile).then(
			(response) => {
				setChannel(response.data.channel_details);
			}
		);
	};

	

	useEffect(() => {
		if (userProfile.usertype !== "null") {
			getViewOrderChannelFilter();
			dispatch(setViewOrderFilter(null));
		} else {
			navigate("/");
		}
		// getOrderFilters();
	}, [userProfile]);

	return (
		<>
		<Helmet title="vieworder" />
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
							{channel && <SearchBar channel={channel} /> }
							<ViewOrderTable />
						</div>
					</div>
				</div>
			</div>
			{/* <ViewOrderModel /> */}
			<DashBoardModel id="vieworderpop" />
		</>
	);
};

export default ViewOrder;
