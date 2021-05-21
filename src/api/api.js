import axios from "axios";
import { AppUtils } from "../utils/appUtils";
import { IS_SESSION_EXPIRED } from "../utils/constants";
import { SessionStorage } from "../utils/storage/sessionStorage";

export const LOCAL_CONSTANTS = {
  BASE_URL: "http://localhost:8092/"
};

const BASE_URL = LOCAL_CONSTANTS.BASE_URL;

export const API_URL = {
  login: BASE_URL + "login",
  logout: BASE_URL + "logout",
  createTicket: BASE_URL + "createTicket",
  listTickets: BASE_URL + "listTickets",
  createPayment: BASE_URL + "createPayment",
  listPayments: BASE_URL + "listPayments",
  chart: BASE_URL + "fetchChartData",
  paymentByTicketId: BASE_URL + "fetchPayment/"
}

const OTRS = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

OTRS.interceptors.request.use(
  config => {
    if (config.baseURL === BASE_URL && !config.headers.Authorization) {
      var authToken = AppUtils.getAuthToken();
      if (authToken) {
        config.headers.Authorization = authToken;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

OTRS.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        AppUtils.removeUserRef();
        SessionStorage.setItem(IS_SESSION_EXPIRED, "true");
        window.location.href = "/";
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default OTRS;
