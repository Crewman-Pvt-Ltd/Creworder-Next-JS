import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CardMedia,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  Divider,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Switch,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  StepConnector,
  Icon,
} from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import useGetAllOrders from "@/api-manage/react-query/useGetAllOrders";
import { useRouter } from "next/router";
import RoomIcon from "@mui/icons-material/Room";
import CancelIcon from "@mui/icons-material/Cancel";
import LockIcon from "@mui/icons-material/Lock";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GiftIcon from "@mui/icons-material/CardGiftcard";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  Padding,
  Margin,
} from "@mui/icons-material";
import CustomCard from "../CustomCard";
import { Poppins } from "next/font/google";
import CustomTextField from "../CustomTextField";
import CustomLabel from "../CustomLabel";
import CreateIcon from "@mui/icons-material/Create";
import creworder from "../../images/crewordericon.png";
import PaymentIcon from "@mui/icons-material/Payment";
import Image from "next/image";
import { px } from "framer-motion";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const steps = [
  {
    icon: <LockIcon />,
    status: "Order Placed",
    date: "Wed, 15 Dec 2021",
    description: [
      "An order has been placed.",
      "Wed, 15 Dec 2021 - 05:34PM",
      "Seller has processed your order.",
      "Thu, 16 Dec 2021 - 5:48AM",
    ],
  },
  {
    icon: <GiftIcon />,
    status: "Packed",
    date: "Thu, 16 Dec 2021",
    description: [
      "Your item has been picked up by courier partner",
      "Fri, 17 Dec 2021 - 9:45AM",
    ],
  },
  {
    icon: <LocalShippingIcon />,
    status: "Shipping",
    date: "Thu, 16 Dec 2021",
    description: [
      "RQK Logistics - MFDS1400457854",
      "Your item has been shipped.",
      "Sat, 18 Dec 2021 - 4:54PM",
    ],
  },
  {
    icon: <LocalShippingIcon />,
    status: "Out For Delivery",
    date: "",
    description: [],
  },
  {
    icon: <CheckCircleIcon />,
    status: "Delivered",
    date: "",
    description: [],
  },
];

const OrderDetails = () => {
  const { data, refetch } = useGetAllOrders();
  const router = useRouter();
  const { Id } = router.query;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const rows = [
    {
      id: 1,
      image:
        "https://gummsi.com/cdn/shop/products/product-521132.jpg?v=1707203880&width=620",
      name: "Gummsi Gummies",
      color: "Pink",
      size: "M",
      itemPrice: "₹119.99",
      quantity: 2,
      rating: 5,
      totalAmount: "₹239.98",
    },
    
  ];
  useEffect(() => {
    if (data?.Data && Id) {
      const order = data.Data.find((row) => row.id === parseInt(Id));
      setSelectedOrder(order);
    }
  }, [data, Id]);
  if (!selectedOrder) {
    return <Typography variant="h6">Order not found or loading...</Typography>;
  }

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12} md={3} sm={3}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Image src={creworder} alt="creworder" />
            <Typography variant="h6" fontWeight="bold">
              Personal Information
            </Typography>
            <Typography variant="body2" padding={1}>
              <b>Name:</b> {selectedOrder.customer_name}
            </Typography>
            <Typography variant="body2" padding={1}>
              <b>Father's Name:</b> {selectedOrder.customer_parent_name}
            </Typography>
            <Typography variant="body2" padding={1}>
              <b>Contact:</b> {selectedOrder.customer_phone}
            </Typography>
            <Typography variant="body2" padding={1}>
              <b>Email:</b> {selectedOrder.customer_email}
            </Typography>
          </CardContent>
          <CardActions>
            <div>
              <Button
                className={poppins.className}
                startIcon={<RoomIcon />}
                sx={{
                  marginRight: 1,
                  fontSize: "11px",
                  backgroundColor: "#dff0fa",
                }}
              >
                NDR
              </Button>
              <Button
                className={poppins.className}
                color="error"
                startIcon={<CancelIcon />}
                sx={{
                  marginRight: 1,
                  fontSize: "11px",
                  backgroundColor: "#fde8e4",
                }}
              >
                Account
              </Button>
              <Button
                className={poppins.className}
                startIcon={<CreateIcon />}
                sx={{
                  fontSize: "11px",
                  backgroundColor: "#dff0fa",
                }}
              >
                Edit
              </Button>
            </div>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={9} md={9} sm={9}>
      <CustomCard>
        <CardContent>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab icon={ <LocalMallIcon/> } style={{ display: "inline", textTransform: "capitalize" }} className={poppins.className} label="Product Information" />
            <Tab icon={ <DirectionsRunIcon/> } style={{ display: "inline", textTransform: "capitalize" }} className={poppins.className} label="Customer Information" />
            <Tab icon={ <LocalShippingIcon/> } style={{ display: "inline", textTransform: "capitalize" }} className={poppins.className} label="Status Tracking" />
            <Tab icon={ <PaymentIcon/> } style={{ display: "inline", textTransform: "capitalize" }} className={poppins.className} label="Payment Status" />
          </Tabs>
          <Divider sx={{ my: 2 }} />
          {activeTab === 0 && (
            <Box>
              <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold">Order Summary</Typography>
            <TableContainer  sx={{ maxHeight: 900}} >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                  <TableCell>Images</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Item Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {selectedOrder.product_details.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img 
                          src="https://gummsi.com/cdn/shop/products/product-521132.jpg?v=1707203880&width=620" 
                          style={{ width: "100px" }} 
                        />
                      </TableCell>
                      <TableCell>{item.product_name}</TableCell>
                      <TableCell>₹{selectedOrder.gross_amount}</TableCell>
                      <TableCell>{item.product_qty}</TableCell>                     
                      <TableCell>₹{item.product_price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Grid container justifyContent="flex-end">
                  <Grid item xs={6}>
                    <Box p={2} bgcolor="background.paper" borderRadius={1}>
                      <Grid container justifyContent="space-between" mb={1}>
                        <Typography>Sub Total :</Typography>
                        <Typography style={{marginRight: 35}}>₹{selectedOrder.total_amount}</Typography>
                      </Grid>
                      <Grid container justifyContent="space-between" mb={1}>
                        <Typography>
                          Discount :
                        </Typography>
                        <Typography style={{marginRight: 35}}>-₹{selectedOrder.discount}</Typography>
                      </Grid>
                      <Grid container justifyContent="space-between" mb={1}>
                        <Typography>Shipping Charge :</Typography>
                        <Typography style={{marginRight: 35}}>₹{selectedOrder.shipping_charges}</Typography>
                      </Grid>
                      <Grid container justifyContent="space-between" mb={1}>
                        <Typography>Estimated Tax :</Typography>
                        <Typography style={{marginRight: 35}}>₹{selectedOrder.taxeble_amount}</Typography>
                      </Grid>
                      <Divider sx={{ my: 2 }} />
                      <Grid container justifyContent="space-between" fontWeight="bold">
                        <Typography>Total (USD) :</Typography>
                        <Typography style={{marginRight: 35}}>₹{selectedOrder.total_amount}</Typography>
                      </Grid>
                    </Box>
                  </Grid>
                  
                </Grid>
                </TableContainer>
                </Grid>
              </Grid>
          </Box>
          )}
          {activeTab === 1 && (
            <Grid container spacing={2}>  
              <Grid item md={6} >   
              <Card sx={{ mb: 2 }}>
                <CardContent>   
                <Typography variant="h6" fontWeight="bold">Personal Information</Typography>
                  <Typography variant="body2" padding={1}><b>Name:</b> Rahul Kumar</Typography> 
                  <Typography variant="body2" padding={1}><b>Father's Name:</b> </Typography>
                  <Typography variant="body2"padding={1}><b>Alternate Contact:</b> +91- 9876543210</Typography>
                  <Typography variant="body2"padding={1}><b>Email:</b> rahul.kumar@crewman.in</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={6}>   
              <Card sx={{ mb: 2 }}>
                <CardContent>  
                <Typography variant="h6" fontWeight="bold">Address Information</Typography>
                <Typography variant="body2" padding={1}><b>Address:</b> Sector 63, Noida</Typography>
                <Typography variant="body2" padding={1}><b>PostalCode:</b> 201304</Typography>
                <Typography variant="body2" padding={1}><b>City:</b> Noida</Typography>
                <Typography variant="body2" padding={1}><b>State:</b> Uttar Pradesh</Typography>
                </CardContent>
              </Card>
            </Grid>
           </Grid>
          )}

          {activeTab === 2 && (
             <Box>
             <Grid container spacing={2} sx={{ padding: 2 }}>
               <Grid
                 item
                 xs={12}
                 container
                 justifyContent="space-between"
                 alignItems="center"
               >
                 <Typography
                   sx={{
                     fontSize: "15px",
                     color: "#495057",
                     fontWeight: "600",
                   }}
                 >
                   Order Status
                 </Typography>               
               </Grid>
     
               <Grid item xs={12}>
                 <Stepper
                   activeStep={steps.length}
                   orientation="vertical"
                   connector={<StepConnector sx={{ borderLeft: "2px solid #00A884", minHeight: "30px" }} />}
                 >
                   {steps.map((step, index) => (
                     <Step key={index} active>
                       <StepLabel
                         StepIconComponent={() => (
                           <Icon sx={{ color: "#00A884"}} >{step.icon}</Icon>
                         )}
                       >
                         <Typography
                           variant="body1"
                           fontWeight="bold"
                           sx={{ fontSize: "15px", color: "#495057" }}
                         >
                           {step.status}
                           {step.date && (
                             <Box
                               component="span"
                               sx={{
                                 fontWeight: "500",
                                 fontSize: "13px",
                                 color: "gray",
                                 marginLeft: 1,
                               }}
                             >
                               - {step.date}
                             </Box>
                           )}
                         </Typography>
                       </StepLabel>
                       <StepContent>
                         {step.description.map((text, idx) => (
                           <Typography
                             variant="body2"
                             color="textSecondary"
                             key={idx}
                           >
                             {text}
                           </Typography>
                         ))}
                       </StepContent>
                     </Step>
                   ))}
                 </Stepper>
               </Grid>
             </Grid>
           </Box>
          )}

         {activeTab === 3 && (
            <Box>
             <Grid container spacing={2}>  
              <Grid item md={6} >   
              <Card sx={{ mb: 2, border: '1px solid #ffc107', position: 'relative' }}>
              {/* Payment Status Label */}
              <Box 
                sx={{ 
                  marginTop: '15px',
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  backgroundColor: '#ffc107', 
                  color: '#000', 
                  padding: '4px 8px', 
                  borderTopLeftRadius: '4px', 
                  borderBottomRightRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                PAYMENT PENDING
              </Box>              
              <CardContent>
                {/* Date */}
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 1, marginTop: '30px' }}>
                  2024-08-31 16:37:27
                </Typography>

                {/* Marked By */}
                <Typography sx={{ fontSize: '14px', color: '#6c757d', mb: 0.5 }}>
                  <strong>Marked By:</strong> Ajay
                </Typography>

                {/* Remark */}
                <Typography sx={{ fontSize: '14px', color: '#6c757d' }}>
                  <strong>Remark:</strong>
                </Typography>
              </CardContent>
            </Card>
            </Grid>
            </Grid>
            </Box>
          )}
        </CardContent>
      </CustomCard>
      </Grid>
    </Grid>
  );
};

export default OrderDetails;
