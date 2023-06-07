import "./App.css";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
// import { HashRouter as Router } from "react-router-dom"
import Login from "./pages/pages/Login";
import Dashboard from "./pages/pages/Dashboard";
import Header from "./pages/pages/Header";
import ProductMaster from "./pages/pages/ProductMaster";
import React, { useEffect, useLayoutEffect } from "react";
import DistributorMaster from "./pages/pages/DistributorMaster";
import PlaceOrder from "./pages/pages/PlaceOrder";
import ViewOrder from "./pages/pages/ViewOrder";
import MyProfile from "./pages/pages/MyProfile";
import Logout from "./pages/pages/Logout";
import PageNotFound from "./pages/pages/PageNotFound";
import ForgotPassword from "./pages/pages/ForgotPassword";
import ModifyOrders from "./pages/pages/ModifyOrders";
import Mssr from "./pages/pages/Mssr";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//jQuery libraries
// import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "../node_modules/datatables.net-dt/css/jquery.dataTables.min.css";
import MssrViewOrder from "./pages/pages/MssrViewOrder";
import MyForm from "./pages/pages/MyForm";

function App() {
	useLayoutEffect(() => {
		window.location.pathname == "/"
			? document.body.classList.add("loginBG")
			: document.body.classList.add(
					"fixed-nav",
					"sticky-footer",
					"sidenav-toggled"
			  );
	}, []);

	return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {/* <BrowserRouter basename={"/partner"}> */}
        {/* <HashRouter> */}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route
            path="/productmaster"
            element={
              <>
                <Header />
                <ProductMaster />
              </>
            }
          />

          <Route
            path="/createmssr"
            element={
              <>
                <Header />
                <Mssr />
              </>
            }
          />

          <Route
            path="/viewmssr"
            element={
              <>
                <Header />
                <MssrViewOrder />
              </>
            }
          />

          <Route
            path="/test"
            element={
              <>
                <Header />
                <MyForm />
              </>
            }
          />

          <Route
            path="/dashboard"
            element={
              <>
                <Header />
                <Dashboard />
              </>
            }
          />

          <Route
            path="/distributor"
            element={
              <>
                <Header />
                <DistributorMaster />
              </>
            }
          />

          <Route
            path="/placeorder"
            element={
              <>
                <Header />
                <PlaceOrder />
              </>
            }
          />
          <Route
            path="/modifyorder"
            element={
              <>
                <Header />
                <ModifyOrders />
              </>
            }
          />

          <Route
            path="/vieworder"
            element={
              <>
                <Header />
                <ViewOrder />
              </>
            }
          />

          <Route
            path="/myprofile"
            element={
              <>
                <Header />
                <MyProfile />
              </>
            }
          />

          <Route
            path="/logout"
            element={
              <>
                <Logout />
              </>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {/* </HashRouter> */}
      </BrowserRouter>
    </>
  );
}

export default App;
