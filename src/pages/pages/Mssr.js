import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  setAddToCart,
  setFlavour,
  setInvoice,
  setOrderDetails,
  setOrderFilter,
  setProductLine,
  setSelectedDistributor,
  setSelectedSalePerson,
} from "../../redux/actions/mssrAction";

import $ from "jquery";
import { ColorRing } from "react-loader-spinner";
import { getUniqueByKey, getRoundOff } from "./utils/findUniqueBykey";
import Swal from "sweetalert2";
import { toast, Toaster } from "react-hot-toast";
import MSSRService from "../../axios/services/api/mssrService";
import MssrModel from "../../components/Mssr/MssrModel";
import MultiSelect from "../../components/MultiSelect";

const Mssr = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // using ref to handle refrence
  const containerRef = useRef(null);
  const inputRef1 = useRef(null);
  // Collecting data from Redux store
  const userProfile = useSelector((state) => state.userProfile);
  const dashboard = useSelector((state) => state.dashboard.dashboard);
  const { profile_details } = dashboard;

  ////////////////////////////////////////////////

  const mssr = useSelector((state) => state.mssr);
  const {
    addTocart,
    selectedDistributer,
    selectedSalePerson,
    orderDetails,
    orderFilter,
    productLine,
    flavour,
    selectedInvoice,
  } = mssr;
  const { distributor_details, brand_details, pack_type_details } = orderFilter;
  const { product_line_details } = productLine;
  const { flavour_details } = flavour;
  const { mssr_line_details, invoice_details } = orderDetails;

  // Collecting data from Redux store Ends

  // Assigning local variable
  let cartTotal = 0;
  let cartTotalQty = 0;
  let addToCartTotal = 0;
  let addToCartQty = 0;
  // Assigning local variable Ends

  // Storing or Modifing data through react state
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [distributor, setDistributor] = useState(null);
  const [salePerson, setSalePerson] = useState(profile_details.user_name);
  const [selectedBrand, setSelectedBrand] = useState({});
  const [selectedFlavour, setSelectedFlavour] = useState("");
  const [selectedProductLine, setSelectedProductLine] = useState("");
  const [selectedPackType, setSelectedPackType] = useState("");
  const [disableFilter, setDisableFilter] = useState(true);
  const [disableAddToCart, setDisableAddToCart] = useState(true);
  const [showOrderSummary, setShowOrderSummary] = useState("d-none");
  const [showSearchFilter, setShowSearchFilter] = useState("d-block");
  const [showPlaceOrder, setShowPlaceOrder] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [empty, setEmpty] = useState(false);
  const [disableConfirm, setDisableConfirm] = useState(false);
  const [showPromoModel, setShowPromoModel] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);

  const handlePackType = (e) => {
    {
      setEmpty(false);
    }
    {
      setOrderData([]);
    }
    {
      setSelectedBrand({});
    }
    {
      setSelectedFlavour("");
    }
    {
      dispatch(setFlavour("null"));
    }
    {
      dispatch(setProductLine("null"));
    }
    setSelectedPackType(JSON.parse(e.target.value));
  };

  const getOrderFilters = async () => {
    //AXIOS WRAPPER FOR API CALL
    await MSSRService.getOrderFilters(userProfile).then((response) => {
      // console.log(response.data.data)
      dispatch(setOrderFilter(response.data.data));
    });
    //AXIOS WRAPPER FOR API CALL
  };
  const getOrderDetails = async (data) => {
    if (data === "0") {
      setDistributor(null);
      // dispatch(setMssrList(null));
      // setOrderData([]);
      dispatch(setOrderDetails("null"));
      setOrderData([]);
      setSelectedPackType("");
      setSelectedBrand({});
      dispatch(setFlavour("null"));
      dispatch(setProductLine("null"));
      setDisableFilter(true);
      setShowInvoice(false);
    } else if (data.mssr_entry_allowed_flag === "N") {
      setDistributor(null);
      setOrderData([]);
      setSelectedPackType("");
      setSelectedBrand({});
      dispatch(setFlavour("null"));
      dispatch(setProductLine("null"));
      setDisableFilter(true);
      setShowInvoice(false);
      setSalePerson(profile_details.user_name);
      toast.error(
        `You are not allowed to fill mssr now - Please contact Admin`
      );
    } else if(data.cur_mth_mssr_entry_flag === "Y"){
      setDistributor(null);
      setOrderData([]);
      setSelectedPackType("");
      setSelectedBrand({});
      dispatch(setFlavour("null"));
      dispatch(setProductLine("null"));
      setDisableFilter(true);
      setShowInvoice(false);
      setSalePerson(profile_details.user_name);
      toast.error(
        `You have already fillup the MSSR for this month!`
      );
    }
    else if (data.mssr_entry_allowed_flag === "Y" && data.cur_mth_mssr_entry_flag === "N") {
      setSalePerson(profile_details.user_name);
      setDistributor(data);
      setSelectedPackType("");
      setSelectedBrand({});
      dispatch(setFlavour("null"));
      dispatch(setProductLine("null"));
      await MSSRService.getOrderDetails({ userProfile, data }).then(
        (response) => {
          dispatch(setOrderDetails(response.data.data));
          setDisableFilter(false);
        }
      );
      if (data.mssr_invoice_lov_display_flag === "1") {
        setShowInvoice(true);
      }
    }
  };

  const getProductLine = async (brand) => {
    // AXIOS WRAPPER FOR API CALL
    setSelectedBrand(brand);
    setSelectedProductLine("");
    setSelectedFlavour("");
    // Removing flavour and productline from redux store
    dispatch(setFlavour("null"));
    dispatch(setProductLine("null"));
    await MSSRService.getProductLine({ userProfile, brand }).then(
      (response) => {
        //store response data in redux store
        dispatch(setProductLine(response.data.data));
      }
    );
    // AXIOS WRAPPER FOR API CALL
  };
  useLayoutEffect(() => {
    // handle css when component loads
    document.body.classList.remove("loginBG");
    document.body.classList.add(
      "fixed-nav",
      "sticky-footer",
      "sidenav-toggled"
    );
  }, []);

  const getFlavour = async (productLine) => {
    setSelectedProductLine(productLine);
    // AXIOS WRAPPER FOR API CALL
    await MSSRService.getFlavour({
      userProfile,
      selectedBrand,
      productLine,
    }).then((response) => {
      //store response data in redux store
      dispatch(setFlavour(response.data.data));
    });
    // AXIOS WRAPPER FOR API CALL
  };

  useEffect(() => {
    if (addTocart.length === 0) {
      setShowSearchFilter("d-block");
      setShowSearchFilter(true);
      setShowOrderSummary("d-none");
      setShowPlaceOrder(false);
    }
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }, [disableFilter, addTocart, orderData]);
  const showFilterData = async (e) => {
    e.preventDefault();
    if (Object.keys(selectedPackType).length === 0) {
      return toast.error("You missed selecting Pack type");
    } else if (Object.keys(selectedBrand).length === 0) {
      return toast.error("You missed selecting Brand");
    }
    // Show filtered data based on packType, selectedBrand, selectedProductLine and selectedFlavour
    let filterData = mssr_line_details.filter(function (el) {
      if (
        selectedPackType &&
        selectedBrand &&
        selectedProductLine &&
        selectedFlavour
      ) {
        return (
          el.pack_type === selectedPackType.pack_type_desc &&
          el.brand === selectedBrand.brand_desc &&
          el.product_line === selectedProductLine.product_line_desc &&
          el.flavour === selectedFlavour.flavour_desc
        );
      } else if (selectedPackType && selectedBrand && selectedProductLine) {
        return (
          el.pack_type === selectedPackType.pack_type_desc &&
          el.brand === selectedBrand.brand_desc &&
          el.product_line === selectedProductLine.product_line_desc
        );
      } else if (selectedPackType && selectedBrand) {
        return (
          el.pack_type === selectedPackType.pack_type_desc
          && el.brand === selectedBrand.brand_desc
        );
      }
    });
    setDisableAddToCart(true);
    if (filterData.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }

    if (addTocart.length > 0) {
      filterData = filterData.filter(
        ({ item_code: id1 }) =>
          !addTocart.some(({ item_code: id2 }) => id2 === id1)
      );
    }

    setLoading(true);
    setOrderData(() => filterData);
    setDisableFilter(true);
    setLoading(false);
  };

  useEffect(() => {
    if (userProfile.usertype !== "null") {
      ///////////////////////////////
      dispatch(setInvoice([]));
      dispatch(setOrderDetails("null"));
      dispatch(setAddToCart([]));
      setSelectedPackType("");
      setSelectedBrand({});
      dispatch(setProductLine("null"));
      dispatch(setFlavour("null"));
      setOrderData([]);

      ///////////////////////////////////////
      getOrderFilters();
    } else {
      navigate("/");
    }
  }, []);

  const addToCart = () => {
    let currItemList = orderData.filter(function (el) {
      return (
        el.physical_closing >= 1 || el.expire_qty >= 1 || el.trasfer_qty >= 1
      );
    });

    // dispatch(setSelectedDistributor(distributor?distributor:selectedDistributer))
    // dispatch(setSelectedSalePerson(salePerson?salePerson:selectedSalePerson))
    // Merge previous order and current order
    let added_to_cart = [...addTocart, ...currItemList];
    // For removing duplicate key
    const key = "item_code";
    const order_grid_details_UniqueByKey = getUniqueByKey(added_to_cart, key);
    // store the data in redux store
    dispatch(setAddToCart(order_grid_details_UniqueByKey));
    setShowPlaceOrder(false);
    setOrderData([]);
    setDisableAddToCart(true);
  };

  const removeFromCart = (e, id) => {
    id.physical_closing = 0;
    id.trasfer_qty = 0;
    id.expire_qty = 0;
    if (addTocart.length === 1) {
      setShowSearchFilter("d-block");
      setShowPlaceOrder(false);
      dispatch(setSelectedDistributor("null"));
      dispatch(setSelectedSalePerson(""));
    }
    //Removing item from order summary based on selected portal_item_code
    dispatch(
      setAddToCart(
        addTocart.filter((item, i) => item.item_code !== id.item_code)
      )
    );

    if (
      id.pack_type === selectedPackType.pack_type_desc &&
      id.brand === selectedBrand.brand_desc &&
      id.product_line === selectedProductLine.product_line_desc &&
      id.flavour === selectedFlavour.flavour_desc
    ) {
      setOrderData([]);
    } else {
      console.log("id", id);
    }
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
    object.target.value =
      !!object.target.value && Math.abs(object.target.value) >= 0
        ? Math.abs(object.target.value)
        : null;
  };

  const handleQty = (e, stock, item) => {
    // Handle order grid quantity and store in react state.
    const inputFieldQty = document.getElementById(
      `quantityFieldId-${item.item_code}`
    );
    const inputFieldQty1 = document.getElementById(
      `quantityFieldId1-${item.item_code}`
    );

    if (stock === "physical_closing") {
      setOrderData((orderData) =>
        orderData.map((data) =>
          item.item_code === data.item_code
            ? { ...data, physical_closing: e.target.value }
            : data
        )
      );
    }

    if (stock === "trasfer_qty") {
      setOrderData((orderData) =>
        orderData.map((data) =>
          item.item_code === data.item_code
            ? { ...data, trasfer_qty: e.target.value }
            : data
        )
      );
    }

    if (stock === "expire_qty") {
      setOrderData((orderData) =>
        orderData.map((data) =>
          item.item_code === data.item_code
            ? { ...data, expire_qty: e.target.value }
            : data
        )
      );
    }
    setDisableAddToCart(false);
  };

  const handleQtyInCart = (e, id) => {
    // Handle Order summary quantity and store in redux store.
    dispatch(
      setAddToCart(
        addTocart.map((item) =>
          id === item.item_code
            ? { ...item, physical_closing: e.target.value }
            : item
        )
      )
    );
    // setDisableAddToCart(false);
  };

  const saveConfirmMssrOrder = async () => {
    await MSSRService.saveMssrEntry({
      userProfile,
      distributor,
      profile_details,
      selectedInvoice,
      addTocart,
    }).then((response) => {
      {
        response.data.data.error_code === "0"
          ? toast.success(
              <span>{`${response.data.data.message}--${response.data.data.pp_mssr_entry_no}`}</span>,
              { duration: 4000 },
              navigate("/dashboard")
            )
          : toast.error(<span>{`${response.data.data.message}`}</span>);
      }
    });
  };

  const confirmMssrOrder = async () => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You want to save this MSSR!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        saveConfirmMssrOrder();
      }
    });
  };

  // const confirmMssrOrder = async () =>{
  const saveOrder = async (e) => {
    e.preventDefault();

    if (
      distributor.mssr_invoice_lov_display_flag === "1" &&
      selectedInvoice.length === 0
    ) {
      await Swal.fire({
        title: "You have not selected any invoice!",
        text: "Do you want to continue without selecting invoice?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          confirmMssrOrder();
        }
      });
    } else {
      confirmMssrOrder();
    }
  };
  return (
    <>
      <Helmet title="Mssr" />
      <div className="content-wrapper" ref={containerRef}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  {" "}
                  <Link to="/dashboard">Dashboard</Link>{" "}
                </li>
                <li className="breadcrumb-item active">Create MSSR</li>
              </ol>
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-8 collapse show"
              id="collapseAll"
              aria-expanded="true"
            >
              <div className="row mb-3">
                <div className="col-lg-12">
                  <div
                    //  className="card card-primary border-0"
                    className={`card card-primary border-0 d-sm-block ${showSearchFilter}`}
                  >
                    <div
                      className="card-header collapsepanel"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                    >
                      Search Products
                    </div>
                    <div
                      className="card-body collapse show py-0"
                      id="collapseOne"
                      aria-expanded="true"
                    >
                      <div className="column pt-3 col-sm-offset-0">
                        <form
                          data-toggle="validator"
                          role="form"
                          className="form-horizontal"
                        >
                          <div className="form-group row">
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4">
                                  <label
                                    htmlFor="Distributor"
                                    className="control-label"
                                  >
                                    Distributor:
                                  </label>
                                </div>
                                <div className="col-md-8">
                                  <select
                                    name="Distributor"
                                    className="form-control"
                                    data-live-search="true"
                                    // disabled={
                                    // 	disableFilter || !disableAddToCart
                                    // }

                                    // disabled={selectedDistributer != "null"}
                                    onChange={(e) =>
                                      getOrderDetails(
                                        JSON.parse(e.target.value)
                                      )
                                    }
                                    required
                                  >
                                    <option value={JSON.stringify("0")}>
                                      {"Select Distributor"}
                                    </option>
                                    {distributor_details &&
                                      distributor_details.map((data, index) => (
                                        <option
                                          key={index}
                                          value={JSON.stringify(data)}
                                          className={data.cur_mth_mssr_entry_flag === "Y" ? "strikeout" : ""}
                                        >
                                          {data.customer_name} -{" "}
                                          {data.customer_code}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4">
                                  <label
                                    htmlFor="SalePerson"
                                    className="control-label"
                                  >
                                    Sale Person:
                                  </label>
                                </div>
                                <div className="col-md-8">
                                  <input
                                    type="text"
                                    name="SalePerson"
                                    className="form-control"
                                    defaultValue={
                                      selectedSalePerson
                                        ? selectedSalePerson
                                        : salePerson
                                    }
                                    readOnly={true}
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
                                    htmlFor="SalePerson"
                                    className="control-label"
                                  >
                                    Pack Type:
                                  </label>
                                </div>
                                <div className="col-md-8">
                                  <div className="lbl-radio-group d-flex">
                                    {pack_type_details &&
                                      pack_type_details.map(
                                        (packType, index) => (
                                          <div
                                            className="lbl-radio-btn flex-fill"
                                            key={packType.pack_type_code}
                                          >
                                            <input
                                              disabled={
                                                disableFilter ||
                                                !disableAddToCart
                                              }
                                              checked={
                                                selectedPackType &&
                                                selectedPackType.pack_type_code ===
                                                  packType.pack_type_code
                                              }
                                              type="radio"
                                              value={JSON.stringify(packType)}
                                              id={packType.pack_type_code}
                                              name="Pro-type"
                                              onChange={(e) =>
                                                handlePackType(e)
                                              }
                                            />
                                            <label
                                              onClick={() => {
                                                if (!disableAddToCart) {
                                                  toast.error(
                                                    "Please add item to cart or reset!"
                                                  );
                                                  // alert("plese order first");
                                                }
                                              }}
                                              htmlFor={packType.pack_type_code}
                                            >
                                              {packType.pack_type_desc}
                                            </label>
                                          </div>
                                        )
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4">
                                  <label
                                    htmlFor="ProductFamily"
                                    className="control-label"
                                  >
                                    Brand:
                                  </label>
                                </div>
                                <div className="col-md-8">
                                  <select
                                    name="ProductFamily"
                                    className="form-control d-none d-sm-block"
                                    data-live-search="true"
                                    disabled={
                                      disableFilter || !disableAddToCart
                                    }
                                    onChange={(e) =>
                                      getProductLine(JSON.parse(e.target.value))
                                    }
                                    required
                                  >
                                    <option value={JSON.stringify("")}>
                                      Select Brand
                                    </option>

                                    {brand_details &&
                                      brand_details.map((brand, index) => {
                                        return (
                                          <option
                                            key={brand.brand_code}
                                            value={JSON.stringify(brand)}
                                          >
                                            {brand.brand_desc}
                                          </option>
                                        );
                                      })}
                                  </select>

                                  {/* //////////////////////////// */}
                                  <div className="lbl-radio-group hrl-scrl-rdo d-block d-sm-none">
                                    {brand_details &&
                                      brand_details.map((brand, index) => (
                                        <div
                                          className="lbl-radio-btn"
                                          key={brand.brand_code}
                                        >
                                          <input
                                            disabled={
                                              disableFilter || !disableAddToCart
                                            }
                                            type="radio"
                                            value={JSON.stringify(brand)}
                                            id={brand.brand_code}
                                            name="brandRdoGrp"
                                            checked={
                                              selectedBrand &&
                                              selectedBrand.brand_code ===
                                                brand.brand_code
                                            }
                                            onChange={(e) =>
                                              getProductLine(
                                                JSON.parse(e.target.value)
                                              )
                                            }
                                          />
                                          <label htmlFor={brand.brand_code}>
                                            {brand.brand_desc}
                                          </label>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4">
                                  <label
                                    htmlFor="ProductClass"
                                    className="control-label"
                                  >
                                    Product Line:
                                  </label>
                                </div>
                                <div className="col-md-8">
                                  <select
                                    name="ProductClass"
                                    className="form-control"
                                    data-live-search="true"
                                    disabled={
                                      disableFilter || !disableAddToCart
                                    }
                                    onChange={(e) =>
                                      getFlavour(JSON.parse(e.target.value))
                                    }
                                    required
                                  >
                                    <option value={JSON.stringify("")}>
                                      Show All
                                    </option>

                                    {product_line_details &&
                                      product_line_details.map(
                                        (product, index) => (
                                          <option
                                            key={product.product_line_code}
                                            value={JSON.stringify(product)}
                                          >
                                            {product.product_line_desc}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-4">
                                  <label
                                    htmlFor="ProductClass"
                                    className="control-label"
                                  >
                                    Flavour:
                                  </label>
                                </div>
                                <div className="col-md-8">
                                  <select
                                    name="ProductClass"
                                    className="form-control"
                                    data-live-search="true"
                                    disabled={
                                      disableFilter || !disableAddToCart
                                    }
                                    onChange={(e) =>
                                      setSelectedFlavour(
                                        JSON.parse(e.target.value)
                                      )
                                    }
                                    required
                                  >
                                    <option value={JSON.stringify("")}>
                                      Show All
                                    </option>
                                    {flavour_details &&
                                      flavour_details.map((flavour, index) => (
                                        <option
                                          key={flavour.flavour_code}
                                          value={JSON.stringify(flavour)}
                                        >
                                          {flavour.flavour_desc}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="col-md-8">
                              {showInvoice && (
                                <div className="row">
                                  <div className="col-md-4">
                                    <label
                                      htmlFor="ProductclassName"
                                      className="control-label"
                                    >
                                      Check Recived Invoices This Month:
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    {showInvoice && (
                                      <MultiSelect
                                        invoice_details={invoice_details}
                                      />
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="col-md-4 mt-md-0 mt-4">
                              <div
                                className="col-md-12"
                                style={{ textAlign: "right" }}
                              >
                                <button
                                  type="button"
                                  onClick={(e) => (
                                    setDisableFilter(false),
                                    setDisableAddToCart(true),
                                    setSelectedPackType("null"),
                                    dispatch(setFlavour("null")),
                                    dispatch(setProductLine("null")),
                                    dispatch(setOrderDetails("null")),
                                    setShowInvoice(false),
                                    setSelectedBrand({}),
                                    setOrderData([])
                                  )}
                                  className="btn btn-danger btn-md"
                                >
                                  <i className="fas fa fa-gear mr-2"></i> Reset
                                </button>

                                <button
                                  onClick={(e) => (
                                    showFilterData(e), setDisableFilter(false)
                                  )}
                                  disabled={disableFilter}
                                  type="button"
                                  className="btn btn-primary btn-md ml-2"
                                  data-toggle="collapse"
                                  data-target="#collapseOne"
                                  aria-expanded="false"
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* <div className="row" style={{zIndex:999}}>
                            <div
                              className="col-md-12"
                              style={{ textAlign: "right" }}
                            >
                              <button
                                type="button"
                                onClick={(e) => (
                                  setDisableFilter(false),
                                  setDisableAddToCart(true),
                                  setSelectedPackType("null"),
                                  dispatch(setFlavour("null")),
                                  dispatch(setProductLine("null")),
                                  dispatch(setOrderDetails("null")),
                                  setShowInvoice(false),
                                  setSelectedBrand({}),
                                  setOrderData([])
                                )}
                                className="btn btn-danger btn-md"
                              >
                                <i className="fas fa fa-gear mr-2"></i> Reset
                              </button>

                              <button
                                onClick={(e) => (
                                  showFilterData(e), setDisableFilter(false)
                                )}
                                disabled={disableFilter}
                                type="button"
                                className="btn btn-primary btn-md ml-2"
                                data-toggle="collapse"
                                data-target="#collapseOne"
                                aria-expanded="false"
                              >
                                Apply
                              </button>
                            </div>
                          </div> */}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {orderData.length > 0 && (
                <div className="card border-0 rounded-0 mb-3">
                  <div className="card-body">
                    <div className="table-responsive d-none d-sm-block">
                      <table
                        className="table table-bordered"
                        id="dataTable1"
                        width="100%"
                        cellSpacing="0"
                      >
                        <thead>
                          <tr>
                            <th>Item Code</th>
                            <th>Item Description</th>
                            <th>Closing Stock</th>
                            <th>Market Return</th>
                            <th>Expiry Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <ColorRing
                              visible={true}
                              height="80"
                              width="100%"
                              ariaLabel="blocks-loading"
                              wrapperStyle={{ textAlign: "center" }}
                              wrapperClass="blocks-wrapper"
                              colors={[
                                "#e15b64",
                                "#f47e60",
                                "#f8b26a",
                                "#abbd81",
                                "#849b87",
                              ]}
                            />
                          ) : (
                            <>
                              {orderData.length > 0 ? (
                                <>
                                  {orderData.map((item, index) => (
                                    <tr key={index}>
                                      <td className="font12">
                                        {item.item_code}
                                      </td>
                                      <td className="font12">
                                        {item.item_name}
                                      </td>
                                      <td className="font12">
                                        <input
                                          disabled={false}
                                          style={{ textAlign: "right" }}
                                          ref={inputRef1}
                                          min={0}
                                          maxLength="3"
                                          onInput={maxLengthCheck}
                                          type="number"
                                          className="qty-ctl"
                                          id={`quantityFieldId1-${item.item_code}`}
                                          step="1"
                                          placeholder={item.physical_closing}
                                          onKeyPress={(event) => {
                                            if (
                                              event.charCode < 48 ||
                                              event.charCode > 58
                                            ) {
                                              event.preventDefault();
                                            }
                                          }}
                                          onBlur={(e) =>
                                            handleQty(
                                              e,
                                              "physical_closing",
                                              item
                                            )
                                          }
                                        />
                                      </td>
                                      <td className="font12">
                                        <input
                                          disabled={false}
                                          style={{ textAlign: "right" }}
                                          ref={inputRef1}
                                          min={0}
                                          maxLength="3"
                                          onInput={maxLengthCheck}
                                          type="number"
                                          className="qty-ctl"
                                          step="1"
                                          id={`quantityFieldId1-${item.item_code}`}
                                          placeholder={item.trasfer_qty}
                                          onKeyPress={(event) => {
                                            if (
                                              event.charCode < 48 ||
                                              event.charCode > 58
                                            ) {
                                              event.preventDefault();
                                            }
                                          }}
                                          onBlur={(e) =>
                                            handleQty(e, "trasfer_qty", item)
                                          }
                                        />
                                      </td>
                                      <td className="font12">
                                        <input
                                          disabled={false}
                                          style={{ textAlign: "right" }}
                                          ref={inputRef1}
                                          min={0}
                                          maxLength="3"
                                          onInput={maxLengthCheck}
                                          type="number"
                                          className="qty-ctl"
                                          id={`quantityFieldId1-${item.item_code}`}
                                          step="1"
                                          placeholder={item.expire_qty}
                                          onKeyPress={(event) => {
                                            if (
                                              event.charCode < 48 ||
                                              event.charCode > 58
                                            ) {
                                              event.preventDefault();
                                            }
                                          }}
                                          onBlur={(e) =>
                                            handleQty(e, "expire_qty", item)
                                          }
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              ) : (
                                "No data found!"
                              )}
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="cart-prod-list d-block d-sm-none">
                      {loading ? (
                        <ColorRing
                          visible={true}
                          height="80"
                          width="100%"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{ textAlign: "center" }}
                          wrapperClass="blocks-wrapper"
                          colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87",
                          ]}
                        />
                      ) : (
                        <>
                          <div className="col-md-12">
                            <ol className="breadcrumb">
                              <li className="breadcrumb-item">
                                {selectedBrand.brand_desc}
                              </li>
                              <li className="breadcrumb-item">
                                {selectedProductLine.product_line_desc
                                  ? selectedProductLine.product_line_desc
                                  : "All"}
                              </li>
                              <li className="breadcrumb-item active">
                                {selectedFlavour.flavour_desc
                                  ? selectedFlavour.flavour_desc
                                  : "All"}
                              </li>
                            </ol>
                          </div>

                          {orderData.map((item, index) => (
                            <div className="cart-prod-div" key={index}>
                              <div className="cart-prod-title">
                                {/* <span className="text-danger"> */}
                                <span
                                  className={
                                    item.sap_block_flag == "1"
                                      ? "text-danger"
                                      : ""
                                  }
                                >
                                  {item.item_code}
                                </span>{" "}
                                {item.mrp > 0 ? ` - (${item.mrp})` : ""}
                              </div>
                              <div className="cart-prod-desc">
                                <span className="cart-prod-val">
                                  {item.item_name}
                                </span>
                              </div>

                              <div className="cart-prod-desc d-flex mt-2">
                                <div className="cart-prod-desc">
                                  <input
                                    style={{ textAlign: "right" }}
                                    disabled={false}
                                    min={0}
                                    maxLength="3"
                                    onInput={maxLengthCheck}
                                    // max={10}
                                    ref={inputRef1}
                                    type="number"
                                    className="qty-ctl-mssr"
                                    id={`quantityFieldId-${item.item_code}`}
                                    step="1"
                                    // placeholder={item.physical_closing}
                                    placeholder={"Closing Stock"}
                                    onKeyPress={(event) => {
                                      if (
                                        event.charCode < 48 ||
                                        event.charCode > 58
                                      ) {
                                        event.preventDefault();
                                      }
                                    }}
                                    onBlur={(e) =>
                                      handleQty(e, "physical_closing", item)
                                    }
                                  />
                                </div>
                                <div className="cart-prod-desc">
                                  <input
                                    style={{ textAlign: "right" }}
                                    disabled={false}
                                    min={0}
                                    maxLength="3"
                                    onInput={maxLengthCheck}
                                    // max={10}
                                    ref={inputRef1}
                                    type="number"
                                    className="qty-ctl-mssr"
                                    id={`quantityFieldId-${item.item_code}`}
                                    step="1"
                                    // placeholder={item.trasfer_qty}
                                    placeholder={"Market Return"}
                                    onKeyPress={(event) => {
                                      if (
                                        event.charCode < 48 ||
                                        event.charCode > 58
                                      ) {
                                        event.preventDefault();
                                      }
                                    }}
                                    onBlur={(e) =>
                                      handleQty(e, "trasfer_qty", item)
                                    }
                                  />
                                </div>
                                <div className="cart-prod-desc">
                                  <input
                                    style={{ textAlign: "right" }}
                                    disabled={false}
                                    min={0}
                                    maxLength="3"
                                    onInput={maxLengthCheck}
                                    // max={10}
                                    ref={inputRef1}
                                    type="number"
                                    className="qty-ctl-mssr"
                                    id={`quantityFieldId-${item.item_code}`}
                                    step="1"
                                    // placeholder={item.expire_qty}
                                    placeholder={"Expiry Qty"}
                                    onKeyPress={(event) => {
                                      if (
                                        event.charCode < 48 ||
                                        event.charCode > 58
                                      ) {
                                        event.preventDefault();
                                      }
                                    }}
                                    onBlur={(e) =>
                                      handleQty(e, "expire_qty", item)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                  {orderData.length > 0 && (
                    <div className="card-footer bg-white">
                      <div className="row">
                        <div className="col-md-3 mb-3 d-sm-block">
                          <span onClick={addToCart}>
                            <button
                              type="button"
                              className="btn btn-block btn-primary btn-md"
                              data-toggle="collapse"
                              data-target="#collapseOne"
                              aria-expanded="true"
                              disabled={
                                disableAddToCart || orderData.length === 0
                              }
                            >
                              <i className="fas fa-cart-shopping mr-2"></i> Add
                              to Cart
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {empty && (
                <h1 className="text-center card-header">No Data found</h1>
              )}
            </div>
            {addTocart.length > 0 && (
              <>
                <div className="col-md-4 d-sm-block">
                  <div className="card card-primary border-0 rounded-0 mb-3">
                    <div
                      className={`card-header d-sm-block ${showOrderSummary}`}
                      // data-toggle="collapse"
                      // data-target="#collapseTwo"
                      // aria-expanded="true"
                      // onClick={() => setShowPlaceOrder(true)}

                      // onClick={() => {
                      // 	setShowOrderSummary("d-block");
                      // 	setShowSearchFilter("d-none");
                      // 	setShowPlaceOrder(true);
                      // }}
                    >
                      MSSR Summary
                    </div>

                    <div
                      className={`card-body collapse d-sm-block ${showOrderSummary}`}
                      id="collapseTwo"
                      aria-expanded="true"
                    >
                      <div className="cart-prod-list scroll">
                        {addTocart != "null" &&
                          addTocart.map((item, index) => (
                            <div
                              className={
                                item.mssr_entry
                                  ? `cart-prod-div-order-mssr`
                                  : `cart-prod-div-order`
                              }
                              key={index}
                            >
                              <div className="cart-prod-trash">
                                <i
                                  onClick={(e) => removeFromCart(e, item)}
                                  className="text-danger fa fa-trash mr-1"
                                ></i>
                              </div>
                              <div className="cart-prod-title">
                                {item.item_code}
                              </div>
                              <div className="cart-prod-desc">
                                <span className="cart-prod-val">
                                  {item.item_name}
                                </span>
                              </div>

                              <div className="row m-auto mssr-stock-input">
                                <span className="cart-prod-lbl">
                                  Closing stock
                                  <br></br>
                                  <span className="cart-prod-val">
                                    <input
                                      disabled={true}
                                      min={1}
                                      maxLength="3"
                                      onInput={maxLengthCheck}
                                      style={{ textAlign: "right" }}
                                      onChange={(e) =>
                                        handleQtyInCart(e, item.item_code)
                                      }
                                      onKeyPress={(event) => {
                                        if (event.charCode < 48) {
                                          event.preventDefault();
                                        }
                                      }}
                                      type="number"
                                      className="qty-ctl"
                                      step="1"
                                      placeholder={item.physical_closing}
                                    />
                                  </span>
                                </span>

                                <span className="cart-prod-lbl">
                                  Market Return <br></br>
                                  <span className="cart-prod-val">
                                    <input
                                      disabled={true}
                                      min={1}
                                      maxLength="3"
                                      onInput={maxLengthCheck}
                                      style={{ textAlign: "right" }}
                                      onChange={(e) =>
                                        handleQtyInCart(e, item.item_code)
                                      }
                                      onKeyPress={(event) => {
                                        if (event.charCode < 48) {
                                          event.preventDefault();
                                        }
                                      }}
                                      type="number"
                                      className="qty-ctl"
                                      step="1"
                                      placeholder={item.trasfer_qty}
                                    />
                                  </span>
                                </span>

                                <span className="cart-prod-lbl">
                                  Expiry Qty <br></br>
                                  <span className="cart-prod-val">
                                    <input
                                      disabled={true}
                                      min={1}
                                      maxLength="3"
                                      onInput={maxLengthCheck}
                                      style={{ textAlign: "right" }}
                                      onChange={(e) =>
                                        handleQtyInCart(e, item.item_code)
                                      }
                                      onKeyPress={(event) => {
                                        if (event.charCode < 48) {
                                          event.preventDefault();
                                        }
                                      }}
                                      type="number"
                                      className="qty-ctl"
                                      step="1"
                                      placeholder={item.expire_qty}
                                    />
                                  </span>
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>

                      <p className="text-center d-none d-sm-block m-0 font-weight-bold">
                        Total Unit:{" "}
                        <span className="text-danger">
                          {/* {parseInt(addToCartQty, 10)} */}

                          {addTocart.length}
                        </span>
                      </p>
                      {/* <h1 className="text-center text-success d-none d-sm-block">
                        {getRoundOff(addToCartTotal, 2)}
                      </h1> */}
                      <a
                        // href="#modalshowcart"
                        href="#mssrModelTable"
                        data-toggle="modal"
                      >
                        <button
                          type="button"
                          className={`btn btn-info btn-block btn-lg my-3 d-sm-block d-none`}
                        >
                          <i className="fa fa-plus"></i> Add New Sku's
                        </button>
                      </a>

                      <button
                        onClick={(e) => saveOrder(e)}
                        type="button"
                        disabled={disableConfirm}
                        className="btn btn-primary btn-block btn-lg my-3 d-sm-block d-none"
                      >
                        Save Mssr{" "}
                        {/* <i className="fa-solid fa-circle-arrow-right"></i> */}
                        <i className="fa-solid fa-floppy-disk"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 d-sm-none d-sm-none">
                  <button
                    onClick={() => {
                      setShowOrderSummary("d-none");
                      setShowSearchFilter("d-block");
                      setShowPlaceOrder(false);
                    }}
                    type="button"
                    className={`btn btn-primary btn-block btn-lg my-3 ${showOrderSummary}`}
                    aria-expanded="true"
                  >
                    Add More Line{" "}
                    <i className="fa-solid fa-circle-arrow-right"></i>
                  </button>

                  <a
                    // href="#modalshowcart"
                    href="#mssrModelTable"
                    data-toggle="modal"
                  >
                    <button
                      type="button"
                      className={`btn btn-info btn-block btn-lg my-3 ${showOrderSummary}`}
                    >
                      <i className="fa fa-plus"></i> Add New Sku's
                    </button>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="atc-footer-mobile d-block d-sm-none">
        <div className="atcm-button-group">
          {" "}
          <Link className="atcm-total-amount" data-toggle="modal">
            <span className="atcm-icon">
              <i className="fas fa-cart-shopping mr-2"></i>
            </span>
            <span className="atcm-text">
              <span className="atc-unit">Count : {addTocart.length}</span>
              {/* <span className="atc-unit">
                Amt    :  {getRoundOff(addToCartTotal, 2)}
              </span> */}
            </span>
          </Link>{" "}
          {showPlaceOrder === false && (
            <Link
              className="atcm-place-order"
              // data-toggle="collapse"
              // data-target="#collapseOne"
              // aria-expanded="false"
              onClick={() => {
                if (!disableAddToCart) {
                  toast.error("Please add item to cart or reset!");
                  // alert("plese order first");
                } else if (addTocart.length > 0) {
                  setShowOrderSummary("d-block");
                  setShowSearchFilter("d-none");
                  setShowPlaceOrder(true);
                  setEmpty(false);
                  setOrderData([]);
                } else {
                  toast.error("MSSR Summary is empty");
                }
              }}
              style={{ color: "#fff" }}
            >
              <span
              // data-toggle="collapse"
              // data-target="#collapseTwo"
              // aria-expanded="true"
              >
                MSSR Summary
              </span>
              <i className="fa-solid fa-circle-arrow-right"></i>
            </Link>
          )}
          {showPlaceOrder === true && (
            <button
              onClick={(e) => saveOrder(e)}
              type="button"
              className="atcm-place-order"
              disabled={disableConfirm}
            >
              <span>Save Mssr</span>{" "}
              <i className="fa-solid fa-circle-arrow-right"></i>
            </button>
          )}
          {/* <i className="fa fa-spinner fa-spin">no spinner but why</i> */}
        </div>
      </div>
      <MssrModel id="mssrModelTable" />

      {/* <Toaster position="bottom-center" reverseOrder={false} /> */}
    </>
  );
};

export default Mssr;
