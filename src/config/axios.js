import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://dct-ticket-master.herokuapp.com"
});

export default axios;
