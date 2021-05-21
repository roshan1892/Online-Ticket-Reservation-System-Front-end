import { Grid, TextField } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import CustomModal from "../../../../components/modal/CustomModal";
import { REQUIRED_FIELD } from "../../../../utils/constants";

export default function CreatePaymentModal({ showAddUserModal, handleAddUserModalClose, onSubmit, ...props }) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <>
      <CustomModal
        title="Make a payment"
        onModalSubmit={handleSubmit(onSubmit)}
        showModal={showAddUserModal}
        onModalClose={handleAddUserModalClose}
      >
        <form>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Payment Name"
                type="text"
                variant="outlined"
                name="name"
                inputRef={register({
                  required: true
                })}
              />
              {errors.name && <span className="error-message">{REQUIRED_FIELD}</span>}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Amount"
                variant="outlined"
                name="amount"
                inputRef={register({
                  required: true
                })}
              />
              {errors.name && <span className="error-message">{REQUIRED_FIELD}</span>}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Payment Description"
                type="text"
                variant="outlined"
                name="description"
                inputRef={register({
                  required: true
                })}
              />
              {errors.name && <span className="error-message">{REQUIRED_FIELD}</span>}
            </Grid>
          </Grid>
        </form>
      </CustomModal>
    </>
  );
};