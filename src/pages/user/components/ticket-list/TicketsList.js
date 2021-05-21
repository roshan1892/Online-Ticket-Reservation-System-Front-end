import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { NO_RECORDS_FOUND } from "../../../../utils/constants";

export default function TicketsList(props) {

  return (
    <Container>
      <TableContainer>
        <Table classes={{ root: "table-bordered" }} size="small" aria-label="a dense table">
          <TableHead classes={{ root: "align-center" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>CreatedDate</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tableData.length === 0 ?
              (
                <TableRow>
                  <TableCell colSpan={5} align="center" size="medium">{NO_RECORDS_FOUND}</TableCell>
                </TableRow>) :
              props.tableData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell><a href={`ticket-home?id=${row.id}`}>{row.name}</a></TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row.paymentStatus?'true':'false'}</TableCell>
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
