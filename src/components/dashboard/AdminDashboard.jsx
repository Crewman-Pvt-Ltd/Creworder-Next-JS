import React from "react";
import { Grid, Typography } from "@mui/material";
import Tile from "../Tile";
import Chartone from "../Chartone";
import BestSellingProducts from "../BestSellingProducts";
import TopSellers from "../TopSellers";
import RecentOrders from "../RecentOrders";
import StoresVisitBySource from "../StoresVisitBySource";
import AllTypeUsers from "../AllTypeUsers";
import InvoicesChart from "../InvoicesChart";
import Charttwo from "../Charttwo";
import ReferalInvite from "../ReferalInvite";
import ChartThree from "../ChartThree";
import UpgradeAccount from "../UpgradeAccount";
import ScheduleOrderChart from "../ScheduleOrderChart";
const AdminDashboard = () => {
  const tilesTypes = ["Running Order", "Pending", "Repeat Order", "Rejected"];
  const tiles = [
    "Running",
    "intransit",
    "Accepted",
    "noresponse",
    "total",
    "future",
    "noresponse",
    "intransit",
    "delivered",
    "rto",
  ];
  const typetiles = [
    "Running",
    "intransit",
    "Accepted",
    "noresponse",
    
  ];
  return (
    <Grid
      container
      direction="column"
      spacing={3}
      sx={{
        padding: 2,
      }}
    >
      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5}>
            <Grid container spacing={3}>
              <Grid item>
                <UpgradeAccount />
              </Grid>
              {tilesTypes.map((type, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <Tile height="130px" padding="20px 20px" type={type} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <InvoicesChart />
          </Grid>
          <Grid item xs={12} md={3} sm={12}>
            <Charttwo />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={0}>
          {tiles.map((type, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index} mt={1}>
              <Tile height="120px" padding="20px 20px" type={type} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5}>
            <Grid container spacing={1}>
              
              {typetiles.map((type, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <Tile height="130px" padding="20px 20px" type={type} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={3} sm={12}>
            <ScheduleOrderChart />
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <ReferalInvite />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5}>
            <ChartThree />
          </Grid>
          <Grid item xs={12} md={7} sm={12}>
            <TopSellers />
          </Grid>
         
        </Grid>
      </Grid>

     
    </Grid>
  );
};

export default AdminDashboard;


























// import React from "react";
// import { Grid, Typography } from "@mui/material";
// import Tile from "../Tile";
// import Chartone from "../Chartone";
// import BestSellingProducts from "../BestSellingProducts";
// import TopSellers from "../TopSellers";
// import RecentOrders from "../RecentOrders";
// import StoresVisitBySource from "../StoresVisitBySource";
// import AllTypeUsers from "../AllTypeUsers";
// import InvoicesChart from "../InvoicesChart";
// const AdminDashboard = () => {
//   const tilesTypes = [
//     "Running",
//     "Pending",
//     "Accepted",
//     "Rejected",
//     "Repeat",
//     "Monthly",
//     "total",
//     "future",
//     "noresponse",
//     "intransit",
//     "delivered",
//     "In-Transit RTO",
//     "rto",
//     "Non Serviceable",
//     "Reattempt",
//     "OFD",
//     "LOST",
//     "Pending",
//   ];
//   return (
//     <Grid
//       container
//       direction="column"
//       spacing={3}
//       sx={{
//         padding: 2,
//       }}
//     >
//       <Grid item>
//         <Typography
//           sx={{
//             fontSize: "16px",
//             fontWeight: "600",
//             margin: 0,
//             color: "#495057",
//           }}
//         >
//           Welcome Admin!
//         </Typography>
//         <Typography
//           sx={{
//             fontSize: "13px",
//             color: "gray",
//             margin: 0,
//             paddingTop: 0,
//           }}
//         >
//           Here's what's happening with your store today.
//         </Typography>
//       </Grid>

//       <Grid item>
//         <Grid container spacing={1}>
//           {tilesTypes.map((type, index) => (
//             <Grid item xs={12} sm={6} md={2} key={index}>
//               <Tile padding="10px 10px" type={type} />
//             </Grid>
//           ))}
//         </Grid>
//       </Grid>

//       <Grid item>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4} sm={12}>
//             <StoresVisitBySource />
//           </Grid>
//           <Grid item xs={12} md={8} sm={12}>
//             <RecentOrders />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={6}>
//             <BestSellingProducts />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TopSellers />
//           </Grid>
//         </Grid>
//       </Grid>

//       <Grid item>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={6}>
//           <InvoicesChart /> 
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <AllTypeUsers />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={8}>
//           <Chartone />
//           </Grid>
//           <Grid item xs={12} md={4}></Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default AdminDashboard;
