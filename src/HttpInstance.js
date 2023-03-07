import axios from "axios";

export default axios.create({
  baseURL: "http://3000/api",
  headers: {
    "Content-type": "application/json"
  }
});