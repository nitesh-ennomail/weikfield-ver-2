import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import MssrService from "../../axios/services/api/mssr";
import { useSelector, useDispatch } from 'react-redux';

import { getUniqueByKey, getRoundOff } from "../../pages/pages/utils/findUniqueBykey";
import { setAddToCart } from '../../redux/actions/mssrAction';
import { ColorRing } from 'react-loader-spinner';


const MssrModel = ({id, data}) => {
	const dispatch = useDispatch();
	const input1ref = useRef(null);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false)
	const [searchData, setSearchData] = useState([]);

	const [newMssr,setNewMssr]=useState([])
	const userProfile = useSelector((state) => state.userProfile);
	const mssr = useSelector((state) => state.mssr);
	const { addTocart} = mssr;
    const handleSearch= async ()=>{
		// AXIOS WRAPPER FOR API CALL
		setLoading(true)
		await MssrService.addNewMssr({userProfile,
			search
		}).then((response) => {
			setSearchData(response.data.data.search_item_details)
   		 })
		 setLoading(false)
		}
		
    const myAction =(e,item)=>{
        e.preventDefault();
        Swal.fire({
            // title: `Item Name:${item.brand}`,
            html:
            // `<p style="text-align:left"><strong>${item.item_code}</strong> </p>` +
            // `<p style="text-align:left">${item.item_name}</p>` +
            `<p style="text-align:left"><span style="font-size:12px;"> ${item.item_details}</span></p>` +
            `<div class="input-row">` +
                `<input id="swal-input1" style="border:1px solid gray" placeholder='Closing Stock' class="swal-input input-field">` +
                `<input id="swal-input2" style="border:1px solid gray" placeholder='Market Stock' class="swal-input input-field">` +
                `<input id="swal-input3" style="border:1px solid gray" placeholder='Expiry Qty' class="swal-input input-field">` +
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
					physical_closing:input1,
					trasfer_qty:input2,
					expire_qty:input3,
					mssr_entry:true
				}
				
				setNewMssr((prev)=>[...prev,newData])

				let added_to_cart = [...addTocart, newData];
        // For removing duplicate key
        const key = "item_code";
        const order_grid_details_UniqueByKey = getUniqueByKey(
          added_to_cart,
          key
        );
        // store the data in redux store
        dispatch(setAddToCart(order_grid_details_UniqueByKey));
               }
          });
    }

	return (
    <div
      className="modal bd-example-modal-lg fade"
      // id="mssrModelTable"
      id={id}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title m-auto" id="exampleModalLabel">
              <input
                type="text"
                id="input"
                ref={input1ref}
                placeholder="Enter your search"
                style={{ border: "1px solid gray", height:"2.1rem"}}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="text-green">
                <button onClick={handleSearch} className='btn btn-primary mb-1 ml-2'>Search</button>
              </span>
            </p>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              onClick={() => {
                input1ref.current.value = "";
                setSearchData([]);
              }}
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          {loading ? (
            <ColorRing
              visible={true}
              height="80"
              width="100%"
              ariaLabel="blocks-loading"
              wrapperStyle={{ textAlign: "center" }}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          ) : (
            <div className="modal-body">
              <div className="table-responsive d-none d-sm-block">
                <table
                  width="100%"
                  border="0"
                  cellSpacing="0"
                  cellPadding="0"
                  className="table tableDash table-striped no-border linkUnd table-hover"
                  id="dataTables1"
                >
                  <thead>
                    <tr>
                      <th style={{ minWidth: "100px" }}>Item Code</th>
                      {/* <th style={{ minWidth: "100px" }}>item Details</th> */}
                      <th>Item Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchData &&
                      searchData.map((data, index) => (
                        <tr key={index}>
                          <td>
                            <a
                              href=""
                              role="button"
                              onClick={(e) => myAction(e, data)}
                            >
                              {data.item_code}
                            </a>
                          </td>
                          {/* <td>{data.item_details}</td> */}
                          <td>{data.item_name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="cart-prod-list d-block d-sm-none">
                {searchData &&
                  searchData.map((data, index) => (
                    <div
                      className="cart-prod-div"
                      key={index}
                      onClick={(e) => myAction(e, data)}
                    >
                      <div className="cart-prod-desc">
                        <span className="cart-prod-lbl">Item Code : </span>
                        <span className="cart-prod-val">{data.item_code}</span>
                      </div>
                      {/* <div className="cart-prod-desc">
											<span className="cart-prod-lbl">Item Details : </span>
											<span className="cart-prod-val">
                                            {data.item_details}
                                                </span>
										</div> */}
                      <div className="cart-prod-desc">
                        <span className="cart-prod-lbl">Item Name : </span>
                        <span className="cart-prod-val">{data.item_name}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MssrModel;
