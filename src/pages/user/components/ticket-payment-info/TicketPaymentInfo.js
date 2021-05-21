import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { NO_RECORDS_FOUND } from "../../../../utils/constants";


export default function TicketPaymentInfo(props) {
  return (
    <Container>
      <TableContainer>
        <Table classes={{ root: "table-bordered" }} size="small" aria-label="Municipality Users">
          <TableHead classes={{ root: "align-center" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tableData.length === 0 ?
              (
                <TableRow>
                  <TableCell colSpan={4} align="center" size="medium">{NO_RECORDS_FOUND}</TableCell>
                </TableRow>) :
              props.tableData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              )
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container >
  );
}
