import React, { Component } from "react";
import { Helmet } from "react-helmet";

const DistributorMaster = () => {
	return (
		<>
			<Helmet title="Distributor" />
			<div className="content-wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									{" "}
									<a href="Dashboard.html">Dashboard</a>{" "}
								</li>
								<li className="breadcrumb-item active">Distributor Master</li>
							</ol>
							<div className="row">
								<div className="col-lg-12 mb-2">
									<h4>
										List of Distributors
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
											Search Distributors
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
																		htmlFor="DistributorName"
																		className="control-label">
																		Distributor Name:
																	</label>
																</div>
																<div className="col-md-8">
																	<input
																		type="text"
																		name="DistributorName"
																		className="form-control"
																		placeholder="Distributor Name"
																		autoFocus
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="row">
																<div className="col-md-4">
																	<label
																		htmlFor="DistributorCode"
																		className="control-label">
																		Distributor Code:
																	</label>
																</div>
																<div className="col-md-8">
																	<input
																		type="text"
																		name="DistributorCode"
																		className="form-control"
																		placeholder="Distributor Code"
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
																		htmlFor="MappedSR"
																		className="control-label">
																		Mapped SR:
																	</label>
																</div>
																<div className="col-md-8">
																	<select
																		name="MappedSR"
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
																		htmlFor="SAPTerritory"
																		className="control-label">
																		SAP Territory:
																	</label>
																</div>
																<div className="col-md-8">
																	<select
																		name="SAPTerritory"
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
																		htmlFor="Status"
																		className="control-label">
																		Status:
																	</label>
																</div>
																<div className="col-md-8">
																	<select
																		name="Status"
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
											<thead className="MuiTableHead-root">
												<tr>
													<th>Dist Code</th>
													<th style={{ minWidth: "120px" }}>Dist Name</th>
													<th>Phone</th>
													<th>Mail ID</th>
													<th>GSTIN</th>
													<th style={{ minWidth: "120px" }}>Mapped SR</th>
													<th>Approver</th>
													<th>User Master Flag</th>
													<th>Price Page Flag</th>
													<th>Status</th>
													<th>SAP Channel</th>
													<th>Location Code</th>
													<th>SAP Territory</th>
													<th>PAN</th>
													<th>Price Page Code</th>
													<th>Block Sale Flag</th>
													<th>TCS Applicable</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>C01852</td>
													<td>DHINGRA ASSOCIATES</td>
													<td>9417056060</td>
													<td>dhingra@live.in</td>
													<td></td>
													<td>Subhadeep Sen</td>
													<td></td>
													<td>F</td>
													<td>No</td>
													<td>Active</td>
													<td>MT</td>
													<td>13</td>
													<td>NORTH-I</td>
													<td>BDZPK9238F</td>
													<td>MT</td>
													<td>NO</td>
													<td>No</td>
												</tr>
												<tr>
													<td>C01852</td>
													<td>DHINGRA ASSOCIATES</td>
													<td>9417056060</td>
													<td>dhingra@live.in</td>
													<td></td>
													<td>Subhadeep Sen</td>
													<td></td>
													<td>F</td>
													<td>No</td>
													<td>Active</td>
													<td>MT</td>
													<td>13</td>
													<td>NORTH-I</td>
													<td>BDZPK9238F</td>
													<td>MT</td>
													<td>NO</td>
													<td>No</td>
												</tr>
												<tr>
													<td>C01852</td>
													<td>DHINGRA ASSOCIATES</td>
													<td>9417056060</td>
													<td>dhingra@live.in</td>
													<td></td>
													<td>Subhadeep Sen</td>
													<td></td>
													<td>F</td>
													<td>No</td>
													<td>Active</td>
													<td>MT</td>
													<td>13</td>
													<td>NORTH-I</td>
													<td>BDZPK9238F</td>
													<td>MT</td>
													<td>NO</td>
													<td>No</td>
												</tr>
												<tr>
													<td>C01852</td>
													<td>DHINGRA ASSOCIATES</td>
													<td>9417056060</td>
													<td>dhingra@live.in</td>
													<td></td>
													<td>Subhadeep Sen</td>
													<td></td>
													<td>F</td>
													<td>No</td>
													<td>Active</td>
													<td>MT</td>
													<td>13</td>
													<td>NORTH-I</td>
													<td>BDZPK9238F</td>
													<td>MT</td>
													<td>NO</td>
													<td>No</td>
												</tr>
												<tr>
													<td>C01852</td>
													<td>DHINGRA ASSOCIATES</td>
													<td>9417056060</td>
													<td>dhingra@live.in</td>
													<td></td>
													<td>Subhadeep Sen</td>
													<td></td>
													<td>F</td>
													<td>No</td>
													<td>Active</td>
													<td>MT</td>
													<td>13</td>
													<td>NORTH-I</td>
													<td>BDZPK9238F</td>
													<td>MT</td>
													<td>NO</td>
													<td>No</td>
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

export default DistributorMaster;
