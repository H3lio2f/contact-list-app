import axios from "axios";

axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

const api = axios.create({
  baseURL: "https://helio2f-contact-list-api.herokuapp.com/api/",
  //baseURL: "http://localhost:5000/api/",
});

export default api;
