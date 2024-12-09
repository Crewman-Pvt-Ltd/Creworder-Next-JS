import React, { useState } from "react";
import { Grid, Paper, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const StickyNote = () => {
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    const newNote = { id: Date.now(), content: "" };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id) => {
    console.log(`Edit note with id: ${id}`);
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <IconButton
          onClick={addNote}
          sx={{
            border: "3px solid black",
            padding: "7px",
            color: "black",
            position: "fixed",
            zIndex: 1000,
          }}
        >
          <AddIcon />
        </IconButton>
      </Grid>

      <Grid item container spacing={2} mt={5}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                backgroundColor: "white",
                minHeight: "200px",
                borderRadius: "10px",
                position: "relative",
                height: "250px",
                // width: "300px",
              }}
            >
              <IconButton
                onClick={() => editNote(note.id)}
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "50px",
                  color: "green",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => deleteNote(note.id)}
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: "#f44336",
                }}
              >
                <DeleteIcon />
              </IconButton>

              <Typography
                variant="h6"
                mt={4}
                sx={{
                  fontFamily: "Comic Sans MS, cursive",
                  color: "#333",
                  height: "150px",
                  width: "100%",
                  overflowY: "scroll",
                  overflowX: "hidden",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => {
                  const updatedNotes = notes.map((n) =>
                    n.id === note.id
                      ? { ...n, content: e.currentTarget.textContent }
                      : n
                  );
                  setNotes(updatedNotes);
                }}
              >
                This is an example of a sticky note. You can add any content
                here.
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default StickyNote;
