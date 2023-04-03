import React from "react";

function MssrTable() {
	return (
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
								<th>Child</th>
								<th>Item Deccription</th>
								<th>Enter Physical Closing Stock(units/prices)</th>
								<th>Market Transfor Qty</th>
								<th>Expiry Qty</th>
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
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default MssrTable;
