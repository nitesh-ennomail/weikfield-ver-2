import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../axios/services/api/auth";
import {
	setToken,
	setUserType,
	setUser,
} from "../../redux/actions/authActions";
import { userType } from "../pages/constants/constants";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userProfile = useSelector((state) => state.userProfile);

	const authUser = async (data) => {
		//AXIOS WRAPPER FOR API CALL
		await AuthService.addUser(data).then((response) => {
			dispatch(setToken(response.token));
			AuthService.getUserType(response.token).then((resp) => {
				console.log("usertype", resp.data[0].usertype);
				dispatch(setUserType(resp.data[0].usertype));
			});
		});
		//AXIOS WRAPPER FOR API CALL
	};

	const submitForm = (event) => {
		event.preventDefault();
		let username = event.target[0].value;
		let password = event.target[1].value;
		let userType = "ADMIN";
		authUser({ username, password });

		// dispatch(setUser({ id, password, userType }));
	};

	useLayoutEffect(() => {
		document.body.classList.add("loginBG");
		document.body.classList.remove(
			"fixed-nav",
			"sticky-footer",
			"sidenav-toggled"
		);
	}, []);

	useEffect(() => {
		console.log("constants userType", userProfile.usertype);

		if (userProfile.usertype === userType.ADMIN) {
			navigate("/dashboard");
		} else if (userProfile.usertype === userType.DISTRIBUTOR) {
			// navigate("/placeOrder");
			navigate("/dashboard");
		}
	}, [userProfile]);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-6 m-auto">
					<div className="card card-login mx-auto">
						<div className="card-body">
							<div className="text-center">
								<img
									src="assets/images/Weikfield-Logo.svg"
									className="img-fluid my-3"
									width="179"
								/>
								<h3 className=" my-4">Partner Portal</h3>
							</div>
							{/* <form action="/dashboard"> */}
							<form onSubmit={submitForm}>
								<div className="form-group">
									<label htmlFor="InputUserid">Login ID</label>
									<input
										name="uname"
										className="form-control"
										id="InputUserid"
										type="text"
										aria-describedby="InputUserid"
										placeholder="Login ID"
										required
									/>
								</div>
								<div className="form-group">
									<label htmlFor="exampleInputPassword1">Password</label>
									<input
										name="pass"
										className="form-control"
										id="exampleInputPassword1"
										type="password"
										placeholder="Password"
										required
									/>
								</div>

								<input
									type="submit"
									// onClick={submitForm}
									className="btn btn-md btn-primary btn-block"
								/>
							</form>
							<div className="text-center mt-4 mb-2">
								{/* {" "}
								<a className="d-block" href="ForgotPassword.html">
									Forgot Password?
								</a>{" "} */}

								<Link to="/forgotpassword">Forgot Password?</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
