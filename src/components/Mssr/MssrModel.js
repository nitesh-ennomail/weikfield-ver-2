import React, { useState } from 'react'
import Swal from 'sweetalert2';
import MssrService from "../../axios/services/api/mssr";
import { useSelector } from 'react-redux';


const MssrModel = ({id}) => {
	const [search, setSearch] = useState('');
	const [searchData, setSearchData] = useState([]);

	const [newMssr,setNewMssr]=useState([])
	const userProfile = useSelector((state) => state.userProfile);

    const handleSearch= async ()=>{
     
		// AXIOS WRAPPER FOR API CALL

		await MssrService.addNewMssr({userProfile,
			search
		}).then((response) => {
			//store response data in redux store
			setSearchData(response.data.data.search_item_details)
   		 })
		}

    const myAction =(e,item)=>{
        e.preventDefault();
        Swal.fire({
            // title: `Item Name:${item.brand}`,
            html:
            `<p style="text-align:left"><strong>Code:</strong> ${item.item_code}</p>` +
            `<p style="text-align:left"><strong>Name:</strong> ${item.item_name}</p>` +
            `<p style="text-align:left"><strong>Details:</strong><span style="font-size:12px"> ${item.item_details}</span></p>` +
            `<div class="input-row">` +
                `<input id="swal-input1" placeholder='Closing Stock' class="swal-input input-field">` +
                `<input id="swal-input2" placeholder='Market Stock' class="swal-input input-field">` +
                `<input id="swal-input3" placeholder='Expiry Qty' class="swal-input input-field">` +
              `</div>`,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-secondary'
            },
            preConfirm: () => {
                return [document.getElementById('swal-input1').value, 
                         document.getElementById('swal-input2').value, 
                        document.getElementById('swal-input3').value  ];
              }
            })
            .then((result) => {
              if (result.isConfirmed) {
                const [input1, input2, input3] = result.value;
				
				const newData={
					item_code:item.item_code,
					item_name:item.item_name,
					item_details:item.item_details,
					closingStock:input1,
					marketStock:input2,
					expiryQty:input3
				}
				setNewMssr((prev)=>[...prev,newData])

			// 		setClosingStock(input1)
			// 		setMarketStock(input2)
			// 		setExpiryQty(input3)
			// 		setItemName(item.item_name)
			// 		setItemCode(item.item_code)
			// 		setItemDetails(item.item_details)
            //   console.log(item, input1, input2, input3);
               }
          });
    }
	 console.log(newMssr)

	return (
		<div
			className="modal bd-example-modal-lg fade"
			id="mssrModelTable"
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true">
			<div className="modal-dialog modal-lg" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<p className="modal-title" id="exampleModalLabel">
							<input type="text" id="input"  placeholder="Enter your search " onChange={(e)=>setSearch(e.target.value)} />
							<span className="text-green">
								<button onClick={handleSearch}>Search</button>
							</span>
						</p>
						<button
							className="close"
							type="button"
							data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>

					<div className="modal-body">
						<div className="table-responsive d-none d-sm-block">
							<table
								width="100%"
								border="0"
								cellSpacing="0"
								cellPadding="0"
								className="table tableDash table-striped no-border linkUnd table-hover"
								id="dataTables1">
								<thead>
									<tr>
										<th style={{ minWidth: "100px" }}>Item Code</th>
										<th style={{ minWidth: "100px" }}>item Details</th>
										<th>Item Name</th>	
									</tr>
								</thead>
								<tbody>
                                {searchData &&
										searchData.map((data, index) => (

											<tr key={index}>
                                                <td><a href="" role="button" onClick={(e)=>myAction(e,data)}>{data.item_code}</a></td>
												<td>{data.item_details}</td>
												<td>{data.item_name}</td>
											</tr>

                                        ))}
									
								</tbody>
							</table>
						</div>
						<div className="cart-prod-list d-block d-sm-none">
                    
                        {searchData && searchData.map((data, index) => (
									<div className="cart-prod-div" key={index}  onClick={(e)=>myAction(e,data)}>
										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Item Code : </span>
											<span className="cart-prod-val">
                                            {data.item_code}
                                              
											</span>
										</div>
										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Item Details : </span>
											<span className="cart-prod-val">
                                            {data.item_details}
                                                </span>
										</div>
										<div className="cart-prod-desc">
											<span className="cart-prod-lbl">Item Name : </span>
											<span className="cart-prod-val">
                                            {data.item_name}
                                                </span>
										</div>

								
									</div>
								  ))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MssrModel;
