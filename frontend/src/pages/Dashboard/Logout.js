import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../feature/authReducer";
axios.defaults.withCredentials = true;


const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // logout handling-->
    //send logout request
    const sendLogoutRequest = async () => {
      const res = await axios
        .post("http://localhost:3001/logout", { withCredentials: true })
        .catch((err) => console.log(err));
    };

    sendLogoutRequest()
      .then(() => dispatch(authActions.logout()))
      .then(() => navigate("/cms-admin"));
  }, []);

  return <></>;
};

export default Logout;
