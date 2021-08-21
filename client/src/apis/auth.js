import axios from "axios";

export const requestLogin = (phone) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      };
      const data = { phone: phone };
      return axios
        .post(`${process.env.REACT_APP_API_HOST}/api/auth/login`, data, {
          headers: headers,
        })
}
