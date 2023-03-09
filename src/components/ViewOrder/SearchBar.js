import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewOrderService from "../../axios/services/api/viewOrder";
import { setViewOrderFilter } from "../../redux/actions/viewOrderAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function SearchBar() {
	const dispatch = useDispatch();
	// Collecting data from Redux store
	const userProfile = useSelector((state) => state.userProfile);

	const [fromData, setFromDate] = useState(new Date());
	const [startDate, setStartDate] = useState(new Date());

	const getViewOrderDetails = async () => {
		console.log("fromData", startDate);
		// await ViewOrderService.getViewOrderDetails(userProfile).then((response) => {
		// 	dispatch(setViewOrderFilter(response.data));
		// });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		getViewOrderDetails();
	};
	return (
		<div className="row mb-3">
			<div className="col-lg-12">
				<div className="card card-primary border-0">
					<div
						className="card-header collapsepanel"
						data-toggle="collapse"
						data-target="#collapseOne"
						aria-expanded="true">
						Search Orders
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
													Distributor:
												</label>
											</div>
											<div className="col-md-8">
												<select
													name="DistributorName"
													className="form-control selectpicker"
													data-live-search="true"
													required>
													<option>Show All</option>
													<option defaultValue="1">Option 01</option>
													<option defaultValue="2">Option 02</option>
													<option defaultValue="3">Option 03</option>
													<option defaultValue="4">Option 04</option>
													<option defaultValue="4">Option 05</option>
												</select>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label htmlFor="OrderNumber" className="control-label">
													Channel:
												</label>
											</div>
											<div className="col-md-8">
												<input
													type="text"
													name="OrderNumber"
													className="form-control"
													placeholder="Channel"
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
												<label htmlFor="dateFrom" className="control-label">
													From Date:
												</label>
											</div>
											<div className="col-md-8">
												<input
													onBlur={(e) => console.warn("kk", e.target.value)}
													onChange={(e) => console.warn(e)}
													// value={fromData}
													type="text"
													name="dateFrom"
													className="form-control datepicker"
													placeholder="Date From"
													autoFocus
												/>
												{/* <DatePicker
													minDate={new Date()}
													name="dateFrom"
													className="form-control datepicker"
													selected={startDate}
													onChange={(date) => setStartDate(date)}
												/> */}
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label htmlFor="dateTo" className="control-label">
													To Date:
												</label>
											</div>
											<div className="col-md-8">
												<input
													type="text"
													name="dateTo"
													className="form-control datepicker"
													placeholder="To Date"
													autoFocus
												/>

												{/* <DatePicker
                                    className="form-control datepicker"
                                    type="text"
                                    name="dateTo"
                                    placeholder="Date From"
                                    autoFocus
                                    selected={date}
                                    onChange={handleChange}
                                  /> */}
											</div>
										</div>
									</div>
								</div>
								<div className="form-group row">
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label htmlFor="OrderStatus" className="control-label">
													Order Status:
												</label>
											</div>
											<div className="col-md-8">
												<select
													name="OrderStatus"
													className="form-control"
													required>
													<option>Show All</option>
													<option defaultValue="1">Option 01</option>
													<option defaultValue="2">Option 02</option>
													<option defaultValue="3">Option 03</option>
													<option defaultValue="4">Option 04</option>
													<option defaultValue="4">Option 05</option>
												</select>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label htmlFor="username" className="control-label">
													{" "}
												</label>
											</div>
											<div className="col-md-8 text-right">
												<button
													onClick={handleSubmit}
													type="submit"
													className="btn btn-primary  btn-md">
													<i className="fa-solid fa-magnifying-glass"></i>{" "}
													Search
												</button>
												&nbsp;
												<button type="reset" className="btn btn-danger btn-md">
													<i className="fa-solid fa-rotate-right"></i> Reset
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
	);
}

export default SearchBar;
