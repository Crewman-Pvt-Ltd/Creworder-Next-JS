import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import { usePermissions } from "@/contexts/PermissionsContext";
import { get_notepad } from "@/api-manage/ApiRoutes";
const ContainerStyled = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(5),
  backgroundColor: "#ffffff",
  padding: "10px",
  marginLeft: "4px",
}));

const TextFieldStyled = styled(TextField)({
  width: "100%",
});

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Notepad = () => {
  const { permissionsData } = usePermissions();
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState("");
  const [authID, setAuthID] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getToken();
      if (!token) {
        console.error("User not authenticated");
        return;
      }

      try {
        const fetchedAuthID = permissionsData?.user?.id;
        if (fetchedAuthID) {
          setAuthID(fetchedAuthID);
          const response = await MainApi.get(`${get_notepad}${fetchedAuthID}/`, {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.status === 200) {
            console.log("Notepad Response", response.data);
            if (response.data.Notepad && response.data.Notepad.note) {
              setSavedNotes(response.data.Notepad.note);
              setNotes(response.data.Notepad.note);
            } else {
              console.error("Notepad data not found in response", response.data);
            }
          } else {
            console.error("Failed to fetch notes, Status Code:", response.status);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [permissionsData]);

  const handleInputChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSave = async () => {
    if (!authID) {
      console.error("User not authenticated");
      return;
    }

    const token = getToken();
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    const formData = {
      note: notes,
      authID: authID,
    };

    try {
      const response = await MainApi.post("/api/createNotepad/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSavedNotes(response.data.note);
        setNotes(response.data?.Notepad?.note);
        alert("Saved Successfully");
      } else {
        console.error("Failed to save note, Status Code:", response.status);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <ContainerStyled maxWidth="lg">
      <Typography variant="h5" gutterBottom>
        Notepad
      </Typography>
      <TextFieldStyled
        label="Write your notes here..."
        multiline
        rows={14}
        id="note"
        name="note"
        variant="outlined"
        value={notes}
        onChange={handleInputChange}
      />
      <ButtonStyled variant="contained" color="primary" onClick={handleSave}>
        Save
      </ButtonStyled>
    </ContainerStyled>
  );
};

export default Notepad;
