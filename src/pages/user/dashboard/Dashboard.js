import { Box, Button, Typography, Container } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import OTRS, { API_URL } from "../../../api/api";
import AddAlertMessage from "../../../components/alert/Alert";
import { SOMETHING_WENT_WRONG } from "../../../utils/constants";
import styles from "./style";
import CreateTicketModal from "../components/create-ticket-modal/CreateTicketModal";
import TicketsList from "../components/ticket-list/TicketsList";
import BarDiagram from "../../../components/charts/BarDiagram";
import PieChart from "../../../components/charts/PieChart";
import EmptyContainer from "../../../components/empty-container/EmptyContainer";

export default function UserDashboard() {
  const classes = styles();
  const [openCreateTicketModal, setOpenCreateTicketModal] = useState(false);
  const [ticketTableData, setTicketTableData] = useState([]);
  const [chartData, setChartsData] = useState([]);
  const [chartDataLabel, setChartDataLabel] = useState([]);

  const getChartData = () => {
    OTRS.get(API_URL.chart)
      .then(response => {
        var data = response.data.chartMap;
        if (data.length !== 0) {
          let tempLabels = [];
          let tempData = []
          for (var propName in data) {
            tempLabels.push(propName);
            tempData.push(data[propName]);
          }
          setChartDataLabel(tempLabels);
          setChartsData(tempData);
        }
      });
  };


  const emptyChartMsgContainer = () => {
    return (
      <EmptyContainer>
        <Typography className={classes.emptyMsg}>
          Sorry,there is no data. Please create tickets and payments first.
        </Typography>
      </EmptyContainer>
    )
  }

  useEffect(() => {
    getTicketsData();
    getChartData();
  }, []);

  const handleCreateTicketModalClose = () => {
    setOpenCreateTicketModal(false);
  }

  const getTicketsData = () => {
    OTRS.get(API_URL.listTickets)
      .then(response => {
        setTicketTableData(response.data.ticketList);
      })
  }

  const handleAddCreateTicketModalSubmit = data => {
    OTRS.post(API_URL.createTicket, data)
      .then(response => {
        if (response.status === 200) {
          handleCreateTicketModalClose()
          getTicketsData();
          getChartData();
        }
        AddAlertMessage({
          type: response.data.type,
          message: response.data.message
        });
      })
      .catch(error => {
        AddAlertMessage({
          type: "error",
          message: SOMETHING_WENT_WRONG
        });
      });
  }

  return (
    <>
      <Box className={classes.mulDartaRegisterContainer} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" borderBottom={1} mb={3} pb={1}>
        <Typography variant="h5">
          OTRS - All Booked Tickets
        </Typography>
        <Box display="flex" alignItems="center">
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => { setOpenCreateTicketModal(true) }}>Create New Ticket</Button>
        </Box>
      </Box>
      <Box>
        <TicketsList tableData={ticketTableData} />
      </Box>
      <CreateTicketModal handleModalSubmit={handleAddCreateTicketModalSubmit.bind(this)} showCreateTicketModal={openCreateTicketModal} handleCreateTicketModalClose={handleCreateTicketModalClose} />
      <Container maxWidth="lg" className={classes.root} disableGutters>
        <Box>
          <h2 className="border-bottom-heading">Totals Tickets and Payments in pie chart</h2>
          {
            chartData[0] === 0 ?
              emptyChartMsgContainer() : (
                <PieChart
                  labels={chartDataLabel}
                  chartData={chartData}
                />
              )
          }
        </Box>
        <Box>
          <h2 className="border-bottom-heading">Totals Tickets and Payments in Bar Diagram</h2>
          {
            chartData[0] === 0 ?
              emptyChartMsgContainer() : (
                <BarDiagram
                  data={chartData}
                  labels={chartDataLabel}
                  diagramLabel = 'Ticket-Payment Bar Diagram'
                />
              )
          }
        </Box>
      </Container >
    </>
  );
}
