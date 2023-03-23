import React from "react";
import { useSelector } from "react-redux";

const DashBoardTiles = () => {
	const dashboard = useSelector((state) => state.dashboard.dashboard);
	const { dashboard_tiles } = dashboard;

	return (
		<div className="row mb-4 dashboard-blocks">
			{console.log("dashboard_tiles--", dashboard_tiles)}
			{dashboard_tiles &&
				dashboard_tiles.claim_display_flag.toUpperCase() === "Y" && (
					<div className="col-md-4">
						<div className="card bg-info pull-up rounded-0">
							<div className="card-content">
								<div className="card-header">Total Claims [INR]</div>
								<div className="card-body pt-0 pb-2">
									<div className="row">
										<div className="col-8">
											<p className="huText2">
												{dashboard_tiles &&
													Math.round(dashboard_tiles.claim_tile * 100) /
														(100).toFixed(2)}
											</p>
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
				)}
			{dashboard_tiles &&
				dashboard_tiles.mtd_display_flag.toUpperCase() === "Y" && (
					<div className="col-md-4">
						<div className="card bg-primary pull-up rounded-0">
							<div className="card-content">
								<div className="card-header">Sales MTD [INR]</div>
								<div className="card-body pt-0 pb-2">
									<div className="row">
										<div className="col-8">
											<p className="huText2">
												{dashboard_tiles &&
													Math.round(dashboard_tiles.mtd_tile * 100) /
														(100).toFixed(2)}
											</p>
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
				)}

			{dashboard_tiles &&
				dashboard_tiles.ytd_display_flag.toUpperCase() === "Y" && (
					<div className="col-md-4">
						<div className="card bg-malive pull-up rounded-0">
							<div className="card-content">
								<div className="card-header">Sales YTD [INR]</div>
								<div className="card-body pt-0 pb-2">
									<div className="row">
										<div className="col-8">
											<p className="huText2">
												{dashboard_tiles &&
													Math.round(dashboard_tiles.ytd_tile * 100) /
														(100).toFixed(2)}
											</p>
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
				)}
		</div>
	);
};

export default DashBoardTiles;
