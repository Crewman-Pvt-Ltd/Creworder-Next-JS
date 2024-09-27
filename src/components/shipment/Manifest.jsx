import React, { useState } from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
  Button,
  Toolbar,
  Tooltip,
} from "@mui/material";
import CustomCard from "../CustomCard";
import { Poppins } from "next/font/google";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useRouter } from "next/router";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const Manifest = () => {
  const router = useRouter();

  // Sample rows data
  const rows = [
    {
      id: 1,
      manifest_id: "MANIFEST987",
      created_at: "2024-08-27",
      order: "4",
      courier: "Delhivery Surface",
      product: "Weight loss",
      amount: "2024",
      status: "Pending",
      payment_mode: "COD",
      awb: "AWBNMBR98334433",
      order_date: "2024-08-01",
      action: "Edit",
    },
  ];

  // State for selected rows
  const [selectedRows, setSelectedRows] = useState([]);

  // Toggle selection for a single row
  const handleRowSelect = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle select all checkbox
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(rows.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Check if a specific row is selected
  const isRowSelected = (id) => selectedRows.includes(id);

  // Print label for selected orders
  const handlePrintLabel = () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one row to print the label."); // Alert if no rows are selected
      return;
    }
    const selectedRowsData = rows.filter((row) => selectedRows.includes(row.id));
    const url = `/admin/shipment/LabelPreviewPage?selectedRows=${JSON.stringify(selectedRowsData)}`; // Prepare URL with selected rows
    window.open(url, "_blank"); // Open in a new tab
  };

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}>
        {/* Top Action Bar */}
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#f5f5f5",
            padding: "10px",
          }}
             >
          <Typography
            sx={{ fontWeight: "600", fontSize: "18px", whiteSpace: "nowrap" }}
          >
            {selectedRows.length} selected
          </Typography>
          <div>   
            <Tooltip title="Print Label">
              <Button
                startIcon={<PrintIcon />}
                sx={{ marginRight: "10px", backgroundColor: "white", border: "2px solid #405189", padding: "8px 16px" }}
                onClick={handlePrintLabel} // Print Label onClick event
              >
                Print Label
              </Button>
            </Tooltip>
            <Tooltip title="Print Invoice">
              <Button
               
                startIcon={<PrintIcon />}
                sx={{ marginRight: "10px", backgroundColor: "white", border: "2px solid #405189", padding: "8px 16px" }}
              >
                Print Invoice
              </Button>
            </Tooltip>
            
          </div>
        </Toolbar>

        <CustomCard>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              maxHeight: "400px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "20px",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
                color: "black",
                margin: "20px",
              }}
            >
              Manifest
            </Typography>
            

            {/* Table */}
            <TableContainer
              component={Paper}
              sx={{ overflowY: "auto", maxHeight: "340px" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        indeterminate={
                          selectedRows.length > 0 &&
                          selectedRows.length < rows.length
                        }
                        checked={selectedRows.length === rows.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell className="tablehead">Sr.</TableCell>
                    <TableCell className="tablehead">Manifest ID</TableCell>
                    <TableCell className="tablehead">Created Date</TableCell>
                    <TableCell className="tablehead">Courier</TableCell>
                    <TableCell className="tablehead">Product</TableCell>
                    <TableCell className="tablehead">Payment Amount</TableCell>
                    <TableCell className="tablehead">Payment Mode</TableCell>
                    <TableCell className="tablehead">AWB</TableCell>
                    <TableCell className="tablehead">Order Date</TableCell>
                    <TableCell className="tablehead">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      selected={isRowSelected(row.id)}
                      sx={{
                        "&.Mui-selected": { backgroundColor: "#e0e0e0" },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isRowSelected(row.id)}
                          onChange={() => handleRowSelect(row.id)}
                        />
                      </TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.manifest_id}</TableCell>
                      <TableCell>{row.created_at}</TableCell>                     
                      <TableCell>{row.courier}</TableCell>
                      <TableCell>₹{row.amount}</TableCell>
                      <TableCell>{row.payment_mode}</TableCell>
                      <TableCell>{row.awb}</TableCell>
                      <TableCell>{row.order_date}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton>
                            <EditIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default Manifest;
