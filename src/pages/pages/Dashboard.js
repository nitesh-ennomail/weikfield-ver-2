import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
	selectedProduct,
	setProducts,
} from "../../redux/actions/productActions";
import $ from "jquery";

const Dashboard = () => {
	const navigate = useNavigate();
	const products = useSelector((state) => state.allProducts.products);
	const userProfile = useSelector((state) => state.userProfile);

	const [data, setData] = useState([]);
	const productDetails = useSelector(
		(state) => state.allProducts.selectedProduct
	);

	const dispatch = useDispatch();

	const fetchProduct = async () => {
		const response = await axios
			.get("https://fakestoreapi.com/products")
			// .get("https://fakestoreapi.com/products?limit=10")
			.catch((err) => {
				console.log(err);
			});
		console.log("response", response);
		dispatch(setProducts(response.data));
		setData(response.data);
	};

	useEffect(() => {
		if (userProfile.userData !== "null") {
			fetchProduct();
		} else {
			navigate("/");
		}
	}, []);

	const getProductDetails = async (item) => {
		const response = await axios
			.get(`https://fakestoreapi.com/products/${item.id}`)
			.catch((err) => {
				console.log(err);
			});
		// console.log("response details", response.data);
		dispatch(selectedProduct(response.data));
	};

	return (
		<>
			<Helmet title="Dashboard" />

			{/* <div className="container">
				<div className="row">
					{products &&
						products.map((item, index) => (
							<div
								key={index}
								onClick={() => getProductDetails(item)}
								className="col-6"
								style={{ border: "2px solid #eee", textAlign: "center" }}>
								{item.title}
								<br />
								<img src={item.image} height="120px" width="100px" />
								<h2>
									<a
										href="#vieworderpop"
										data-toggle="modal"
										data-tooltip="tooltip"
										title="View Order">
										2022200001
									</a>
									{item.price}
								</h2>
							</div>
						))}
				</div>
			</div> */}

			<div className="content-wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">Dashboard</li>
							</ol>
							<div className="alert alert-success" role="alert">
								<button
									type="button"
									className="close btn"
									data-dismiss="alert"
									aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="alert-heading">Alert message heading!</h4>
								<p className="mb-0">
									Alert message description text will come here
								</p>
							</div>
							<div className="row mb-4 dashboard-blocks">
								<div className="col-md-4">
									<div className="card bg-info pull-up rounded-0">
										<div className="card-content">
											<div className="card-header">Total Claims [INR]</div>
											<div className="card-body pt-0 pb-2">
												<div className="row">
													<div className="col-8">
														<p className="huText2">97,185</p>
													</div>
													<div className="col-4 text-right">
														<p className="DashIcon">
															<i className="fa-solid fa-tags"></i>
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-4">
									<div className="card bg-primary pull-up rounded-0">
										<div className="card-content">
											<div className="card-header">Sales MTD [INR]</div>
											<div className="card-body pt-0 pb-2">
												<div className="row">
													<div className="col-8">
														<p className="huText2">9,00,383</p>
													</div>
													<div className="col-4 text-right">
														<p className="DashIcon">
															<i className="fa-solid fa-tags"></i>
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-4">
									<div className="card bg-malive pull-up rounded-0">
										<div className="card-content">
											<div className="card-header">Sales YTD [INR]</div>
											<div className="card-body pt-0 pb-2">
												<div className="row">
													<div className="col-8">
														<p className="huText2">22,51,015</p>
													</div>
													<div className="col-4 text-right">
														<p className="DashIcon">
															<i className="fa-solid fa-tags"></i>
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card border-0 rounded-0 mb-3">
								<div className="card-body">
									{products.length > 0 && (
										<div className="table-responsive">
											<table
												className="table table-bordered"
												id="dataTable"
												width="100%"
												cellSpacing="0">
												<thead>
													<tr>
														<th>Order No</th>
														<th>Order Date</th>
														<th>Distributor Name</th>
														<th>Order Qty</th>
														<th>Order Amount</th>
														<th>Invoice Qty</th>
														<th>Invoice Amount</th>
														<th style={{ minWidth: "120px" }}>Status</th>
														<th>ERP Ref No.</th>
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th>Order No</th>
														<th>Order Date</th>
														<th>Distributor Name</th>
														<th>Order Qty</th>
														<th>Order Amount</th>
														<th>Invoice Qty</th>
														<th>Invoice Amount</th>
														<th>Status</th>
														<th>ERP Ref No.</th>
													</tr>
												</tfoot>
												<tbody>
													{products.map((item, i) => (
														<tr key={i}>
															<td onClick={() => getProductDetails(item)}>
																<a
																	href="#vieworderpop"
																	data-toggle="modal"
																	data-tooltip="tooltip"
																	title="View Order">
																	{`FG-${item.id}`}
																</a>
															</td>
															<td>08/02/2022</td>
															<td>Gautam Foods</td>
															<td>11</td>
															<td>25257.25</td>
															<td>5</td>
															<td>25257.25</td>
															<td>Waiting for approval</td>
															<td>11021</td>
														</tr>
													))}
												</tbody>
												{/* <tbody>
													{products.map((item, index) => (
														<tr key={index}>
															<td>
																<a
																	href="#vieworderpop"
																	data-toggle="modal"
																	data-tooltip="tooltip"
																	title="View Order">
																	{item.id}
																</a>
															</td>
															<td>08/02/2022</td>
															<td>Gautam Foods</td>
															<td>11</td>
															<td>25257.25</td>
															<td>5</td>
															<td>25257.25</td>
															<td>Waiting for approval</td>
															<td>11021</td>
														</tr>
													))}
												</tbody> */}
											</table>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* {console.log("public url: ", process.env.PUBLIC_URL)} */}
			<div
				className="modal bd-example-modal-lg fade"
				id="vieworderpop"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Line Items Details
							</h5>
							<button
								className="close"
								type="button"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="row bg-info-light m-0">
								<div className="col-md-4">
									<label className="font-weight-bold my-2">Order No:</label>
									202220000214 {productDetails.id}
								</div>
								<div className="col-md-4">
									<label className="font-weight-bold my-2">Order Date:</label>
									08/02/2022
								</div>
								<div className="col-md-4">
									<label className="font-weight-bold my-2">Distributor:</label>
									Gautam Foods{productDetails.title}
								</div>
							</div>
							<div className="table-responsive">
								<table
									width="100%"
									border="0"
									cellSpacing="0"
									cellPadding="0"
									className="table tableDash table-striped no-border linkUnd table-hover"
									id="dataTables1">
									<thead>
										<tr>
											<th style={{ minWidth: "100px" }}>Parent Item Code</th>
											<th style={{ minWidth: "100px" }}>Item Code</th>
											<th style={{ minWidth: "100px" }}>Item Desc</th>
											<th>Item Price</th>
											<th>Quantity</th>
											<th>Unit</th>
											<th>Order Amount</th>
											<th>Invoice Qty</th>
											<th>Invoice Amount</th>
										</tr>
									</thead>
									<tfoot>
										<tr>
											<th>&nbsp;</th>
											<th>&nbsp;</th>
											<th>&nbsp;</th>
											<th>&nbsp;</th>
											<th>&nbsp;</th>
											<th className="text-danger font-weight-bold">Total</th>
											<th className="text-danger font-weight-bold">555.00</th>
											<th>&nbsp;</th>
											<th>&nbsp;</th>
										</tr>
									</tfoot>
									<tbody>
										<tr>
											<td>PFG-8111007</td>
											<td>FG-411228</td>
											<td>Weikfield-Pasta-Penne-Pouch-24x500gm</td>
											<td className="p-1">100.50</td>
											<td>
												<input
													type="number"
													className="qty-ctl"
													step="1"
													defaultValue="3"
												/>
											</td>
											<td>Case</td>
											<td>100.50</td>
											<td>0.00</td>
											<td>0.00</td>
										</tr>
										<tr>
											<td>PFG-8111007</td>
											<td>FG-411228</td>
											<td>Weikfield Pasta Penne Pouch 24x400gm</td>
											<td className="p-1">100.50</td>
											<td>
												<input
													type="number"
													className="qty-ctl"
													step="1"
													defaultValue="3"
												/>
											</td>
											<td>Case</td>
											<td>100.50</td>
											<td>0.00</td>
											<td>0.00</td>
										</tr>
										<tr>
											<td>PFG-8111007</td>
											<td>FG-411228</td>
											<td>Weikfield Pasta Penne Pouch 24x200gm</td>
											<td className="p-1">100.50</td>
											<td>
												<input
													type="number"
													className="qty-ctl"
													step="1"
													defaultValue="3"
												/>
											</td>
											<td>Case</td>
											<td>100.50</td>
											<td>0.00</td>
											<td>0.00</td>
										</tr>
										<tr>
											<td>PFG-8111007</td>
											<td>FG-411228</td>
											<td>Weikfield Pasta Penne Pouch 24x100gm</td>
											<td className="p-1">100.50</td>
											<td>
												<input
													type="number"
													className="qty-ctl"
													step="1"
													defaultValue="3"
												/>
											</td>
											<td>Case</td>
											<td>100.50</td>
											<td>0.00</td>
											<td>0.00</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className="modal-footer text-center">
							<button type="submit" className="btn btn-primary btn-md">
								<i className="fa-solid fa-check mr-2"></i> Accept
							</button>
							<button type="reset" className="btn btn-danger btn-md">
								<i className="fa-solid fa-xmark mr-2"></i> Reject
							</button>
							<button
								data-dismiss="modal"
								aria-label="Close"
								type="submit"
								className="btn btn-primary btn-md"
								onClick={() => navigate("/placeorder")}>
								<i className="fa-solid fa-pen mr-2" aria-hidden="true"></i> Edit
								Order
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
