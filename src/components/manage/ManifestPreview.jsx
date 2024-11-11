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
  const renderHeader = () => (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center the content horizontally
          alignItems: "center",
          mb: 2,
          width: "100%", // Ensure the Box takes up the full width
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="div" fontWeight="bold">
            Logistics Manifest
          </Typography>
          <Typography variant="caption" component="div" mt={1}>
            Generated on: Nov 08, 2024 10:51 AM
          </Typography>
        </Box>
      </Box>
  
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="h5" component="div" fontWeight="bold">
            Crewman Solution
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>
            Basement, H211, H-block,
            <br />
            Sector 63, Noida, Near Lohia Kia Showroom
            <br />
            NOIDA - 201301
          </Typography>
        </Box>
  
        <Box sx={{ textAlign: "right" }}>
          <Typography>Document No.: 202411051051</Typography>
          <Typography>
            Total Shipments to Dispatch: <strong>2</strong>
          </Typography>
          <Typography>
            Total Shipments to Check: <strong>0</strong>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
  

  const renderLabelBox = () => (
    <TableContainer>
      <Table size="large">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "5%" }}>
              <strong>Sr.</strong>
            </TableCell>
            <TableCell sx={{ width: "15%" }}>
              <strong>Order ID</strong>
            </TableCell>
            <TableCell sx={{ width: "10%" }}>
              <strong>Aggregator</strong>
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
            <TableCell sx={{ width: "20%" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>1.</Typography>
            </TableCell>
            <TableCell>
              <Typography>ORDER9876RTS</Typography>
            </TableCell>
            <TableCell>
              <Typography>ShipRocket</Typography>
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
  );

  const renderFooter = () => (
    <Box sx={{ mt: 4, paddingTop: 2 }}>
      <Box sx={{ borderTop: "1px dashed #000", mb: 2 }}></Box>
  
      <Typography variant="subtitle1" align="center" fontWeight="bold">
        TO BE FILLED BY LOGISTICS EXECUTIVE
      </Typography>
  
      <Box sx={{ borderBottom: "1px dashed #000", mt: 2 }}></Box>
  
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Box>
          <Typography>Pickup In time: ___________________</Typography>
          <Typography>Pickup Out time: __________________</Typography>
          <Typography>FE Name: _________________________</Typography>
          <Typography>FE Signature: ____________________</Typography>
        </Box>
        <Box>
          <Typography>Total items picked: ____________</Typography>
          <Typography>All shipments have Brand packaging:</Typography>
          <Typography display="inline">Yes □</Typography> &nbsp;&nbsp;
          <Typography display="inline">No □</Typography>
          <Typography>
            Seller Name: <strong>CREWMANSOLUTION</strong>
          </Typography>
          <Typography>Seller Signature: ___________________</Typography>
        </Box>
      </Box>
  
      
      <Typography variant="caption" align="center" sx={{ mt: 0.5 }}>
        Orders processed through CrewOrder.com
      </Typography>
  
   
      <Box sx={{ textAlign: "right"}}>
        <Typography variant="caption" >
          This is a system generated document Page 1 of 1
        </Typography>
      </Box>
    </Box>
  );
  

  return (
    <Box
      sx={{
        border: "2px solid #000",
        padding: 2,
        // bgcolor: "#f9f9f9",
        maxWidth: "100%",
      }}
    >
      {renderHeader()}
      {renderLabelBox()}
      {renderFooter()}
    </Box>
  );
};

export default ManifestPreview;
