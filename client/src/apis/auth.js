import axios from "axios";
axios.defaults.withCredentials = true;
export const requestLogin = (phone) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  };
  const data = { phone: phone };
  return axios.post(`${process.env.REACT_APP_API_HOST}/api/auth/login`, data, {
    headers: headers,
  });
};

export const requestDasboard = () => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  };
  return axios.post(`${process.env.REACT_APP_API_HOST}/api/auth/dashboard`, {
    headers: headers,
  });
};
