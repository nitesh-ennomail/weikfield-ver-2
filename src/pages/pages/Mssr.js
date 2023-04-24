import React, { useEffect, useState } from "react";
import $ from "jquery";
import Helmet from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import SearchBarMssr from "../../components/Mssr/SearchBarMssr";
import MssrTable from "../../components/Mssr/MssrTable";
import { useDispatch, useSelector } from "react-redux";
import MssrService from "../../axios/services/api/mssr";
import {
	setBrands,
	setDistributors,
	setMssrFilterList,
	setMssrList,
	setPackDetails,
} from "../../redux/actions/mssrAction";

const Mssr = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userProfile = useSelector((state) => state.userProfile);
	const getSearchFilter =  () => {
		dispatch(setMssrList(null));
		dispatch(setMssrFilterList(null));
		 MssrService.getDistributors(userProfile).then((response) => {
			dispatch(setDistributors(response.data.data.distributor_details));
		});

		 MssrService.getBrands(userProfile).then((response) => {
			dispatch(setBrands(response.data.data.brand_details));
		});

		 MssrService.getPackDetails(userProfile).then((response) => {
			dispatch(setPackDetails(response.data.data.pack_type_details));
		});
	};

	useEffect(() => {
		if (userProfile.usertype !== "null") {
			getSearchFilter();
		} else {
			navigate("/");
		}
	}, []);
	return (
		<>
			<Helmet title="MSSR" />
			<div className="content-wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
								<Link to="/dashboard">Dashboard</Link>
								</li>
								<li className="breadcrumb-item active">MSSR</li>
							</ol>
							<div className="row">
								<div className="col-lg-12 mb-2"></div>
							</div>
							<SearchBarMssr />
							<MssrTable />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Mssr;
