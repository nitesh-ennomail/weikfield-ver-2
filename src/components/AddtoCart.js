import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AddtoCart({disableAddToCart}) {

    const dispatch = useDispatch();

    const userProfile = useSelector((state) => state.userProfile);
    const mssr = useSelector((state) => state.mssr);
    const { mssr_line_list, mssr_filter_list } = mssr;


	const [orderData, setOrderData] = useState([]);

    const addToCart = () => {
		let currItemList = mssr_filter_list.filter(function (el) {
			return el.expire_qty >= 1;
		});
        setOrderData(currItemList)
		// dispatch(setSelectedDistributor(distributor?distributor:selectedDistributer))
		// dispatch(setSelectedSalePerson(salePerson?salePerson:selectedSalePerson))

		// Merge previous order and current order
		// let added_to_cart = [...addTocart, ...currItemList];

		// For removing duplicate key
		// const key = "portal_item_code";
		// const order_grid_details_UniqueByKey = getUniqueByKey(added_to_cart, key);
		// store the data in redux store

		// dispatch(setAddToCart(order_grid_details_UniqueByKey));
		// setShowPlaceOrder(false);
		// setOrderData([]);
		// setDisableAddToCart(true);
	};
  return (
    <div>
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
                  // disabled={orderData.length === 0
                  // }
                  disabled={disableAddToCart}
              >
                <i className="fas fa-cart-shopping mr-2"></i> Add to Cart
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddtoCart;
