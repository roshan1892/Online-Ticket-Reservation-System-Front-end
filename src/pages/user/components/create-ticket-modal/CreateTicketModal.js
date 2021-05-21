import { Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomModal from "../../../../components/modal/CustomModal";
import { MOVIE_TICKET_LIST, REQUIRED_FIELD } from "../../../../utils/constants/index";
import Select from "react-select";


export default function CreateTicketModal({ showCreateTicketModal, handleCreateTicketModalClose, handleModalSubmit, ...props }) {
  const [priceOptions, setPriceOptions] = useState();
  const [selectedTicket, setSelectedTicket] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [customErrors, setCustomErrors] = useState({
    name: false,
    price: false
  });

  const [customValidationPassed, setCustomValidationPassed] = useState(false);
  const { register, handleSubmit, errors, reset, setValue } = useForm();


  useEffect(() => {
    if (selectedTicket && selectedPrice) {
      setCustomValidationPassed(true);
    }
  }, [selectedTicket, selectedPrice])

  useEffect(() => {
    if (!showCreateTicketModal) {
      handleModalClose();
    }
  }, [showCreateTicketModal]);

  const handleModalClose = () => {
    reset();
    setCustomErrors({
      name: false,
      price: false
    });
    setCustomValidationPassed(false);
    setSelectedTicket(null);
    setSelectedPrice(null);
    handleCreateTicketModalClose();
  }

  const handleTicketNameChange = ticketOption => {
    register({ name: "name" });
    setValue("name", ticketOption.value);
    setValue("price", null);
    setSelectedTicket(ticketOption.value)
    setPriceOptions(ticketOption.prices);
    ticketOption.value !== "" &&
      setCustomErrors(prev => ({
        ...prev,
        name: false,
      }));
  }

  const handlePriceChange = priceOption => {
    register({ name: "price" });
    setValue("price", priceOption.value);
    setSelectedPrice(priceOption.value);
    priceOption.value !== "" &&
      setCustomErrors(prev => ({
        ...prev,
        price: false,
      }));
  };

  const onSubmit = data => {

    (!data.name || data.name === "") &&
      setCustomErrors(prev => ({
        ...prev,
        name: true,
      }));

    (!data.price || data.price === "") &&
      setCustomErrors(prev => ({
        ...prev,
        price: true,
      }));

    customValidationPassed &&
      handleModalSubmit(data);
  };

  return (
    <>
      <CustomModal
        title="Make a payment"
        onModalSubmit={handleSubmit(onSubmit)}
        showModal={showCreateTicketModal}
        onModalClose={handleModalClose}
      >
        <form>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={6}>
              <Select
                className="select-md"
                classNamePrefix="react-select"
                name="name"
                placeholder="Select Ticket"
                options={MOVIE_TICKET_LIST}
                onChange={handleTicketNameChange}
              />
              {customErrors.name && (
                <span className="error-message">{REQUIRED_FIELD}</span>
              )}
            </Grid>
            <Grid item xs={6}>
              <Select
                className="select-md"
                classNamePrefix="react-select"
                name="price"
                placeholder="Select Price"
                options={priceOptions}
                onChange={handlePriceChange}
              />
              {customErrors.district && (
                <span className="error-message">{REQUIRED_FIELD}</span>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Ticket Description"
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