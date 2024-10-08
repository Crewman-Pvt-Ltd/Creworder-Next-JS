import React, { useState } from "react";
import {
  CardContent,
  Grid,
  Button,
  Divider,
  TableHead,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  IconButton,
  Typography,
  TableCell,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import CustomCard from "../CustomCard";
import { Poppins } from "next/font/google";
import { Edit, Delete } from "@mui/icons-material";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const QCSettings = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [question, setQuestion] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const [qcSettingsList, setQCSettingsList] = useState([
    {
      id: 1,
      qcSettings:
        "It is a long established fact that a reader will be distracted by the readable text.",
    },
    {
      id: 2,
      qcSettings:
        "Default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
    },
    {
      id: 3,
      qcSettings:
        "Consectetur from a Lorem Ipsum passage, going through the cites.",
    },
  ]);

  const handleClickOpen = () => {
    setIsEditing(false); // Not in editing mode
    setQuestion(""); // Clear input for new question
    setOpen(true); // Open dialog
  };

  const handleEdit = (qcSettings) => {
    setIsEditing(true); // Switch to editing mode
    setSelectedQuestionId(qcSettings.id); // Store the selected question ID
    setQuestion(qcSettings.qcSettings); // Pre-fill text field with the selected question
    setOpen(true); // Open dialog
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedQuestionId(null); // Reset selected question after closing
  };

  const handleSave = () => {
    if (isEditing) {
      // Update existing question
      setQCSettingsList((prevList) =>
        prevList.map((item) =>
          item.id === selectedQuestionId
            ? { ...item, qcSettings: question }
            : item
        )
      );
    } else {
      // Add new question
      setQCSettingsList((prevList) => [
        ...prevList,
        { id: prevList.length + 1, qcSettings: question },
      ]);
    }
    handleClose();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "20px",
                  textTransform: "capitalize",
                  color: "black",
                }}
                className={poppins.className}
              >
                QC List
              </Typography>
              <Button
                sx={{
                  backgroundColor: "#405189",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#405189",
                    color: "white",
                  },
                }}
                onClick={handleClickOpen}
              >
                Add QC
              </Button>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={poppins.className}>ID</TableCell>
                    <TableCell className={poppins.className}>Question</TableCell>
                    <TableCell className={poppins.className}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {qcSettingsList.map((qcSetting) => (
                    <TableRow key={qcSetting.id}>
                      <TableCell className={poppins.className}>
                        {qcSetting.id}
                      </TableCell>
                      <TableCell
                        className={poppins.className}
                        sx={{
                          maxWidth: 300,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {qcSetting.qcSettings}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          sx={{ color: "green" }}
                          onClick={() => handleEdit(qcSetting)} // Open dialog for editing
                        >
                          <Edit />
                        </IconButton>
                        <IconButton aria-label="delete" sx={{ color: "red" }}>
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

        {/* Dialog for Add/Edit Questions */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogContent>
            <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
              {isEditing ? "Edit Question" : "Add Question"}
            </Typography>
            <TextField
              label="Question"
              fullWidth
              variant="outlined"
              value={question}
              multiline
              onChange={(e) => setQuestion(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              {isEditing ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default QCSettings;
