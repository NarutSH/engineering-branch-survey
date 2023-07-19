import axios from "axios";

const serviceApi = axios.create({
  baseURL: "https://data-node-api-143d9715d7e5.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default serviceApi;
