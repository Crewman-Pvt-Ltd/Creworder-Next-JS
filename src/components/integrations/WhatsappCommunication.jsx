import React, { useState } from "react";
import CustomCard from "../CustomCard";
import {
  Grid,
  Typography,
  Divider,
  InputAdornment,
  Link,
  Button,
  Card,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Checkbox,
  IconButton,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import View from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Poppins } from "next/font/google";
import { CheckBox } from "@mui/icons-material";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const WhatsappCommunication = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setSelectedItems(isChecked ? data.map((item) => item.id) : []);
  };

  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    setSelectedItems((prevSelectedItems) =>
      isChecked
        ? [...prevSelectedItems, id]
        : prevSelectedItems.filter((itemId) => itemId !== id)
    );
  };

  // Example data - replace with your actual data source
  const data = [
    { id: 1, status: "Packed" },
    { id: 2, status: "Shipped" },
  ];
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        m={3}
        sx={{
          backgroundColor: "white",
          borderRadius: "6px",
        }}
      >
        <Typography
          className={poppins.className}
          sx={{
            padding: 1,
            fontWeight: 500,
            fontSize: "20px",
          }}
        >
          Whatsapp Comunication
        </Typography>
      </Grid>

      {/* <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography>Whatsapp Communication</Typography>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid> */}

      <Grid item xs={12} sm={12} md={12} m={2}>
        <CustomCard>
          <Grid container spacing={2} p={3}>
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: "#f4f7fd",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography
                        className={poppins.className}
                        sx={{
                          fontWeight: "600",
                          fontSize: "24px",
                        }}
                      >
                        Introducing WhatsApp Communication
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography
                        className={poppins.className}
                        sx={{
                          fontWeight: "400",
                          fontSize: "15px",
                        }}
                      >
                        Send Live Updates to your buyers with 93% read rate.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={poppins.className}>
                        <span
                          style={{
                            color: "blue",
                            fontWeight: "600",
                            fontSize: "24px",
                          }}
                        >
                          ₹0.99
                        </span>
                        <span> per message</span>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                      <Button
                        sx={{
                          backgroundColor: "#71c44d",
                          color: "white",
                          width: "25%",
                          "&:hover": {
                            backgroundColor: "#71c44d",
                            color: "white",
                          },
                        }}
                      >
                        <CheckCircleIcon
                          sx={{
                            fontSize: "16px",
                          }}
                        />
                        Activate
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography
                        className={poppins.className}
                        sx={{
                          color: "gray",
                          fontSize: "12px",
                        }}
                      >
                        *Note: Customize real-time tracking updates to share
                        with your buyers, per status just @ ₹0.99. To avail all
                        statuses, pay just ₹6.93 per order. By default, all
                        statuses will be selected. (Prices are exclusive of GST
                        & non-refundable.)
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{
                    display: "flex",

                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://app.shiprocket.in/app/img/whatsapp-communication/whatsapp-header.png"
                    alt="WhatsApp Communication"
                    style={{ width: "70%", height: "100%" }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12} mt={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography
                    className={poppins.className}
                    sx={{
                      fontWeight: "600",
                      fontSize: "18px",
                    }}
                  >
                    How is Whatsapp Communication helping you?
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Grid container spacing={2} p={4}>
                    <Grid item xs={12} sm={4} md={4}>
                      <img
                        src="https://app.shiprocket.in/app/img/whatsapp-communication/smiley-icon.svg"
                        alt="Smiley Icon"
                        style={{ width: "70px", height: "70px" }}
                      />
                      <Typography
                        className={poppins.className}
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        Increase customer delight as we send real-time
                        information to the buyer
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <img
                        src="https://app.shiprocket.in/app/img/whatsapp-communication/ship-icon.svg"
                        alt="Ship Icon"
                        style={{ width: "70px", height: "70px" }}
                      />
                      <Typography
                        className={poppins.className}
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        With Brand Information, make the delivery <br />
                        easy and on time.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <img
                        src="https://app.shiprocket.in/app/img/whatsapp-communication/call-icon.svg"
                        alt="Call Icon"
                        style={{ width: "70px", height: "70px" }}
                      />
                      <Typography
                        className={poppins.className}
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        Decrease in customer queries due to increase in
                        visibility of shipment information
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              mt={2}
              sx={{
                backgroundColor: "#f4f7fd",
                padding: 2,
                borderRadius: "18px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <Card
                    sx={{
                      borderRadius: "18px",
                      padding: 2,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <img
                          src="https://app.shiprocket.in/app/img/whatsapp-communication/whatsapp-number-graphic.svg"
                          alt="WhatsApp Number Graphic"
                          style={{ width: "80%", height: "auto" }}
                        />
                      </Grid>
                      <Grid item xs={6} display="flex" justifyContent="center">
                        <img
                          src="https://app.shiprocket.in/app/img/whatsapp-communication/circles-design.svg"
                          alt="Circles Design"
                          style={{ width: "40%", height: "auto" }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          className={poppins.className}
                          sx={{
                            fontWeight: "600",
                            fontSize: "20px",
                            marginBottom: "8px",
                          }}
                        >
                          Experience Yourself!
                        </Typography>
                        <Typography
                          className={poppins.className}
                          sx={{
                            color: "gray",
                            fontSize: "12px",
                            marginBottom: "16px",
                          }}
                        >
                          Enter your number to experience live tracking updates
                          on WhatsApp.
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          fullWidth
                          type="number"
                          placeholder="Enter 10 digit mobile number"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                +91
                              </InputAdornment>
                            ),
                            inputProps: {
                              min: 0,
                              max: 9999999999,
                              step: 1,
                              pattern: "[0-9]*",
                            },
                          }}
                          sx={{
                            "& .MuiInputBase-input": {
                              height: "40px",
                              padding: "0 14px",
                              boxSizing: "border-box",
                            },
                          }}
                          onInput={(e) => {
                            const value = e.target.value;
                            if (value.length > 10) {
                              e.target.value = value.slice(0, 10);
                            }
                          }}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <Button
                          fullWidth
                          sx={{
                            backgroundColor: "#285fdb",
                            color: "white",
                            height: "100%",
                            borderRadius: "8px",
                            textTransform: "none",
                            "&:hover": {
                              backgroundColor: "#285fdb",
                              color: "white",
                            },
                          }}
                        >
                          Get Demo Message
                          <ArrowForwardIosIcon
                            sx={{
                              fontSize: "15px",
                              marginLeft: "5px",
                            }}
                          />
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Card
                    sx={{
                      borderRadius: "18px",
                      padding: 2,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          className={poppins.className}
                          sx={{
                            fontWeight: "600",
                            fontSize: "20px",
                            marginBottom: "8px",
                          }}
                        >
                          Pricing Details
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        m={1}
                        sx={{
                          backgroundColor: "#ecf9ef",
                          color: "#27c24c",
                          padding: 2,
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          className={poppins.className}
                          sx={{ fontSize: "14px" }}
                        >
                          Cost per message ₹0.99*
                        </Typography>
                        <Typography
                          className={poppins.className}
                          sx={{ fontSize: "14px" }}
                        >
                          ₹0.99*
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12}>
                        <Typography
                          className={poppins.className}
                          sx={{
                            color: "#285fdb",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          Offerings
                        </Typography>
                        <Grid container spacing={1} alignItems="center">
                          <Grid item xs={12}>
                            <Typography
                              className={poppins.className}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "14px",
                              }}
                            >
                              <CheckCircleOutlineIcon
                                sx={{ marginRight: "2px", fontSize: "14px" }}
                              />
                              Customise no. of messages
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              className={poppins.className}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "14px",
                              }}
                            >
                              <CheckCircleOutlineIcon
                                sx={{ marginRight: "2px", fontSize: "14px" }}
                              />
                              Pay per message
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              className={poppins.className}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "14px",
                              }}
                            >
                              <CheckCircleOutlineIcon
                                sx={{ marginRight: "2px", fontSize: "14px" }}
                              />
                              At low prices
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <Button
                          sx={{
                            backgroundColor: "#71c44d",
                            color: "white",
                            width: "100%",
                            textTransform: "none",
                            "&:hover": {
                              backgroundColor: "#71c44d",
                              color: "white",
                            },
                          }}
                        >
                          <CheckCircleIcon
                            sx={{
                              marginRight: "6px",
                              fontSize: "16px",
                            }}
                          />
                          Activate
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <Typography
                          className={poppins.className}
                          sx={{ fontWeight: "500", fontSize: "14px" }}
                        >
                          If you want to deactivate the plan,{" "}
                          <Link
                            href="/deactivate"
                            underline="none"
                            color="primary"
                            sx={{ fontWeight: "500" }}
                          >
                            click here
                          </Link>
                          .
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12} mt={2}>
              <Typography
                className={poppins.className}
                sx={{
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#405189",
                }}
              >
                Select Shipment Status for Whatsapp Communication
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} mt={2} mb={3}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow
                      style={{
                        backgroundColor: "#f4f7fd",
                        borderRadius: "8px",
                      }}
                    >
                      <TableCell className={poppins.className}>
                        Shipment Status
                      </TableCell>
                      <TableCell className={poppins.className}>
                        Select
                        <Checkbox
                          checked={selectAll}
                          onChange={handleSelectAllChange}
                        />
                      </TableCell>
                      <TableCell className={poppins.className}>
                        Preview
                      </TableCell>
                      <TableCell className={poppins.className} align="right">
                        <IconButton
                          onClick={handleToggle}
                          aria-label="toggle table body"
                        >
                          <KeyboardArrowDownIcon
                            sx={{
                              transform: open
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s",
                            }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {open && (
                    <TableBody>
                      {data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className={poppins.className}>
                            {item.status}
                          </TableCell>
                          <TableCell className={poppins.className}>
                            <Checkbox
                              checked={selectedItems.includes(item.id)}
                              onChange={(event) =>
                                handleRowCheckboxChange(event, item.id)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="view"
                              sx={{ color: "green" }}
                            >
                              <View />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              display="flex"
              justifyContent="end"
            >
              <Button
                sx={{
                  backgroundColor: "#405189",
                  color: "white",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#405189",
                    color: "white",
                  },
                }}
              >
                Save Details
              </Button>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default WhatsappCommunication;
