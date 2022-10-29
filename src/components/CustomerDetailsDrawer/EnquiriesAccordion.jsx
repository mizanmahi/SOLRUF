import React from "react";
import { Box } from "@mui/material";
import CustomAccordionForDrawer from "../Custom/CustomAccordionForDrawer/CustomAccordionForDrawer";
// tables
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TermLinkButton } from "./customerDetailsDrawer.style";

const EnquiriesAccordion = ({ rows }) => {
  return (
    <CustomAccordionForDrawer
      paddingOff={true}
      pt="1rem"
      title="Enquiries"
      titleStyle={{ fontSize: "1rem" }}
      sx={{
        boxShadow: 0,
        mt: 2,
        "& .MuiAccordionSummary-root": {
          borderBottom: "1px solid #D0D7D9",
        },
      }}
    >
      <TableContainer component={Box} sx={{ height: "690px" }}>
        <Table sx={{ width: "100%", minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Enquiry ID
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Date
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Product
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Bids
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.name}
                style={
                  index % 2
                    ? { background: "#F3F3F3" }
                    : {
                        background: "transparent",
                      }
                }
              >
                <TableCell align="center">
                  <TermLinkButton
                    sx={{
                      color: "#0097D3",
                      border: "2px solid #0097D3",
                    }}
                  >
                    #1234
                  </TermLinkButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  10 Mar 2022
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  24-inch Solar Cables...
                </TableCell>
                <TableCell align="center">
                  {index === 0 && "-"}
                  {index === 1 && (
                    <span className="text-danger">Cancelled</span>
                  )}
                  {index !== 0 && index !== 1 && "₹5000-₹7000"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomAccordionForDrawer>
  );
};

export default EnquiriesAccordion;
