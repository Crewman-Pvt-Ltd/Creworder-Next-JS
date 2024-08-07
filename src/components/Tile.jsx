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

const Tile = ({ type, height, padding }) => {
  const { data: companiesData } = useGetAllCompanies();
  const { data: packagesData } = useGetAllPackages();
  console.log("Fetched companies data:", companiesData);
  console.log("Fetched packages data:", packagesData);

  let title = "";
  let count = 0;
  let IconComponent = null;
  let iconColor = "#000";

  switch (type) {
    case "totalCompanies":
      title = "Total Companies";
      count = companiesData?.length || 0;
      IconComponent = BusinessIcon;
      iconColor = "#724d8c";
      break;
    case "activeCompanies":
      title = "Active Companies";
      count = companiesData?.activeCompanies || 0;
      IconComponent = CheckCircleIcon;
      iconColor = "#28a745";
      break;
    case "suspendedCompanies":
      title = "Suspended Companies";
      count = companiesData?.suspendedCompanies || 0;
      IconComponent = ErrorIcon;
      iconColor = "#dc3545";
      break;
    case "totalPackages":
      title = "Total Packages";
      count = packagesData?.results?.length || 0;
      IconComponent = SettingIcon;
      iconColor = "#000000";
      break;


      case "Running Order":
        title = "Running Order";
        count = "12";
        IconComponent = BusinessIcon;
        iconColor = "#724d8c";
        break;
      case "Pending":
        title = "Pending";
        count = "8";
        IconComponent = CheckCircleIcon;
        iconColor = "#28a745";
        break;
      case "Repeat Order":
        title = "Repeat Order";
        count = "15";
        IconComponent = ErrorIcon;
        iconColor = "#dc3545";
        break;
      case "Rejected":
        title = "Rejected";
        count = "2";
        IconComponent = SettingIcon;
      iconColor = "#000000";
        break;

    case "Running":
      title = "Running";
      count = "12";
      break;
    case "Pending":
      title = "Pending";
      count = "8";
      break;
    case "Accepted":
      title = "Accepted";
      count = "15";
      break;
    case "Rejected":
      title = "Rejected";
      count = "2";
      break;
    case "Repeat":
      title = "Repeat";
      break;
    case "Monthly":
      title = "Monthly";
      count = "2";
      break;
    case "total":
      title = "Total";
      count = "8";
      break;
    case "future":
      title = "Future";
      count = "15";
      break;
    case "noresponse":
      title = "No Response";
      count = "2";
      break;
    case "intransit":
      title = "In Transit";
      count = "2";
      break;
    case "delivered":
      title = "Delivered";
      count = "2";
      break;
    case "In-Transit RTO":
      title = "In-Transit RTO";
      count = "12";
      break;
    case "rto":
      title = "RTO";
      count = "8";
      break;
    case "Non Serviceable":
      title = "Non Serviceable";
      count = "15";
      break;
    case "Reattempt":
      title = "Reattempt";
      count = "2";
      break;
    case "OFD":
      title = "OFD";
      count = "2";
      break;
    case "LOST":
      title = "LOST";
      count = "2";
      break;
    default:
      title = "Unknown";
      count = "0";
      break;
  }

  return (
    <CustomCard>
      <Grid container direction="column" sx={{ height, padding }}>
        <Grid item>
          <Grid container display="flex" justifyContent="space-between">
            <Grid item sx={{ color: "#878a99" }}>
              <Typography fontSize="14px" variant="body2">
                {title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "25px",
                  color: "black",
                  cursor: "pointer",
                  paddingTop: "10px",
                  // textAlign: "center",
                }}
              >
                {count}
              </Typography>
            </Grid>
            <Grid item>
              {IconComponent && (
                <IconComponent sx={{ color: iconColor, fontSize: "50px" }} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CustomCard>
  );
};

export default Tile;
