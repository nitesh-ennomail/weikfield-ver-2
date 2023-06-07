import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MssrService from "../../axios/services/api/mssr";
import {
  selectedPagesNumber,
  setViewOrderFilter,
  setViewOrderTotalPages,
  setViewOrderTotalRecord,
} from "../../redux/actions/viewOrderAction";
import DatePicker from "react-datepicker";
import {
  selectedMssrPagesNumber,
  setViewMssrFilter,
  setViewMssrTotalPages,
  setViewMssrTotalRecord,
} from "../../redux/actions/mssrAction";
import { convert } from "../../pages/pages/utils/dateConverter";
import $ from "jquery";
function MssrSearchBar({ channel }) {
  const dispatch = useDispatch();

  const date = new Date();
  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
  }
  const firstDay = getFirstDayOfMonth(date.getFullYear(), date.getMonth());

  // Collecting data from Redux store
  const userProfile = useSelector((state) => state.userProfile);
  const userId = useSelector(
    (state) => state.dashboard.dashboard.profile_details.user_id
  );

  const viewOrder = useSelector((state) => state.viewOrder);
  const { viewOrderFilter, viewOrderTotalPages, selectedPage } = viewOrder;

  const mssr = useSelector((state) => state.mssr);
  const { mssrFilter, mssrTotalPages, mssrTotalRecord } = mssr;

  const [month, setMonth] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [stockStatus, setStockStatus] = useState(0);
  const [distributor, setDistributor] = useState(0);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(0);
  const [selectedDistributer, setSelectedDistributer] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [loading, setLoading] = useState(true);

  const handleDateChange = (date) => {
    //for selected month formate Output: "YYYY-MM"
    const formattedDate = date
      ? date.toLocaleString("en-US", { year: "numeric", month: "2-digit" })
      : "";
    const [month, year] = formattedDate.split("/");
    const formattedMonth = `${year}-${month.padStart(2, "0")}`;
    setMonth(formattedMonth);
  };

  const resetSearch = () => {
    setSelectedChannel(0);
    setSelectedOrderStatus(0);
    setSelectedDistributer(0);
    setStockStatus(0);
    setDistributor(0);
  };
  const getViewStockDetailFilter = async (channel) => {
    setSelectedChannel(channel);
    setSelectedOrderStatus(0);
    setSelectedDistributer(0);
    setStockStatus(0);
    setDistributor(0);
    await MssrService.getViewStockDetailFilter(userProfile, channel).then(
      (response) => {
        setStockStatus(response.data.data.stock_details_status);
        setDistributor(response.data.data.distributor_details);
      }
    );
  };

  // on button submit
  const getViewOrderDetails = async () => {
    const selectedPageN = 0;
    await MssrService.getViewStockDetails(
      userProfile,
      selectedChannel,
      userId,
      month,
      selectedDistributer,
      selectedOrderStatus,
      selectedPageN
    ).then((response) => {
      console.log("response", response);
      dispatch(setViewMssrFilter(response.data.data.order_details));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(selectedMssrPagesNumber(0));
    getViewOrderDetails();
  };

  useEffect(() => {
    getViewOrderDetails();
  }, [selectedPage]);

  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <div className="card card-primary border-0">
          <div
            className="card-header collapsepanel"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded="true"
          >
            Search Mssr Entries
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
                        <label htmlFor="OrderNumber" className="control-label">
                          Channel:
                        </label>
                      </div>
                      <div className="col-md-8">
                        <select
                          name="OrderNumber"
                          className="form-control selectpicker"
                          data-live-search="true"
                          onChange={(e) =>
                            getViewStockDetailFilter(e.target.value)
                          }
                          required
                        >
                          <option value={0}>Show All</option>
                          {channel &&
                            channel.map((ch, index) => (
                              <option
                                key={ch.channel_code}
                                value={ch.channel_name}
                              >
                                {ch.channel_name}
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
                          htmlFor="DistributorName"
                          className="control-label"
                        >
                          Distributor:
                        </label>
                      </div>
                      <div className="col-md-8">
                        <select
                          name="DistributorName"
                          className="form-control selectpicker"
                          data-live-search="true"
                          onChange={(e) =>
                            setSelectedDistributer(e.target.value)
                          }
                          required
                        >
                          <option value={0}>Show All</option>

                          {distributor &&
                            distributor.map((dist, index) => (
                              <option
                                key={dist.customer_code}
                                value={dist.customer_code}
                              >
                                {dist.customer_name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="dateTo" className="control-label">
                          Month:
                        </label>
                      </div>
                      <div className="col-md-8">
                        <DatePicker
                         showIcon
                         className="form-control monthpicker"
                          selected={selectedDate}
                          value={month}
                          onChange={(data) => handleDateChange(data)}
                          dateFormat="yyyy-MM"
                          showMonthYearPicker
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="OrderStatus" className="control-label">
                          MSSR Status:
                        </label>
                      </div>
                      <div className="col-md-8">
                        <select
                          name="OrderStatus"
                          className="form-control selectpicker"
                          data-live-search="true"
                          onChange={(e) =>
                            setSelectedOrderStatus(e.target.value)
                          }
                          required
                        >
                          <option value={0}>Show All</option>
                          {stockStatus &&
                            stockStatus.map((order, index) => (
                              <option
                                key={order.lov_id}
                                value={order.lov_value}
                              >
                                {order.lov_value}
                              </option>
                            ))}
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
                          className="btn btn-primary  btn-md"


                          data-toggle="collapse"
                                data-target="#collapseOne"
                                aria-expanded="false"
                        >
                          <i className="fa-solid fa-magnifying-glass"></i>{" "}
                          Search
                        </button>
                        &nbsp;
                        <button
                          type="reset"
                          onClick={resetSearch}
                          className="btn btn-danger btn-md"
                        >
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

export default MssrSearchBar;
