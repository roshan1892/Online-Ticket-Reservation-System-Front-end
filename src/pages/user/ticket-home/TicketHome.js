import { Box, Button, Container, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import OTRS, { API_URL } from "../../../api/api";
import AddAlertMessage from "../../../components/alert/Alert";
import { AppUtils } from "../../../utils/appUtils";
import { ID, SOMETHING_WENT_WRONG } from "../../../utils/constants";
import TicketPaymentInfo from "../components/ticket-payment-info/TicketPaymentInfo";
import CreatePaymentModal from "../components/create-payment-modal/CreatePaymentModal";


export default function TicketHome(props) {
  const [openCreatePaymentModal, setOpenCreatePaymentModal] = useState(false);
  const [tableData, setTableData] = useState([]);

  const handleCreatePaymentModalClose = () => {
    setOpenCreatePaymentModal(false);
  }

  useEffect(() => {
    getPaymentsData();
  }, []);

  const getPaymentsData = () => {
    let ticketId = AppUtils.getUrlParam(ID);
    OTRS.get(API_URL.paymentByTicketId + ticketId)
      .then(response => {
        if (response.status === 200) {
          setTableData(response.data.paymentList);
        } else if (response.status === 400) {
          AddAlertMessage({
            type: response.data.error,
            message: response.data.message
          });
        }
      })
      .catch(error => {
        AddAlertMessage({ type: "error", message: SOMETHING_WENT_WRONG });
      });
  }

  const handleSubmit = data => {
    let ticketId = AppUtils.getUrlParam(ID);
    if (ticketId) {
      data.ticketId = ticketId;
      OTRS.post(API_URL.createPayment, data)
        .then(response => {
          if (response.status === 200) {
            handleCreatePaymentModalClose();
            getPaymentsData();
          }
        })
        .catch(error => {
          AddAlertMessage({
            type: "error",
            message: SOMETHING_WENT_WRONG
          });
        });
    }
  };
  return (
    <Container>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" borderBottom={1} mb={3} pb={1}>
        <Box display="flex" alignItems="center">
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => { setOpenCreatePaymentModal(true) }}>Make a Payment</Button>
        </Box>
        <Box>
          <Typography variant="h5">
            OTRS - Payment Detail
        </Typography>
        </Box>
      </Box>
      <Box>
        <TicketPaymentInfo tableData={tableData} />
      </Box>
      <CreatePaymentModal showAddUserModal={openCreatePaymentModal} handleAddUserModalClose={handleCreatePaymentModalClose} onSubmit={handleSubmit.bind(this)} />
    </Container >
  )
}