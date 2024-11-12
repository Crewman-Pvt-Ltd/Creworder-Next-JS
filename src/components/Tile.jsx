import React from "react";
import { Grid, Typography } from "@mui/material";
import useGetAllCompanies from "@/api-manage/react-query/useGetAllCompanies";
import CustomCard from "./CustomCard";
import useGetAllPackages from "@/api-manage/react-query/useGetAllPackages";
import { image as themeImage } from "@nextui-org/theme";

const Tile = ({ title, count, imageUrl, height, padding }) => {
  const { data: companiesData } = useGetAllCompanies();
  const { data: packagesData } = useGetAllPackages();

  // let title = "";
  // let count = 0;
  let IconComponent = null;
  let iconColor = "#000";
  // let imageUrl;
  // switch (title) {
  //   case "totalCompanies":
  //     title = "Total Companies";
  //     count = companiesData?.length || 0;
  //     imageUrl =
  //       "https://affiman.com/login/resources/assets/icons/orderProcess.png";
  //     break;
  //   case "activeCompanies":
  //     title = "Active Companies";
  //     count = companiesData?.activeCompanies || 0;
  //     imageUrl =
  //       "https://affiman.com/login/resources/assets/icons/orderProcess.png";
  //     break;
  //   case "suspendedCompanies":
  //     title = "Suspended Companies";
  //     count = companiesData?.suspendedCompanies || 0;
  //     imageUrl =
  //       "https://affiman.com/login/resources/assets/icons/orderProcess.png";
  //     break;
  //   case "totalPackages":
  //     title = "Total Packages";
  //     count = packagesData?.results?.length || 0;
  //     imageUrl =
  //       "https://affiman.com/login/resources/assets/icons/orderProcess.png";
  //     break;
  //   default:
  //     title = "Unknown";
  //     count = "0";
  //     break;
  // }
  return (
    <CustomCard>
      <Grid container direction="column" sx={{ height, padding }}>
        <Grid item>
          <Grid container display="flex" justifyContent="space-between">
            <Grid item sx={{ color: "#878a99",padding:"20px",
             }}>
              <Typography fontSize="14px">{title}</Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "25px",
                  color: "black",
                  cursor: "pointer",
                  paddingTop: "10px",
                }} >
                {count}
              </Typography>
            </Grid>
            <Grid item>
              <img
                src={imageUrl}
                alt={title}
                style={{ width: "70px", height: "70px", marginRight: "8px" }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CustomCard>
  );
};

export default Tile;
