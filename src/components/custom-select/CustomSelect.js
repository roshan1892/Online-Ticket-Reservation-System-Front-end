import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./style";
export default function CustomSelect(props) {
  const classes = styles();
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    props.value && props.onChange(props.value);
  }, [props.value])

  const handleChange = event => {
    setSelectedValue(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <FormControl variant={props.variant} margin={props.formControlMargin} className={classes.formControl} fullWidth={props.fullWidth} disabled={props.disabled}>
      <InputLabel >{props.label}</InputLabel>
      <Select
        value={selectedValue || props.value}
        onChange={handleChange}
        multiple={props.multiple}
        className={props.className}
      >
        props.showDisabledOption && <MenuItem value="" disabled>{props.disabledOptionText}</MenuItem>
        {props.options.map((option, index) => <MenuItem key={index} value={option.value}>{option.label}</MenuItem>)}
      </Select>
    </FormControl>
  )
}

CustomSelect.propTypes = {
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledOptionText: PropTypes.string,
  showDisabledOption: PropTypes.bool,
  multiple: PropTypes.bool,
  value: PropTypes.string,
  className: PropTypes.string,
};

CustomSelect.defaultProps = {
  variant: "outlined",
  fullWidth: false,
  disabled: false,
  disabledOptionText: "कृपया छान्नुहोस",
  showDisabledOption: true,
  multiple: false,
  value: "",
  className: "customSelect"
};