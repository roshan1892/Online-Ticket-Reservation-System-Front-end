import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styles from "./style";

export default function CustomModal({ onModalSubmit, onModalClose, children, ...props }) {
  const classes = styles();
  const [open, setOpen] = useState(props.showModal || false);

  useEffect(() => {
    setOpen(props.showModal);
  }, [props.showModal]);

  const handleSubmitCallback = () => {
    onModalSubmit();
  }

  const handleCloseCallback = () => {
    onModalClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleCloseCallback}
      disableBackdropClick={props.disableBackdropClick}
      maxWidth={props.maxWidth}
      fullWidth={props.fullWidth}
      scroll={props.scroll}
      disableEscapeKeyDown={props.disableEscapeKeyDown}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
    >
      {props.title &&
        <DialogTitle disableTypography className={classes.modalHeader}>
          <Typography variant="h6" color="textPrimary">{props.title}</Typography>
          {props.showCloseIcon ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseCallback}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
      }
      <DialogContent dividers={props.dividers}>
        {children}
      </DialogContent>
      {!props.hideFooter &&
        <DialogActions>
          {!props.hideCancelBtn &&
            <Button onClick={handleCloseCallback} size={props.cancelButtonSize} variant={props.cancelButtonVariant} color={props.cancelButtonColor}>
              {props.cancelButtonText}
            </Button>
          }
          {!props.hideSubmitBtn &&
            <Button onClick={handleSubmitCallback} size={props.submitButtonSize} variant={props.submitButtonVariant} color={props.submitButtonColor}>
              {props.submitButtonText}
            </Button>
          }
        </DialogActions>
      }
    </Dialog>
  );
}


CustomModal.propTypes = {
  disableBackdropClick: PropTypes.bool,
  maxWidth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  fullWidth: PropTypes.bool,
  scroll: PropTypes.oneOf(["paper", "body"]),
  disableEscapeKeyDown: PropTypes.bool,
  showCloseIcon: PropTypes.bool,
  dividers: PropTypes.bool,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]),
  hideFooter: PropTypes.bool,
  cancelButtonText: PropTypes.string,
  submitButtonText: PropTypes.string,
  cancelButtonVariant: PropTypes.string,
  submitButtonVariant: PropTypes.string,
  cancelButtonColor: PropTypes.string,
  submitButtonColor: PropTypes.string,
  cancelButtonSize: PropTypes.oneOf(["small", "medium", "large"]),
  submitButtonSize: PropTypes.oneOf(["small", "medium", "large"]),
  hideCancelBtn: PropTypes.bool,
  hideSubmitBtn: PropTypes.bool,
  handleSubmitCallback: PropTypes.func,
  handleCancelCallback: PropTypes.func,
};

CustomModal.defaultProps = {
  disableBackdropClick: true,
  showCloseIcon: true,
  dividers: true,
  maxWidth: "md",
  fullWidth: true,
  scroll: "paper",
  disableEscapeKeyDown: true,
  hideFooter: false,
  cancelButtonText: "Close",
  submitButtonText: "Submit",
  cancelButtonVariant: "contained",
  submitButtonVariant: "contained",
  cancelButtonColor: "secondary",
  submitButtonColor: "primary",
  cancelButtonSize: "medium",
  submitButtonSize: "medium",
  hideCancelBtn: false,
  hideSubmitBtn: false,
};