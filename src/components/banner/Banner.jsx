import React from "react";
import {
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";
import useGetAllBanner from "@/api-manage/react-query/useGetAllBanner";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";

const Banner = () => {
  const router = useRouter();
  const { data, refetch } = useGetAllBanner();

  const handleCreateBanner = () => {
    router.push("/superadmin/banner/createbanner");
  };

  const handleEdit = (id) => {
    router.push(`/superadmin/banner/editbanner?id=${id}`);
  };
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;



  const handleDeleteClick = async (id) => {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const token = getToken();
          if (!token) {
            throw new Error("No authentication token found.");
          }

          const response = await MainApi.delete(`/api/banner/${id}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (response.status === 204) {
            swal("Deleted!", "Your banner has been deleted.", "success");
            refetch();
          } else {
            swal("Error!", "Failed to delete the banner.", "error");
          }
        } catch (error) {
          swal(
            "Error!",
            "An error occurred while deleting the banner.",
            "error"
          );
        }
      }
    });
  };

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}>
        <CustomCard>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              maxHeight: "400px",
              padding: "20px",
            }}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                  color: "black",
                }}
              >
                Banner List
              </Typography>
              <Button
                onClick={handleCreateBanner}
                sx={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  backgroundColor: "#405189",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#334a6c",
                  },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AddIcon sx={{ fontSize: 20 }} />
                Create Banners
              </Button>
            </Grid>

            <TableContainer
              component={Paper}
              sx={{ overflowY: "auto", maxHeight: "340px" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Sr.</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Title</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Uploaded Image</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Created At</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Action</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {index + 1}.
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.title}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <img
                          src={`${row.banner_img}`}
                          alt={row.name}
                          height={100}
                          width={100}
                        />
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.created_at}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Box sx={{ display: "flex", gap: "8px" }}>
                          <IconButton
                           onClick={() => handleEdit(row.id)}
                          color="primary">
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteClick(row.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default Banner;
