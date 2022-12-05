import React from "react";
import $ from "jquery";
import Helmet from "react-helmet";

const ProductMaster = () => {
	return (
		<>
			<Helmet title="Product" />
			<div className="content-wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									<a href="Dashboard.html">Dashboard</a>{" "}
								</li>
								<li className="breadcrumb-item active">Product Master</li>
							</ol>
							<div className="row">
								<div className="col-lg-12 mb-2">
									<h4>
										List of Products
										<button
											type="button"
											className="btn btn-primary pull-right mr-1"
											id="add">
											<i className="fa fa-plus"></i> Add New
										</button>
									</h4>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-lg-12">
									<div className="card card-primary border-0">
										<div
											className="card-header collapsepanel"
											data-toggle="collapse"
											data-target="#collapseOne"
											aria-expanded="true">
											Search Products
										</div>
										<div
											className="card-body collapse show py-0"
											id="collapseOne"
											aria-expanded="true">
											<div className="column pt-3 col-sm-offset-0">
												<form
													data-toggle="validator"
													role="form"
													className="form-horizontal">
													<div className="form-group row">
														<div className="col-md-6">
															<div className="row">
																<div className="col-md-4">
																	<label
																		htmlFor="ParentCode"
																		className="control-label">
																		Parent Code:
																	</label>
																</div>
																<div className="col-md-8">
																	<input
																		type="text"
																		name="ParentCode"
																		className="form-control"
																		placeholder="Parent Code"
																		autoFocus
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="row">
																<div className="col-md-4">
																	<label
																		htmlFor="ChildItemCode"
																		className="control-label">
																		Child Item Code:
																	</label>
																</div>
																<div className="col-md-8">
																	<input
																		type="text"
																		name="ChildItemCode"
																		className="form-control"
																		placeholder="Child Item Code"
																		autoFocus
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="form-group row">
														<div className="col-md-6">
															<div className="row">
																<div className="col-md-4">
																	<label
																		htmlFor="ChildItemDesc"
																		className="control-label">
																		Child Item Desc:
																	</label>
																</div>
																<div className="col-md-8">
																	<input
																		type="text"
																		name="ChildItemDesc"
																		className="form-control"
																		placeholder="Child Item Desc"
																		autoFocus
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="row">
																<div className="col-md-4">
																	<label
																		htmlFor="ProductFamily"
																		className="control-label">
																		Product Family:
																	</label>
																</div>
																<div className="col-md-8">
																	<select
																		name="ProductFamily"
																		className="form-control"
																		data-live-search="true"
																		required>
																		<option>Show All</option>
																		<option value="1">Option 01</option>
																		<option value="2">Option 02</option>
																		<option value="3">Option 03</option>
																		<option value="4">Option 04</option>
																		<option value="4">Option 05</option>
																	</select>
																</div>
															</div>
														</div>
													</div>
													<div className="form-group row">
														<div className="col-md-6">
															<div className="row">
																<div className="col-md-4">
																	<label
																		htmlFor="ProductclassName"
																		className="control-label">
																		Product class:
																	</label>
																</div>
																<div className="col-md-8">
																	<select
																		name="ProductClass"
																		className="form-control"
																		data-live-search="true"
																		required>
																		<option>Show All</option>
																		<option value="1">Option 01</option>
																		<option value="2">Option 02</option>
																		<option value="3">Option 03</option>
																		<option value="4">Option 04</option>
																		<option value="4">Option 05</option>
																	</select>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="row">
																<div className="col-md-4">
																	<label
																		htmlFor="username"
																		className="control-label">
																		{" "}
																	</label>
																</div>
																<div className="col-md-8 text-right">
																	<button
																		type="submit"
																		className="btn btn-primary  btn-md">
																		<i className="fa-solid fa-magnifying-glass"></i>{" "}
																		Search
																	</button>
																	&nbsp;
																	<button
																		type="reset"
																		className="btn btn-danger btn-md">
																		<i className="fa-solid fa-rotate-right"></i>{" "}
																		Reset
																	</button>
																</div>
															</div>
														</div>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card border-0 rounded-0 mb-3">
								<div className="card-body">
									<div className="table-responsive">
										<table
											className="table table-bordered"
											id="dataTable"
											width="100%"
											cellSpacing="0">
											<thead>
												<tr>
													<th>Parent Code</th>
													<th>Child Item Code</th>
													<th>Child Item Desc</th>
													<th>Product Family</th>
													<th>Product Class</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>FG-8154022</td>
													<td>FG-00049</td>
													<td>PEPRICO SAUCE 5KG CARB 1X5KG</td>
													<td>Sauces, Dips &amp; Condiments</td>
													<td>Speciality Sauce</td>
												</tr>
												<tr>
													<td>FG-8114044</td>
													<td>FG-00065</td>
													<td>TOMATO KETCHUP 1KG (WITHOUT C.P) 12X1KG</td>
													<td>Sauces, Dips &amp; Condiments</td>
													<td>Tomato Ketchup</td>
												</tr>
												<tr>
													<td>FG-8316044</td>
													<td>FG-00091</td>
													<td>WHITE OATS 1KG PET JAR 12X1kg</td>
													<td>Fruit Preserve &amp; Break Fast Cereals</td>
													<td>Oats</td>
												</tr>
												<tr>
													<td>FG-8153012</td>
													<td>FG-00130</td>
													<td>BAKING PDR 1KG BAG 25X1kg</td>
													<td>Baking Mixes &amp; Ingredients</td>
													<td>Baking Ingredients</td>
												</tr>
												<tr>
													<td>FG-8153062</td>
													<td>FG-00138</td>
													<td>CORNFLOUR 1KG BAG 25X1kg</td>
													<td>Baking Mixes &amp; Ingredients</td>
													<td>Cornflour</td>
												</tr>
												<tr>
													<td>FG-8153066</td>
													<td>FG-00143</td>
													<td>CORNFLOUR 50KG BAG 1X50kg</td>
													<td>Baking Mixes &amp; Ingredients</td>
													<td>Cornflour</td>
												</tr>
												<tr>
													<td>FG-8152056</td>
													<td>FG-00174</td>
													<td>CUSTARD POWDER 1KG BAG 25X1kg</td>
													<td>Dessert Mixes &amp; RTE</td>
													<td>Desserts</td>
												</tr>
												<tr>
													<td>FG-8152060</td>
													<td>FG-00180</td>
													<td>CUSTARD POWDER 25KG BAG 1X25kg</td>
													<td>Dessert Mixes &amp; RTE</td>
													<td>Desserts</td>
												</tr>
												<tr>
													<td>FG-8152114</td>
													<td>FG-00198</td>
													<td>CARAMEL PUDDING 25KG BAG 1X25kg</td>
													<td>Dessert Mixes &amp; RTE</td>
													<td>Desserts</td>
												</tr>
												<tr>
													<td>FG-8154032</td>
													<td>FG-00432</td>
													<td>SOYA SAUCE 700GM PET BOTTLE 24X700GM</td>
													<td>Sauces, Dips &amp; Condiments</td>
													<td>Chinese Sauce</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductMaster;
