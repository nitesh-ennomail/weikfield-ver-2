          import { useEffect, useState } from "react";
          import { useSelector } from "react-redux";
          import MssrService from "../../axios/services/api/mssr";
          import { useNavigate } from "react-router-dom";

          import {maxLengthCheck} from "../../pages/pages/utils/maxLengthInput"

          import Swal from "sweetalert2";
          const ViewOrderModel = ({ id }) => {
            const mssr = useSelector((state) => state.mssr);
            const { getViewStockDetailsLines, getStockEntryNO } = mssr;
            const navigate = useNavigate()
            const userProfile = useSelector((state) => state.userProfile);
            const [qtySaleableData, setQtySaleableData] = useState([]);
            const [returnQtyData, setReturnQtyData] = useState([]);
            const [damageQtyData, setDamageQtyData] = useState([]);
            const [inputData, setInputData] = useState([]);

            ////////
	const [saveMssrData, setSaveMssrData] = useState([]);


            const setReset = () =>{
              console.log("setSaveMssrData", saveMssrData)

              // setQtySaleableData([]);
              // setReturnQtyData([]);
              // setDamageQtyData([])
            }
         

            const handleQtyChange = (e, mssr, field) =>{
              const qtySaleable = document.getElementById(
                `saleableStockQty-${mssr.item_code}`
              );

              if(field === "qtySaleable"){
              setSaveMssrData((getViewStockDetailsLines) =>
              getViewStockDetailsLines.map((data) =>
                mssr.item_code === data.item_code
                  ? { ...data, cls_stk_qty_saleable: e.target.value }
                  : data
              )
            );
            }
            }

            //////////
            
            const handleInputChange = (e, index, field) => {
              const { value } = e.target;
              if (field === "qtySaleable") {
                setQtySaleableData((prev) => {
                  const updatedData = [...prev];
                  updatedData[index] = value ;
                  return updatedData;
                });
              } else if (field === "returnQty") {
                setReturnQtyData((prev) => {
                  const updatedData = [...prev] ;
                  updatedData[index] = value ;
                  return updatedData;
                });
              } else if (field === "damageQty") {
                setDamageQtyData(( prev) => {
                  const updatedData =[...prev];
                  updatedData[index] = value ;
                  return updatedData;
                });
              }
            };
            const handleSubmit = async () => {
              // const stock_entry_no="CS2300042";
              const stock_entry_no  = getStockEntryNO.mssr_entry_no;
              const newInputData = getViewStockDetailsLines.map((mssr, index) => ({
                itemCode: mssr.item_code,
                qtySaleable: qtySaleableData[index],
                returnQty: returnQtyData[index],
                damageQty: damageQtyData[index],
              })).filter(item => item.qtySaleable !== undefined ||
                 item.returnQty !== undefined || 
                 item.damageQty !== undefined);
            
              if (newInputData.length > 0) {
                console.log("if condition is running ==");
                // await MssrService.getUpdateStockDetails(userProfile, stock_entry_no, newInputData)
                //   .then((response) => {
                //     Swal.fire({
                //       title: `${response.data.data.message}`,
                //       text: `${response.data.data.add_message}`,
                //       showCancelButton: false,
                //       showCloseButton: false,
                //       confirmButtonColor: "#3085d6",
                //       confirmButtonText: "OK",
                //       customClass: {
                //         confirmButton: "your-custom-class",
                //       },
                //     }).then((result) => {
                //       if (result.isConfirmed) {
                //         const closeButton = document.querySelector(".close");
                //         if (closeButton) {
                //           closeButton.click();
                //         }
                //       }
                //     },
                   
                //     );
                //   });
                setInputData(newInputData);
                console.log("Array of output", newInputData);
              } else {
                Swal.fire({
                  title: "Please Fill in the Input",
                  text: "I'm sorry, but it seems like you forgot to fill in the required input.",
                   icon: "warning",
                  confirmButtonText: "OK",
                });
                console.log("error", "error in else condition");
              
              }
            };
            

            return (
              <div
                className="modal bd-example-modal-lg fade"
                id={id}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                data-backdrop="static"
              >
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        View MSSR Line Details
                      </h5>
                      <button
                        className="close"
                        type="button"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={setReset}
                      >
                        {" "}
                        <span aria-hidden="true">×</span>{" "}
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
                          id="dataTables1"
                        >
                          <thead>
                            <tr>
                              <th style={{ minWidth: "100px" }}>Item Code</th>
                              <th style={{ minWidth: "280px" }}>Item Name</th>
                              <th style={{ minWidth: "100px" }}>
                                Saleable Stock Qty{" "}
                              </th>
                              <th style={{ minWidth: "100px" }}>
                                Market Return Qty
                              </th>
                              <th>Expiry Qty</th>
                              <th>Status</th>
                            </tr>
                          </thead>

                          <tbody>
                            {getViewStockDetailsLines &&
                              getViewStockDetailsLines.map((mssr, index) => (
                                <tr key={index}>
                                  <td>{mssr.item_code}</td>
                                  <td>{mssr.item_name}</td>
                                  <td>
                                    <input
                                      // value={qtySaleableData}
                                      type="number"
                                      placeholder={mssr.cls_stk_qty_saleable}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "qtySaleable"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      // value={returnQtyData}
                                      type="number"
                                      placeholder={mssr.market_return_qty}
                                      onChange={(e) =>
                                        handleInputChange(e, index, "returnQty")
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      // value={damageQtyData}
                                      type="number"
                                      placeholder={mssr.cls_stk_qty_damage}
                                      onChange={(e) =>
                                        handleInputChange(e, index, "damageQty")
                                      }
                                    />
                                  </td>
                                  <td>{mssr.ui_status}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="cart-prod-list d-block d-sm-none">
                        {getViewStockDetailsLines &&
                          getViewStockDetailsLines.map((mssr, index) => (
                            <div className="cart-prod-div" key={index}>
                              <div className="cart-prod-desc">
                                <span className="cart-prod-lbl">
                                  Item Code :{" "}
                                </span>
                                <span className="cart-prod-val">
                                  {mssr.item_code}
                                </span>
                              </div>
                              <div className="cart-prod-desc">
                                <span className="cart-prod-lbl">
                                  Item Name :{" "}
                                </span>
                                <span className="cart-prod-val">
                                  {mssr.item_name}
                                </span>
                              </div>
                              <div className="cart-prod-desc pt-1">
                                <span className="cart-prod-lbl">
                                  Saleable Stock Qty :{" "}
                                </span>
                                <span className="cart-prod-val">
                                  <input
                                    disabled={
                                      getStockEntryNO && getStockEntryNO.status_code == 0
                                        ? false
                                        : true
                                    }
                                    id={`saleableStockQty-${mssr.item_code}`}
                                    style={{ textAlign: "right" }}
                                    min={0}
                                    maxLength="3"
                                    onInput={maxLengthCheck}
                                    type="number"
                                    className="qty-ctl"
                                    step="1"
                                    defaultValue={mssr.cls_stk_qty_saleable}
                                    onKeyPress={(event) => {
                                      if (
                                        event.charCode < 48 ||
                                        event.charCode > 58
                                      ) {
                                        event.preventDefault();
                                      }
                                    }}
                                    onChange={(e) =>
                                      handleInputChange(e, index, "qtySaleable")
                                    }
                                    // onChange ={(e)=>handleQtyChange(e,mssr,"qtySaleable")}

                                  />
                                </span>
                              </div>
                              <div className="cart-prod-desc pt-1">
                                <span
                                  className="cart-prod-lbl"
                                  style={{ width: "180px" }}
                                >
                                  Market Return Qty :{" "}
                                </span>
                                <span className="cart-prod-val">
                                  <input
                                    disabled={
                                      getStockEntryNO && getStockEntryNO.status_code == 0
                                        ? false
                                        : true
                                    }
                                    style={{ textAlign: "right" }}
                                    min={0}
                                    maxLength="3"
                                    onInput={maxLengthCheck}
                                    type="number"
                                    className="qty-ctl"
                                    step="1"
                                    placeholder={mssr.market_return_qty}
                                    onKeyPress={(event) => {
                                      if (
                                        event.charCode < 48 ||
                                        event.charCode > 58
                                      ) {
                                        event.preventDefault();
                                      }
                                    }}
                                    onChange={(e) =>
                                      handleInputChange(e, index, "returnQty")
                                    }
                                  />
                                </span>
                              </div>

                              <div className="cart-prod-desc pt-1">
                                <span className="cart-prod-lbl">
                                  Expiry Qty :{" "}
                                </span>
                                <span
                                  className="cart-prod-val"
                                  style={{ marginLeft: "47px" }}
                                ><input
                                    disabled={
                                      getStockEntryNO && getStockEntryNO.status_code == 0
                                        ? false
                                        : true
                                    }
                                    style={{ textAlign: "right" }}
                                    min={0}
                                    maxLength="3"
                                    onInput={maxLengthCheck}
                                    type="number"
                                    className="qty-ctl"
                                    step="1"
                                    placeholder={mssr.cls_stk_qty_damage}
                                    onKeyPress={(event) => {
                                      if (
                                        event.charCode < 48 ||
                                        event.charCode > 58
                                      ) {
                                        event.preventDefault();
                                      }
                                    }}
                                    onChange={(e) =>
                                      handleInputChange(e, index, "damageQty")
                                    }
                                  />
                                </span>
                              </div>

                              <div className="cart-prod-desc">
                                <span className="cart-prod-lbl">Status : </span>
                                <span className="cart-prod-val">
                                  {mssr.ui_status}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="modal-footer text-center">
                      <button
                        type="submit"
                        className="btn btn-primary  btn-md"
                        onClick={handleSubmit}
                      >
                        <i className="fa-solid fa-check mr-2"></i> Save
                      </button>
                      {/*<button type="reset" className="btn btn-danger btn-md">
                        <i className="fa-solid fa-xmark mr-2"></i> Reject
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary  btn-md"
                        onClick={() => alert("window.location='PlaceOrder.html'")}>
                        <i className="fa-solid fa-pen mr-2"></i> Edit Order
                      </button>*/}
                    </div>
                  </div>
                </div>
              </div>
            );
          };

          export default ViewOrderModel;
