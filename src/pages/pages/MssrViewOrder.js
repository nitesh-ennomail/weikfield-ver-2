import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MssrService from "../../axios/services/api/mssr";
import DashBoardModel from "../../components/DashBoard/DashBoardModel";
import MssrSearchBar from "../../components/MssrViewOrder/MssrSearchBar";
import ViewOrderTable from "../../components/ViewOrder/ViewOrderTable";
import MssrViewOrderTable from "../../components/MssrViewOrder/MssrViewOrderTable";
import { setViewMssrFilter } from "../../redux/actions/mssrAction";
import { Helmet } from "react-helmet";
const MssrViewOrder = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userProfile = useSelector((state) => state.userProfile);

	const [channel, setChannel] = useState(0);

	const getViewStockDetailsChannelFilter = async () => {
		await MssrService.getViewStockDetailsChannelFilter(userProfile).then(
			(response) => {
				setChannel(response.data.data.channel_details);
			}
		);
	};

	const handleStatus = async()=>{
		getViewStockDetailsChannelFilter()
	} 

	useEffect(() => {
		if (userProfile.usertype !== "null") {
			dispatch(setViewMssrFilter(null));
			getViewStockDetailsChannelFilter();
		} else {
			navigate("/");
		}
		// getOrderFilters();
	}, []);

	return (
		<>
		<Helmet title="View MSSR" />
			<div className="content-wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									{" "}
									<Link to="/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">View MSSR</li>
							</ol>
							<div className="row">
								<div className="col-lg-12 mb-2">
									<h4>List of MSSR Entries</h4>
								</div>
							</div>
							{channel && <MssrSearchBar channel={channel} /> }
							<MssrViewOrderTable handleStatus={getViewStockDetailsChannelFilter}/>
						</div>
					</div>
				</div>
			</div>
			{/* <DashBoardModel id="vieworderpop" /> */}
		</>
	);
};

export default MssrViewOrder;
