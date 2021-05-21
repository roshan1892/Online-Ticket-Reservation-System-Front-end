import { Cookies } from "../utils/storage/cookies";
import { AUTH_TOKEN, REMEMBER_ME, USER_ROLE } from "../utils/constants/index";
import { SessionStorage } from "./storage/sessionStorage";
import { LocalStorage } from "./storage/localStorage";

export const AppUtils = {
  getAuthToken() {
    return Cookies.readCookie(AUTH_TOKEN);
  },
  getUserRole() {
    return Cookies.readCookie(USER_ROLE);
  },
  saveUserCredentials(data, rememberMe) {
    var cookieTime = 10; // 10 hour
    if (rememberMe) {
      cookieTime = 1 * 24 * 10; // 10 days
      Cookies.writeCookie(REMEMBER_ME, true, cookieTime);
    }
    Cookies.writeCookie(AUTH_TOKEN, data.token, cookieTime, "/");
    Cookies.writeCookie(USER_ROLE, data.role, cookieTime, "/");
  },
  removeUserRef() {
    Cookies.deleteCookie(USER_ROLE);
    Cookies.deleteCookie(AUTH_TOKEN);
    Cookies.deleteCookie(REMEMBER_ME);
    SessionStorage.clear();
    LocalStorage.clear();
  },
  getUrlParam(key) {
    let pageUrl = window.location.search.substring(1);
    let urlParams = pageUrl.split("&");

    for (let i = 0; i < urlParams.length; i++) {
      let paramName = urlParams[i].split("=");

      if (paramName[0] === key) {
        return paramName[1] === undefined
          ? true
          : decodeURIComponent(paramName[1]);
      }
    }
  },
};
