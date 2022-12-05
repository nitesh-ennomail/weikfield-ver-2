import "./App.css";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
// import { HashRouter as Router } from "react-router-dom"
import Login from "./pages/pages/Login";
import Dashboard from "./pages/pages/Dashboard";
import Header from "./pages/pages/Header";
import ProductMaster from "./pages/pages/ProductMaster";
import React, { useEffect } from "react";
import DistributorMaster from "./pages/pages/DistributorMaster";
import PlaceOrder from "./pages/pages/PlaceOrder";
import ViewOrder from "./pages/pages/ViewOrder";
import MyProfile from "./pages/pages/MyProfile";

function App() {
	// console.log("process.env.PUBLIC_URL", process.env.PUBLIC_URL);

	// console.log("process.env.PUBLIC_URL", window.location.pathname);

	useEffect(() => {
		{
			window.location.pathname == "/"
				? document.body.classList.add("loginBG")
				: document.body.classList.add(
						"fixed-nav",
						"sticky-footer",
						"sidenav-toggled"
				  );
		}
	}, [window.location.pathname]);

	return (
		<>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				{/* <HashRouter> */}

				<Routes>
					<Route path="/" element={<Login />} />

					<Route
						path="/product"
						element={
							<>
								<Header />
								<ProductMaster />
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
						path="/distribution"
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

					<Route path="*" element={<h1>Not found</h1>} />
				</Routes>
				{/* </HashRouter> */}
			</BrowserRouter>
		</>
	);
}

export default App;
