import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ManifestPreview = () => {
  const renderLabelBox = () => (
    <Box
      sx={{
        border: "2px solid #000",
        padding: 2,
        bgcolor: "#f9f9f9",
        maxWidth: "100%", // Adjust to ensure responsive layout
      }}
    >
      <TableContainer>
        <Table size="large">
          {/* Define Table Head */}
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "5%" }}>
                <strong>Sr.</strong>
              </TableCell>
              <TableCell sx={{ width: "15%" }}>
                <strong>Order ID</strong>
              </TableCell>
              <TableCell sx={{ width: "10%" }}>
                <strong>Courier</strong>
              </TableCell>
              <TableCell sx={{ width: "10%" }}>
                <strong>No. of Order</strong>
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
                <strong>Warehouse</strong>
              </TableCell>
              <TableCell sx={{ width: "10%" }}>
                <strong>Created Date</strong>
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
                <strong></strong>
              </TableCell>
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>1.</Typography>
              </TableCell>
              <TableCell>
                <Typography>ORDER9876RTS</Typography>
              </TableCell>
              <TableCell>
                <Typography>Delivery Surface</Typography>
              </TableCell>
              <TableCell>
                <Typography>4</Typography>
              </TableCell>
              <TableCell>
                <Typography>H-Block Noida Sector-63, Uttar Pradesh</Typography>
              </TableCell>
              <TableCell>
                <Typography>27-09-2024</Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  <img
                    src="https://www.pngall.com/wp-content/uploads/2/Barcode-PNG-Images.png"
                    style={{ maxWidth: "50%", height: "auto" }}
                    alt="barcode"
                  />
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
  return <div>{renderLabelBox()}</div>;
};

export default ManifestPreview;
