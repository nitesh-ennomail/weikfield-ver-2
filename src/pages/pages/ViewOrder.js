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
				setChannel(response.data.data.channel_details);
			}
		);
	};

	const handleStatus = async()=>{
		getViewOrderChannelFilter()
	} 

	useEffect(() => {
		if (userProfile.usertype !== "null") {
			dispatch(setViewOrderFilter(null));
			getViewOrderChannelFilter();
		} else {
			navigate("/");
		}
		// getOrderFilters();
	}, []);

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
									<Link to="/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">View Order</li>
							</ol>
							<div className="row">
								<div className="col-lg-12 mb-2">
									<h4>List of Oders</h4>
								</div>
							</div>
							{channel && <SearchBar channel={channel} /> }
							<ViewOrderTable handleStatus={getViewOrderChannelFilter}/>
						</div>
					</div>
				</div>
			</div>
			<DashBoardModel id="vieworderpop" />
		</>
	);
};

export default ViewOrder;
