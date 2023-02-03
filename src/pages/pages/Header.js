import { click } from "@testing-library/user-event/dist/click";
import React, { Component, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sortMenuFunction } from "./utils/sortMenu";

import { setMenu } from "../../redux/actions/menuAction";

const Header = (props) => {
	const dispatch = useDispatch();
	const ref = useRef(null);

	const dashboard = useSelector((state) => state.dashboard.dashboard);

	const { menu_details, profile_details } = dashboard;

	const toggleClass = () => {
		if (ref.current.classList.contains("show")) {
			ref.current.classList.remove("show");
		} else {
			console.log();
		}
	};

	return (
		<nav
			className="navbar navbar-expand-lg navbar-dark bg-light fixed-top"
			id="mainNav">
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
								<Link className="nav-link" to={item.menu_href}>
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
									<p>{profile_details && profile_details[0].user_name}</p>
									<span>{profile_details && profile_details[0].user_id}</span>
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
