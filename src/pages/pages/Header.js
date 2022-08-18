import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-light fixed-top"
      id="mainNav"
    >
      <a className="navbar-brand" href="Library/Dashboard.html">
        <img src="assets/images/Weikfield-Logo.svg" title="Logo" height="56" />
      </a>
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
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
          <li
            className="nav-item"
            data-toggle="tooltip"
            data-placement="right"
            title="Dashboard"
          >
            {/* <a className="nav-link">
                <i className="fa fa-fw fa-dashboard"></i>
                <span className="nav-link-text">Dashboard</span>
              </a> */}
            <Link className="nav-link" to="/dashboard">
              <i className="fa fa-fw fa-dashboard"></i>
              <span className="nav-link-text"> Dashboard</span>
            </Link>
          </li>
          <li
            className="nav-item"
            data-toggle="tooltip"
            data-placement="right"
            title="Product Master"
          >
            <Link className="nav-link" to="/product">
              <i className="fa fa-fw fa-brands fa-product-hunt"></i>
              <span className="nav-link-text"> Product Master</span>
            </Link>
          </li>
          <li
            className="nav-item"
            data-toggle="tooltip"
            data-placement="right"
            title="Distributor Master"
          >
            <Link className="nav-link" to="/distribution">
              <i className="fa fa-fw fa-user-circle"></i>
              <span className="nav-link-text"> Distributor Master</span>
            </Link>
          </li>
          <li
            className="nav-item"
            data-toggle="tooltip"
            data-placement="right"
            title="Place Order"
          >
            <Link className="nav-link" to="/placeorder">
              <i className="fa fa-fw fa-cart-plus"></i>
              <span className="nav-link-text"> Place Order</span>
            </Link>
          </li>
          <li
            className="nav-item"
            data-toggle="tooltip"
            data-placement="right"
            title="View Order"
          >
            <Link className="nav-link" to="/vieworder">
              <i className="fa fa-fw fa-eye"></i>
              <span className="nav-link-text"> View Order</span>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown profile_details_drop">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
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
                  <p>Subhadeep Sen</p>
                  <span>S4140</span>
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
                <a href="/">
                  <i className="fa fa-sign-out"></i> Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
