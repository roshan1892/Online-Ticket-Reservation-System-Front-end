import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { Cookies } from "../utils/storage/cookies";
import { AUTH_TOKEN, USER_ROLE } from "../utils/constants/index";

export default function RouteWrapper({ component: Component, path: urlPath, isPrivate, isWrongLink, ...rest }) {
  if (isPrivate && !Cookies.readCookie(AUTH_TOKEN)) {
    return <Redirect to="/" />;
  } else if (!isPrivate && !isWrongLink && !urlPath.includes("/user-not-authorized") && Cookies.readCookie(AUTH_TOKEN) && Cookies.readCookie(USER_ROLE) === "ROLE_USER") {
    return <Redirect to="/user/dashboard" />;
  } else if (isPrivate && urlPath.includes("/user") && Cookies.readCookie(USER_ROLE) !== "ROLE_USER") {
    return <Redirect to="/user-not-authorized" />;
  } else {
    return <Route {...rest} component={Component} />;
  }
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isWrongLink: PropTypes.bool
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  isWrongLink: false
};
