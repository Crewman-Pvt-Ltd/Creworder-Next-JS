import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  SettingsApplications as SettingIcon,
  DirectionsRun as DirectionsRunIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Cancel as CancelIcon,
  Loop as LoopIcon,
  DateRange as DateRangeIcon,
} from "@mui/icons-material";
import useGetAllCompanies from "@/api-manage/react-query/useGetAllCompanies";
import CustomCard from "./CustomCard";
import useGetAllPackages from "@/api-manage/react-query/useGetAllPackages";
import { image as themeImage } from "@nextui-org/theme";

  const Tile = ({ type, height, padding }) => {
  const { data: companiesData } = useGetAllCompanies();
  const { data: packagesData } = useGetAllPackages();
 
  let title = "";
  let count = 0;
  let IconComponent = null;
  let iconColor = "#000";
  let imageUrl;

  switch (type) {
    case "totalCompanies":
      title = "Total Companies";
      count = companiesData?.length || 0;
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "activeCompanies":
      title = "Active Companies";
      count = companiesData?.activeCompanies || 0;
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "suspendedCompanies":
      title = "Suspended Companies";
      count = companiesData?.suspendedCompanies || 0;
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "totalPackages":
      title = "Total Packages";
      count = packagesData?.results?.length || 0;
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "Running Order":
        title = "Running Order";
        count = "12";
        imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
        break;
    case "Pending":
        title = "Pending";
        count = "8";
        imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
        break;
    case "Repeat Order":
        title = "Repeat Order";
        count = "15";
        imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
        break;
    case "Rejected":
        title = "Rejected";
        count = "2";
        imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
        break;

    case "Running":
      title = "Running";
      count = "12";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "Pending":
      title = "Pending";
      count = "8";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "Accepted":
      title = "Accepted";
      count = "15";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "Rejected":
      title = "Rejected";
      count = "2";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "Repeat":
      title = "Repeat";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "Monthly":
      title = "Monthly";
      count = "2";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "total":
      title = "Total";
      count = "8";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "future":
      title = "Future";
      count = "15";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "noresponse":
      title = "No Response";
      count = "2";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "intransit":
      title = "In Transit";
      count = "2";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "delivered":
      title = "Delivered";
      count = "2";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "In-Transit RTO":
      title = "In-Transit RTO";
      count = "12";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "rto":
      title = "RTO";
      count = "8";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "Non Serviceable":
      title = "Non Serviceable";
      count = "15";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "Reattempt":
      title = "Reattempt";
      count = "2";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "OFD":
      title = "OFD";
      count = "2";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "LOST":
      title = "LOST";
      count = "2";
      imageUrl  = "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    default:
      title = "Unknown";
      count = "0";
      break;
  }
  return (
    <CustomCard>
      <Grid container direction="column" sx={{ height, padding}}>
        <Grid item>
          <Grid container display="flex" justifyContent="space-between">
            <Grid item sx={{ color: "#878a99" }} >
              <Typography fontSize="14px">
                {title}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "25px",
                  color: "black",
                  cursor: "pointer",
                  paddingTop: "10px",
                }}>
                {count} 
              </Typography>
            </Grid>
            <Grid item>
            <img src={imageUrl } 
                 alt={title} 
                 style={{ width: "60px", height: "60px", marginRight: "8px" }}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CustomCard>
  );
};

export default Tile;
