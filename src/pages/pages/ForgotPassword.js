import React from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
	return (
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-6 m-auto">
					<div class="card card-login mx-auto">
						<div class="card-body">
							<div class="text-center">
								<img
									src="assets/images/Weikfield-Logo.svg"
									class="img-fluid my-3"
									width="179"
								/>
								<h3 class=" my-4">Forgot Password?</h3>
								<p class="card-text mb-2">
									Enter your Login Id and we'll send the Password to your Mail
									Id
								</p>
							</div>
							<form action="login.html">
								<div class="form-group">
									<label for="InputUserid">Login ID</label>
									<input
										class="form-control"
										id="InputUserid"
										type="text"
										aria-describedby="InputUserid"
										placeholder="Login ID"
										required
									/>
								</div>
								<input type="submit" class="btn btn-md btn-primary btn-block" />
							</form>
							<div class="text-center mt-4 mb-2">
								<Link to="/">
									<i class="fa-solid fa-arrow-left-long"></i> Back to login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ForgotPassword;
