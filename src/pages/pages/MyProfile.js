import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyProfile = () => {

  const dashboard = useSelector((state) => state.dashboard.dashboard);
  const userProfile = useSelector((state) => state.userProfile);

	const { profile_details } = dashboard;

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                {" "}
								<Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">My Profile</li>
            </ol>
            <div className="row">
              <div className="col-md-5 m-auto">
                <div className="card card-register mx-auto mb-5">
                  <div className="card-body">
                    <form>
                      <div className="form-row mt-4 mb-4">
                        <div className="col-md-12 text-center">
                          {" "}
                          <img
                            src="assets/images/sc1.jpg"
                            width="100"
                            className="rounded-circle border-blue-thick"
                          />
                          <h4 className="mb-0 mt-3 text-primary">{profile_details && profile_details.user_name}</h4>
                          <h6>{userProfile && userProfile.usertype}</h6>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-row">
                          <div className="col-md-6">
                            <label for="username">Login Id</label>
                            <input
                              type="text"
                              readonly
                              className="form-control"
                              name="username"
                              id="username"
                              value={profile_details && profile_details.user_id}
                            />
                          </div>
                          <div className="col-md-6">
                            <label for="email">E-mail</label>
                            <input
                              type="email"
                              readonly
                              className="form-control"
                              name="email"
                              id="email"
                              value={profile_details && profile_details.email_id}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-row">
                          <div className="col-md-6">
                            <label for="mobile">Mobile</label>
                            <input
                              id="mobile"
                              readonly
                              type="text"
                              className="form-control"
                              name="phone"
                              value={profile_details && profile_details.user_phone}
                            />
                          </div>
                          <div className="col-md-6">
                            <label for="address-1">Address</label>
                            <input
                              id="address-1"
                              readonly
                              type="text"
                              className="form-control"
                              name="address"
                              value=""
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
