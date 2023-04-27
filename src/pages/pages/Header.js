import { click } from "@testing-library/user-event/dist/click";
import React, { Component, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sortMenuFunction } from "./utils/sortMenu";

import { setMenu } from "../../redux/actions/menuAction";
import Swal from "sweetalert2";
import { setAddToCart, setSelectedDistributor, setSelectedSalePerson } from "../../redux/actions/placeOrderAction";

const Header = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const ref = useRef(null);

	const dashboard = useSelector((state) => state.dashboard.dashboard);

	const addTocart = useSelector((state) => state.placeOrder.addTocart);

	const { menu_details, profile_details } = dashboard;

	const showPopUp = async() =>{
		  Swal.fire({
			title: 'OOPS! You will loose CART data,Press Exit to come out or Cancel to be in Place Order',
			showDenyButton: true,
			// showCancelButton: true,
			confirmButtonText: 'Exit',
			denyButtonText: `Cancel`,
		  }).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
			  Swal.fire('Item removed from cart', '', 'success')
			  dispatch(setAddToCart([]));
			  dispatch(setSelectedDistributor("null"));
			  dispatch(setSelectedSalePerson(""));

			} else if (result.isDenied) {
				window.history.back();
			//   navigate('/placeorder')
			}
		  })
		console.log(window.location.pathname)
	}

	const showPopUps = (path) =>{
		if(path === '/modifyorder'){
			dispatch(setAddToCart([]));
			  dispatch(setSelectedDistributor("null"));
			  dispatch(setSelectedSalePerson(""));
			return
		}else if(path !=='placeorder' && path !== '/modifyorder' && addTocart.length>0){
			showPopUp()
		}
		else{
			return
		}
	}

	const toggleClass = () => {
		if (ref.current.classList.contains("show")) {
			ref.current.classList.remove("show");
		} else {
			console.log();
		}
	};
	


	// useEffect(() => {
	// 	if (addTocart.length>0 && window.location.pathname !== '/placeorder' && window.location.pathname !== '/modifyorder') {
	// 		showPopUp()
	// 	} else {
	// 		return
	// 	}
	// },[window.location.pathname]);


	// useEffect(() => {
	// 	if(window.location.pathname === '/modifyorder'){
	// 		alert(window.location.pathname)
	// 	}else if(addTocart.length>0 && window.location.pathname !== '/placeorder'){
	// 		showPopUp()
	// 	}else{
	// 		return
	// 	}
	// },[window.location.pathname]);



	return (
		<nav
			className="navbar navbar-expand-lg navbar-dark bg-light fixed-top"
			id="mainNav">

				{console.log(addTocart)}
			<Link className="navbar-brand" to="/dashboard">
				<img src="assets/images/Weikfield-Logo.svg" title="Logo" height="56" />
			</Link>
			<button
				className="navbar-toggler navbar-toggler-right"
				type="button"
				data-toggle="collapse"
				data-target="#navbarResponsive"
				aria-controls="navbarResponsive"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<i className="fa fa-fw fa-bars"></i>
			</button>
			<div className="collapse navbar-collapse" ref={ref} id="navbarResponsive">
				<ul className="navbar-nav sidenav-toggler">
					<li className="nav-item">
						<a className="nav-link" id="sidenavToggler">
							<i className="fa fa-fw fa-bars"></i>
						</a>
					</li>
				</ul>
				<ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
					{/* {console.log("employees - menu_details", menu)} */}
					{menu_details &&
						menu_details.map((item, index) => (
							<li
								onClick={toggleClass}
								key={index}
								className={`nav-item ${
									window.location.pathname === `${item.menu_href}`
										? "active"
										: ""
								}`}
								data-toggle="tooltip"
								data-placement="right"
								title={item.menu_display_name}>
								<Link className="nav-link" to={item.menu_href} onClick={() => showPopUps(window.location.pathname)}>
									<i className={`fa fa-fw ${item.menu_icon}`}></i>
									<span className="nav-link-text">
										{" "}
										{item.menu_display_name}
									</span>
								</Link>
							</li>
						))}
				</ul>
				<ul className="navbar-nav ml-auto" onClick={toggleClass}>
					<li className="nav-item dropdown profile_details_drop">
						<a
							href="#"
							className="nav-link dropdown-toggle"
							data-toggle="dropdown"
							aria-expanded="false">
							<div className="profile_img">
								<div className="prfil-img">
									<img
										src="assets/images/sc1.jpg"
										width="40px"
										className="rounded-circle"
										alt=""
									/>
								</div>
								<div className="user-name">
									<p>{profile_details && profile_details.user_name}</p>
									<span>{profile_details && profile_details.user_id}</span>
								</div>
							</div>
						</a>
						<ul className="dropdown-menu drp-mnu">
							<li>
								<Link to="/myprofile">
									<i className="fa fa-user"></i> Manage Profile
								</Link>
							</li>
							<li>
								<Link to="/logout">
									<i className="fa fa-sign-out"></i> Logout
								</Link>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Header;
