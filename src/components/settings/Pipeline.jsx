import React, { useState } from "react";
import {
  Button,
  Box,
  Popover,
  TextField,
  Dialog,
  Icon,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
  Typography,
  FormControlLabel,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { SketchPicker } from "react-color";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";

const Pipeline = () => {
  const [openPipelineDialog, setOpenPipelineDialog] = useState(false);
  const [openDealStageDialog, setOpenDealStageDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editType, setEditType] = useState(""); // "pipeline" or "dealStage"
  const [pipelineName, setPipelineName] = useState("");
  const [pipelineColor, setPipelineColor] = useState("#16813D");
  const [dealStageName, setDealStageName] = useState("");
  const [dealStageColor, setDealStageColor] = useState("#16813D");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElDealStage, setAnchorElDealStage] = useState(null);

  const handleClickPipelineColor = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickDealStageColor = (event) => {
    setAnchorElDealStage(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElDealStage(null);
  };

  const openPipelineColor = Boolean(anchorEl);
  const openDealStageColor = Boolean(anchorElDealStage);
  const pipelineColorId = openPipelineColor
    ? "pipeline-color-popover"
    : undefined;
  const dealStageColorId = openDealStageColor
    ? "deal-stage-color-popover"
    : undefined;

  const handlePipelineDialogOpen = () => {
    setOpenPipelineDialog(true);
  };

  const handlePipelineDialogClose = () => {
    setOpenPipelineDialog(false);
    setPipelineName("");
    setPipelineColor("#16813D");
  };

  const handleDealStageDialogOpen = () => {
    setOpenDealStageDialog(true);
  };

  const handleDealStageDialogClose = () => {
    setOpenDealStageDialog(false);
    setDealStageName("");
    setDealStageColor("#16813D");
  };

  const handleEditDialogOpen = (type) => {
    setEditType(type);
    if (type === "pipeline") {
      setPipelineName("Current Pipeline Name");
      setPipelineColor("#16813D");
    } else if (type === "dealStage") {
      setDealStageName("Current Deal Stage Name");
      setDealStageColor("#16813D");
    }
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handlePipelineNameChange = (event) => {
    setPipelineName(event.target.value);
  };

  const handlePipelineColorChange = (color) => {
    setPipelineColor(color.hex);
  };

  const handleDealStageNameChange = (event) => {
    setDealStageName(event.target.value);
  };

  const handleDealStageColorChange = (color) => {
    setDealStageColor(color.hex);
  };

  const handlePipelineSubmit = () => {
    console.log("Pipeline Name:", pipelineName);
    console.log("Pipeline Color:", pipelineColor);
    handlePipelineDialogClose();
  };

  const handleDealStageSubmit = () => {
    console.log("Deal Stage Name:", dealStageName);
    console.log("Deal Stage Color:", dealStageColor);
    handleDealStageDialogClose();
  };

  const handleEditSubmit = () => {
    if (editType === "pipeline") {
      console.log("Updated Pipeline Name:", pipelineName);
      console.log("Updated Pipeline Color:", pipelineColor);
    } else if (editType === "dealStage") {
      console.log("Updated Deal Stage Name:", dealStageName);
      console.log("Updated Deal Stage Color:", dealStageColor);
    }
    handleEditDialogClose();
  };
  const [showTable, setShowTable] = useState(false);
  const handleEditDialog = (pipeline) => {
    console.log("Edit:", pipeline);
  };

  const toggleTableVisibility = () => {
    setShowTable((prev) => !prev);
  };

  const handleRadioChange = (event) => {
    setDefaultStage(event.target.value);
  };

  const [defaultStage, setDefaultStage] = useState(null);
  return (
    <Box>
      <Box mb={2}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#405189" }}
          startIcon={<Add />}
          onClick={handlePipelineDialogOpen}
        >
          Add New Pipeline
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#405189", marginLeft: 1 }}
          startIcon={<Add />}
          onClick={handleDealStageDialogOpen}
        >
          Add New Deal Stage
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        border={1}
        borderColor="grey.300"
        borderRadius={2}
        p={2}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Box display="flex" alignItems="center">
              <Chip
                label=" "
                size="small"
                sx={{
                  backgroundColor: "blue",
                  marginRight: 1,
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <Typography sx={{ fontSize: "14px", marginRight: 1 }}>
                Sales Pipeline
              </Typography>
              <Button
                size="small"
                sx={{ minWidth: "auto", padding: 0 }}
                onClick={() => handleEditDialogOpen("pipeline")}
              >
                <EditIcon fontSize="small" sx={{ color: "blue" }} />
              </Button>
            </Box>
            <Typography variant="body2" color="textSecondary">
              7 Deal Stages
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <FormControlLabel
              control={
                <Radio
                  checked={defaultStage === "1"}
                  value="1"
                  onChange={handleRadioChange}
                  name="defaultStage"
                />
              }
              label={
                <Box display="flex" alignItems="center">
                  <Typography variant="body2" color="textSecondary">
                    Default
                  </Typography>
                </Box>
              }
              sx={{ margin: 0 }}
            />
          </Box>

          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            onClick={toggleTableVisibility}
          >
            {showTable ? "Hide Deal Stages" : "Deal Stages"}
          </Button>
        </Box>

        {showTable && (
          <Box mt={2} width="100%">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Deal Stage</TableCell>
                    <TableCell>Default Deal Stage</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { id: 1, stage: "Generated", color: "yellow" },
                    { id: 2, stage: "Qualified", color: "blue" },
                    { id: 3, stage: "Initial Contact", color: "cyan" },
                    { id: 4, stage: "Schedule Appointment", color: "green" },
                    { id: 5, stage: "Proposal Sent", color: "orange" },
                    { id: 6, stage: "Win", color: "green" },
                    { id: 7, stage: "Lost", color: "red" },
                  ].map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell>{deal.id}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              backgroundColor: deal.color,
                              borderRadius: "50%",
                              marginRight: 1,
                            }}
                          />
                          {deal.stage}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Radio
                              checked={defaultStage === deal.id.toString()}
                              value={deal.id.toString()}
                              onChange={handleRadioChange}
                              name="defaultStage"
                            />
                          }
                          label="Default"
                          sx={{ margin: 0 }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
          <DialogTitle>
            Edit {editType === "pipeline" ? "Pipeline" : "Deal Stage"}
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <TextField
                  margin="dense"
                  label="Name"
                  placeholder={
                    editType === "pipeline"
                      ? "e.g. In Progress"
                      : "e.g. Closed Won"
                  }
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={editType === "pipeline" ? pipelineName : dealStageName}
                  onChange={
                    editType === "pipeline"
                      ? handlePipelineNameChange
                      : handleDealStageNameChange
                  }
                />
                <Box ml={2} display="flex" alignItems="center">
                  <TextField
                    label="Label Color"
                    value={
                      editType === "pipeline" ? pipelineColor : dealStageColor
                    }
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ width: 120 }}
                  />
                  <Button
                    onClick={
                      editType === "pipeline"
                        ? handleClickPipelineColor
                        : handleClickDealStageColor
                    }
                    sx={{
                      backgroundColor:
                        editType === "pipeline"
                          ? pipelineColor
                          : dealStageColor,
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      border: "1px solid #ccc",
                      "&:hover": {
                        backgroundColor:
                          editType === "pipeline"
                            ? pipelineColor
                            : dealStageColor,
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Popover
              id={
                editType === "pipeline"
                  ? "pipeline-color-popover"
                  : "deal-stage-color-popover"
              }
              open={
                editType === "pipeline" ? openPipelineColor : openDealStageColor
              }
              anchorEl={editType === "pipeline" ? anchorEl : anchorElDealStage}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <SketchPicker
                color={editType === "pipeline" ? pipelineColor : dealStageColor}
                onChangeComplete={
                  editType === "pipeline"
                    ? handlePipelineColorChange
                    : handleDealStageColorChange
                }
                disableAlpha
                styles={{
                  default: {
                    picker: {
                      backgroundColor: "#fff",
                    },
                  },
                }}
              />
            </Popover>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose} sx={{ color: "#F14A16" }}>
              Close
            </Button>
            <Button
              onClick={handleEditSubmit}
              variant="contained"
              sx={{ backgroundColor: "#F14A16" }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      {/* <Dialog
        open={openPipelineDialog}
        onClose={handlePipelineDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Pipeline</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <TextField
                  margin="dense"
                  label="Pipeline Name"
                  placeholder="e.g. In Progress"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={pipelineName}
                  onChange={handlePipelineNameChange}
                />
                <Box display="flex" alignItems="center" gap={1}>
                  <TextField
                    label="Label Color"
                    value={pipelineColor}
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={{ width: 120 }}
                  />
                  <Button
                    onClick={handleClickPipelineColor}
                    sx={{
                      backgroundColor: pipelineColor,
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      border: "1px solid #ccc",
                      "&:hover": {
                        backgroundColor: pipelineColor,
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box display="flex" flexDirection="row" gap={2}>
                <TextField
                  margin="dense"
                  label="Product Name"
                  placeholder="e.g. Product Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  margin="dense"
                  label="Branch"
                  placeholder="e.g. Branch"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Box>
            </Box>
            <Popover
              id="color-picker-popover"
              open={openPipelineColor}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <SketchPicker
                color={pipelineColor}
                onChangeComplete={handlePipelineColorChange}
                disableAlpha
                styles={{
                  default: {
                    picker: {
                      backgroundColor: "#fff",
                    },
                  },
                }}
              />
            </Popover>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePipelineDialogClose} sx={{ color: "#F14A16" }}>
            Close
          </Button>
          <Button
            onClick={handlePipelineSubmit}
            variant="contained"
            sx={{ backgroundColor: "#F14A16" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog> */}

      <Dialog open={openDealStageDialog} onClose={handleDealStageDialogClose}>
        <DialogTitle>Add New Deal Stage</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                placeholder="e.g. Closed Won"
                type="text"
                fullWidth
                variant="outlined"
                value={dealStageName}
                onChange={handleDealStageNameChange}
              />
              <Box ml={2} display="flex" alignItems="center">
                <TextField
                  label="Label Color"
                  value={dealStageColor}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ width: 120 }}
                />
                <Button
                  onClick={handleClickDealStageColor}
                  sx={{
                    backgroundColor: dealStageColor,
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    border: "1px solid #ccc",
                    "&:hover": {
                      backgroundColor: dealStageColor,
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Popover
            id={dealStageColorId}
            open={openDealStageColor}
            anchorEl={anchorElDealStage}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <SketchPicker
              color={dealStageColor}
              onChangeComplete={handleDealStageColorChange}
              disableAlpha
              styles={{
                default: {
                  picker: {
                    backgroundColor: "#fff",
                  },
                },
              }}
            />
          </Popover>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDealStageDialogClose}
            sx={{ color: "#F14A16" }}
          >
            Close
          </Button>
          <Button
            onClick={handleDealStageSubmit}
            variant="contained"
            sx={{ backgroundColor: "#F14A16" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>
          Edit {editType === "pipeline" ? "Pipeline" : "Deal Stage"}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <TextField
                  margin="dense"
                  label="Pipeline Name"
                  placeholder="e.g. In Progress"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={pipelineName}
                  onChange={handlePipelineNameChange}
                />
                <Box display="flex" alignItems="center" gap={1}>
                  <TextField
                    label="Label Color"
                    value={pipelineColor}
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={{ width: 120 }}
                  />
                  <Button
                    onClick={handleClickPipelineColor}
                    sx={{
                      backgroundColor: pipelineColor,
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      border: "1px solid #ccc",
                      "&:hover": {
                        backgroundColor: pipelineColor,
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box display="flex" flexDirection="row" gap={2}>
                <TextField
                  margin="dense"
                  label="Product Name"
                  placeholder="e.g. Product Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={pipelineName}
                  onChange={handlePipelineNameChange}
                />
                <TextField
                  margin="dense"
                  label="Branch"
                  placeholder="e.g. Branch"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={pipelineName}
                  onChange={handlePipelineNameChange}
                />
              </Box>
            </Box>
            <Popover
              id="color-picker-popover"
              open={openPipelineColor}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <SketchPicker
                color={pipelineColor}
                onChangeComplete={handlePipelineColorChange}
                disableAlpha
                styles={{
                  default: {
                    picker: {
                      backgroundColor: "#fff",
                    },
                  },
                }}
              />
            </Popover>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} sx={{ color: "#F14A16" }}>
            Close
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            sx={{ backgroundColor: "#F14A16" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default Pipeline;
