import React from "react";

const Login = () => {
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
							<form action="/dashboard">
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
