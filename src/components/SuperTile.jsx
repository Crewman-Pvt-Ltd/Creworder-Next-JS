import React from "react";
import { Grid, Typography } from "@mui/material";
import useGetAllCompanies from "@/api-manage/react-query/useGetAllCompanies";
import CustomCard from "./CustomCard";
import useGetAllPackages from "@/api-manage/react-query/useGetAllPackages";

const SuperTile = ({ type, title, count, imageUrl, height, padding }) => {
  const { data: companiesData } = useGetAllCompanies();
  const { data: packagesData } = useGetAllPackages();
  console.log(packagesData);

  switch (type) {
    case "totalCompanies":
      title = "Total Companies";
      count = companiesData?.results?.length || "N/A";  // Updated this line to use results.length
      imageUrl =
        "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "activeCompanies":
      title = "Active Companies";
      count = companiesData?.results?.length || "N/A";
      imageUrl =
        "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "suspendedCompanies":
      title = "Suspended Companies";
      count = companiesData?.results?.length || "N/A";
      imageUrl =
        "https://affiman.com/login/resources/assets/icons/orderProcess.png";
      break;
    case "totalPackages":
      title = "Total Packages";
      count = packagesData?.length || "N/A";
      imageUrl =
        "https://affiman.com/login/resources/assets/icons/orderProcess.png";
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
            <Grid item sx={{ color: "#878a99", padding: "10px" }}>
              <Typography fontSize="14px">{title}</Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "25px",
                  color: "black",
                  cursor: "pointer",
                  paddingTop: "10px",
                }}
              >
                {count}
              </Typography>
            </Grid>
            <Grid item>
              <img
                src={imageUrl}
                alt={title}
                style={{ width: "60px", height: "60px", marginRight: "8px" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CustomCard>
  );
};

export default SuperTile;
