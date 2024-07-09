import React from "react";
import MainApi from "./MainApi";
import { login } from "./ApiRoutes";

const getToken = () => {
    const { data } = MainApi.get(login);
    console.log("Login API", data);
};

export default getToken;
