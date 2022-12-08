import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../redux/actions/authActions";

const Logout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(removeUser());
		navigate("/");
	}, []);

	return <div>Logout</div>;
};

export default Logout;
