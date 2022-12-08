import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/actions/authActions";
import { userType } from "../pages/constants/constants";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userProfile = useSelector((state) => state.userProfile);

	const submitForm = ({ id = "123", password = "123", userType = "ADMIN" }) => {
		dispatch(setUser({ id, password, userType }));
	};

	useEffect(() => {
		window.location.pathname == "/"
			? document.body.classList.add("loginBG")
			: document.body.classList.add(
					"fixed-nav",
					"sticky-footer",
					"sidenav-toggled"
			  );
		console.log("window.location.pathname", window.location.pathname);
	}, [window.location.pathname]);

	useEffect(() => {
		console.log("constants userType", userProfile.userData);

		if (userProfile && userProfile.userData.userType === userType.ADMIN) {
			navigate("/dashboard");
		} else if (
			userProfile &&
			userProfile.userData.userType === userType.DISTRIBUTOR
		) {
			navigate("/placeOrder");
		}
	}, []);

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
								{" "}
								<a className="d-block" href="ForgotPassword.html">
									Forgot Password?
								</a>{" "}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
