import { click } from "@testing-library/user-event/dist/click";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sortMenuFunction } from "./utils/sortMenu";

import { setMenu } from "../../redux/actions/menuAction";

const Header = () => {
	const dispatch = useDispatch();

	const menus = useSelector((state) => state.menuData.menuData);
	const { menu_details, profile_details } = menus[0].data;

	useEffect(() => {
		// sortMenuFunction(menu_details);
		// console.log("ASDSADAS", sortMenuFunction(menu_details));
		// sortMenuFunction(menu_details);
		// dispatch(setMenu(menu_details));
		// console.log("profile_details", profile_details[0]);
		// {
		// 	menu_details &&
		// 		menu_details.sort((a, b) => {
		// 			return a.menu_index - b.menu_index;
		// 		});
		// }
	}, []);

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
			<div className="collapse navbar-collapse" id="navbarResponsive">
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
				<ul className="navbar-nav ml-auto">
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
									{/* <p>Subhadeep Sen</p> */}
									<p>{profile_details[0].user_name}</p>
									<span>{profile_details[0].user_id}</span>
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
