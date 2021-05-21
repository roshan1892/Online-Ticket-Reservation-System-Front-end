
import { Box, CircularProgress } from '@material-ui/core';
import PropTypes from "prop-types";
import React from 'react';
import styles from "./style";

export default function Spinner(props) {
  const classes = styles();
  return (
    <Box className={classes.root}>
      <CircularProgress
        variant="determinate"
        value={100}
        className={classes.top}
        size={props.size}
        thickness={props.thickness}
        {...props}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={props.size}
        thickness={props.thickness}
        {...props}
      />
    </Box>
  );
}

Spinner.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number
};

Spinner.defaultProps = {
  size: 24,
  thickness: 5,
}