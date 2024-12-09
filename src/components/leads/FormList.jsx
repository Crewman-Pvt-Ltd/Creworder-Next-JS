import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  IconButton,
  Paper,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Delete as DeleteIcon, Edit as EditIcon} from "@mui/icons-material";
import CustomCard from "../CustomCard";
const FormList = () => {
  const rows = [
    {
      id: 1,
      form_name: "Test form",
      url: "https://demo-saas.worksuite.biz/lead-form/60627224ec90685289edd785f839f72d?styled=1",
      iframe: '<iframe src="https://demo-saas.worksuite.biz/lead-form/60627224ec90685289edd785f839f72d" frameborder="0" scrolling="yes" style="display:block; width:100%; height:60vh;"></iframe>',
      status: "Pending",
      created_date: "2024-09-17",
    },
  ];

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }, (err) => {
      alert('Failed to copy!');
      console.error('Error copying text: ', err);
    });
  };

  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12}>
        <CustomCard>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              maxHeight: "400px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "20px",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
                color: "black",
                margin: "20px",
              }}
            >
              Form List
            </Typography>

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
                      <b>Form Name</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>URL</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>I Frame code</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Date</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Action</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.id}.
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.form_name}
                      </TableCell>
                      <TableCell
                        sx={{
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                          maxWidth: 200,
                        }}
                      >
                        {row.url}
                        <Tooltip title="Copy URL">
                          <IconButton
                            onClick={() => handleCopyToClipboard(row.url)}
                            sx={{ ml: 1 }}
                          >
                            <ContentCopyIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        sx={{
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                          maxWidth: 200,
                        }}
                      >
                        {row.iframe}

                        <Tooltip title="Copy Iframe">
                          <IconButton
                            onClick={() => handleCopyToClipboard(row.iframe)}
                            sx={{ ml: 1 }}
                          >
                            <ContentCopyIcon />
                          </IconButton>
                        </Tooltip>

                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.created_date}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <IconButton aria-label="edit" sx={{ color: "#007BFF" }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          sx={{ color: "#FF0000" }}
                        >
                          <DeleteIcon />
                        </IconButton>
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

export default FormList;
