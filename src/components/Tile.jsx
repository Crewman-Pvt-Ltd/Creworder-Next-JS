import React from "react";
import { Grid, Typography } from "@mui/material";
import { 
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  SettingsApplications as SettingIcon
} from "@mui/icons-material";
import useGetAllCompanies from "@/api-manage/react-query/useGetAllCompanies";
import CustomCard from "./CustomCard";
import useGetAllPackages from "@/api-manage/react-query/useGetAllPackages";

const Tile = ({ type }) => {
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
      count = packagesData?.length || 0;
      IconComponent = SettingIcon;
      iconColor = "#fffff";
      break;
    default:
      break;
  }

  return (
    <CustomCard>
      <Grid
        container
        direction="column"
        sx={{ height: "120px", padding: "20px 20px" }}
      >
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
                  textAlign: "center",
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
