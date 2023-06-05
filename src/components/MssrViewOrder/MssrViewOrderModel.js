          import { useState } from "react";
          import { useSelector } from "react-redux";
          import MssrService from "../../axios/services/api/mssr";
          import { useNavigate } from "react-router-dom";

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
              const stock_entry_no = getStockEntryNO;
              
              const newInputData = getViewStockDetailsLines.map((mssr, index) => ({
                itemCode: mssr.item_code,
                qtySaleable: qtySaleableData[index],
                returnQty: returnQtyData[index],
                damageQty: damageQtyData[index],
              })).filter(item => item.qtySaleable !== undefined ||
                 item.returnQty !== undefined || 
                 item.damageQty !== undefined);
            
              if (newInputData.length > 0) {
                console.log("if condition is running ");
                await MssrService.getUpdateStockDetails(userProfile, stock_entry_no, newInputData)
                  .then((response) => {
                    Swal.fire({
                      title: `${response.data.data.message}`,
                      text: `${response.data.data.add_message}`,
                      showCancelButton: false,
                      showCloseButton: false,
                      confirmButtonColor: "#3085d6",
                      confirmButtonText: "OK",
                      customClass: {
                        confirmButton: "your-custom-class",
                      },
                    }).then((result) => {
                      if (result.isConfirmed) {
                        const closeButton = document.querySelector(".close");
                        if (closeButton) {
                          closeButton.click();
                        }
                      }
                    },
                   
                    );
                  });
                  // navigate("/vieworder") 
                setInputData(newInputData);
                // set all input field empty 
                // setQtySaleableData([])
                // setReturnQtyData([])
                // setDamageQtyData([])
            
                // Do something with the input data
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
              >
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Mssr View Order Details
                      </h5>
                      <button
                        className="close"
                        type="button"
                        data-dismiss="modal"
                        aria-label="Close"
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
                              <th style={{ minWidth: "100px" }}>Stock Qty Saleable</th>
                              <th style={{ minWidth: "100px" }}>Market Return Qty</th>
                              <th>Damage Qty</th>
                              <th>Ui Status</th>
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
                                        handleInputChange(e, index, "qtySaleable")
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
                                <span className="cart-prod-lbl">Item Code : </span>
                                <span className="cart-prod-val">{mssr.item_code}</span>
                              </div>
                              <div className="cart-prod-desc">
                                <span className="cart-prod-lbl">Item Name : </span>
                                <span className="cart-prod-val">{mssr.item_name}</span>
                              </div>
                              <div className="cart-prod-desc">
                                <span className="cart-prod-lbl">
                                  Stock Qty Saleable:{" "}
                                </span>
                                <span className="cart-prod-val">
                                  <input
                                    type="number"
                                    placeholder="Enter Qty Saleable"
                                    onChange={(e) =>
                                      handleInputChange(e, index, "qtySaleable")
                                    }
                                  />
                                </span>
                              </div>
                              <div className="cart-prod-desc">
                                <span className="cart-prod-lbl">
                                  Market Return Qty :{" "}
                                </span>
                                <span className="cart-prod-val">
                                  <input
                                    type="number"
                                    placeholder="Enter Return Qty"
                                    onChange={(e) =>
                                      handleInputChange(e, index, "returnQty")
                                    }
                                  />
                                </span>
                              </div>

                              <div className="cart-prod-desc">
                                <span className="cart-prod-lbl">Damage Qty : </span>
                                <span className="cart-prod-val">
                                  <input
                                    type="number"
                                    placeholder="Enter Damage Qty"
                                    onChange={(e) =>
                                      handleInputChange(e, index, "damageQty")
                                    }
                                  />
                                </span>
                              </div>

                              <div className="cart-prod-desc">
                                <span className="cart-prod-lbl">Ui Status : </span>
                                <span className="cart-prod-val">{mssr.ui_status}</span>
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
                        <i className="fa-solid fa-check mr-2"></i> Submit
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
