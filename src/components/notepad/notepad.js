import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const ContainerStyled = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(5),
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

const TextFieldStyled = styled(TextField)({
  width: '100%',
});

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Notepad = () => {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState('');

  const handleSave = () => {
    setSavedNotes(notes);
    setNotes('');
  };

  return (
    <ContainerStyled style={{ backgroundColor: "#ffffff", padding: "10px" }} maxWidth="lg">
      <Typography variant="h5" gutterBottom>
        Notepad
      </Typography>
      <TextFieldStyled
        label="Write your notes here..."
        multiline
        rows={14}
        variant="outlined"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <ButtonStyled
        variant="contained"
        color="primary"
        onClick={handleSave}
      >Save
      </ButtonStyled>
      {savedNotes && (
        <PaperStyled>
          <Typography variant="h6">Saved Notes:</Typography>
          <Typography>{savedNotes}</Typography>
        </PaperStyled>
      )}
    </ContainerStyled>
  );
};

export default Notepad;
