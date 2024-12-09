import React from "react";
import {
  Grid,
  Switch,
  Checkbox,
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  IconButton,
  TableBody,
  Button,
} from "@mui/material";
import CustomCard from "../CustomCard";
import { Poppins } from "next/font/google";
import { CheckBox } from "@mui/icons-material";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const EmailAndSMSCommunication = () => {
  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <Grid container spacing={2} p={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              <Typography
                className={poppins.className}
                sx={{
                  fontSize: "14px",
                }}
              >
                Hide Product Name & Image
              </Typography>
              <Switch></Switch>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                className={poppins.className}
                sx={{
                  color: "gray",
                  fontSize: "12px",
                }}
              >
                Turn the toggle on if you don't want the product name or image
                to appear in the email or SMS. This setting is recommended for
                sellers who sell products related to health, wellness, personal
                care, and other similar categories.
              </Typography>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <Grid container spacing={2} p={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              <Typography
                className={poppins.className}
                sx={{
                  fontSize: "14px",
                }}
              >
                Hide Product Price For Prepaid Orders
              </Typography>
              <Switch></Switch>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                className={poppins.className}
                sx={{
                  color: "gray",
                  fontSize: "12px",
                }}
              >
                Turn the toggle on if you don't want product price to appear in
                the email or SMS. This setting is recommended for sellers whose
                prepaid orders are mostly gift orders.
              </Typography>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <CustomCard>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                className={poppins.className}
                sx={{
                  fontWeight: 500,
                }}
              >
                Email
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                className={poppins.className}
                sx={{
                  color: "gray",
                  fontSize: "12px",
                }}
              >
                Choose when to send out emails. Only one email will be sent out
                for every delivery status to avoid spamming
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow
                      style={{
                        backgroundColor: "#f4f7fd",
                      }}
                    >
                      <TableCell className={poppins.className}>
                        Order Stage
                      </TableCell>
                      <TableCell className={poppins.className}>Email</TableCell>

                      <TableCell className={poppins.className} align="right">
                        <IconButton aria-label="toggle table body"></IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell className={poppins.className}>
                        Packed
                      </TableCell>
                      <TableCell className={poppins.className}>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="view"
                          sx={{ color: "green" }}
                        ></IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <CustomCard>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                className={poppins.className}
                sx={{
                  fontWeight: 500,
                }}
              >
                SMS
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                className={poppins.className}
                sx={{
                  color: "gray",
                  fontSize: "12px",
                }}
              >
                Choose when to send out smses. Only one sms will be sent out for
                every delivery status to avoid spamming
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow
                      style={{
                        backgroundColor: "#f4f7fd",
                      }}
                    >
                      <TableCell className={poppins.className}>
                        Order Stage
                      </TableCell>
                      <TableCell className={poppins.className}>SMS</TableCell>

                      <TableCell className={poppins.className} align="right">
                        <IconButton aria-label="toggle table body"></IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell className={poppins.className}>
                        Packed
                      </TableCell>
                      <TableCell className={poppins.className}>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="view"
                          sx={{ color: "green" }}
                        ></IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
      <Grid item xs={12} sm={12} md={12} display="flex" justifyContent="center">
        <Button
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor:"#405189",
            color:"white",
            textTransform:"none",
          }}
        >
          Save Details
        </Button>
      </Grid>
    </Grid>
  );
};

export default EmailAndSMSCommunication;
