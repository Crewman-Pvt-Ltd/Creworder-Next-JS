import {
  Grid,
  Button,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  Typography,
  Chip,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import CustomCard from "../CustomCard";
import StarIcon from "@mui/icons-material/Star";

const AppreciationList = ({ onAddAppreciation }) => {
  const rows = [
    {
      id: 1,
      givento: {
        name: "Keanu O'Kon",
        role: "Team Lead",
        avatar: "https://i.pravatar.cc/300?u=admin@example.com", 
        itsYou: true,
      },
      awardname: "Most Valuable Employee",
      awardIcon: <StarIcon />, 
      givenon: "05-02-2024",
    },
    {
      id: 2,
      givento: {
        name: "Dr. Raul Feil",
        role: "Team Lead",
        avatar: "https://i.pravatar.cc/300?u=pgaylordo100@example.com",
        itsYou: false,
      },
      awardname: "Best Technical Solution",
      awardIcon: <StarIcon />, 
      givenon: "05-02-2024",
    },
    
  ];

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

  const handleDeleteClick = (id) => {
    console.log("Delete", id);
  };

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12} sm={12} md={12} sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={onAddAppreciation}
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
            textTransform: "none",
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} />
          Add Appreciation
        </Button>
        <Button
          sx={{
            padding: "8px 16px",
            fontSize: "14px",
            border: "2px solid #405189",
            color: "#405189",
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} />
          Export
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell>ID</TableCell>
                    <TableCell>Given To</TableCell>
                    <TableCell>Award Name</TableCell>
                    <TableCell>Given On</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={row.givento.avatar} sx={{ marginRight: 2 }} />
                        <div>
                          <Typography sx={{
                            fontSize:"14px",
                            color:"black",
                          }}>
                            {row.givento.name}
                            {row.givento.itsYou && (
                              <Chip
                                label="It's you"
                                size="small"
                                sx={{
                                  marginLeft: 1,
                                  backgroundColor: "#e0e0e0",
                                }}
                              />
                            )}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {row.givento.role}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize:"14px",
                            color:"black",
                          }}
                        >
                          {row.awardIcon} {row.awardname}
                        </Typography>
                      </TableCell>
                      <TableCell>{row.givenon}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleEdit(row.id)}
                          aria-label="edit"
                          sx={{ color: "#405189" }}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(row.id)}
                          aria-label="delete"
                          sx={{ color: "#e74c3c" }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default AppreciationList;
