import React from "react";
import CustomCard from "../CustomCard";
import {
  Grid,
  Button,
  CardContent,
  Typography,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { Settings, Add, ViewList } from "@mui/icons-material";

const DatabaseBackupSettings = () => {
  return (
    <Box>
      <Box display="flex" mb={2}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#405189",
          }}
          startIcon={<Add />}
        >
          Create Database Backup
        </Button>
        <Button
          startIcon={<Settings />}
          sx={{
            marginLeft: 1,
            color: "#405189",
            borderColor: "#405189",
            border: "1px solid #405189",
            backgroundColor: "white",
          }}
        >
          Auto Backup Settings
        </Button>
      </Box>
      <CustomCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Database Backup Settings
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              padding: 2,
              backgroundColor: "#e0f7fa",
              marginBottom: 2,
              borderRadius:"5px",
              border:"1px solid #b4f0f8",
            
            }}
          >
            <Typography sx={{
              fontSize:"13px",
            }}>
              <strong>Note:</strong> Due to the limited execution time and
              memory available to PHP, backing up very large databases may not
              be possible. If your database is very large you might need to
              backup directly from your SQL server via the command line, or have
              your server admin do it for you if you do not have root
              privileges.
            </Typography>
          </Box>
          <Box textAlign="center" color="gray">
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Backup</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Backup Size</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Date & Time</Typography>
              </Grid>
            </Grid><Divider sx={{ my: 2 }} />
            <Box textAlign="center" mt={2}>
              <ViewList sx={{ fontSize: 40, color: "#ccc" }} />
              <Typography variant="body2">- No record found. -</Typography>
            </Box>
          </Box>
        </CardContent>
      </CustomCard>
    </Box>
  );
};

export default DatabaseBackupSettings;
