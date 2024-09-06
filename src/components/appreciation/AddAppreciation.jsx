import React, { useState } from 'react';
import CustomCard from '../CustomCard';
import {
  CardContent,
  Grid,
  Tooltip,
  IconButton,
  Typography,
  Box,
  Divider,
  Button,
} from '@mui/material';
import dynamic from 'next/dynamic';
import CustomTextField from '../CustomTextField';
import CustomLabel from '../CustomLabel';
import UploadFileIcon from '@mui/icons-material/CloudUpload';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Poppins } from 'next/font/google';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const AddAppreciation = ({ onAppreciationList }) => {
  const [photo, setPhoto] = useState(null);
  const [summary, setSummary] = useState('');

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleDescriptionChange = (value) => {
    setSummary(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic for form submission if needed
    onAppreciationList(); // Notify parent component to switch view
  };

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>
              Add Appreciation
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="award" required>
                    Award
                  </CustomLabel>
                  <CustomTextField
                    id="award"
                    name="award"
                    placeholder="Award"
                    type="text"
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="givento" required>
                    Given To
                  </CustomLabel>
                  <CustomTextField
                    id="givento"
                    name="givento"
                    type="text"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="date" required>
                    Date
                  </CustomLabel>
                  <CustomTextField
                    id="date"
                    name="date"
                    type="date" // Use date type for date input
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="summary" required>
                   Summary
                  </CustomLabel>
                  <ReactQuill
                    value={summary}
                    onChange={handleDescriptionChange}
                    placeholder=""
                    style={{ height: '200px', marginBottom: '20px' }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="photo" required>
                    Upload Photo
                  </CustomLabel>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    height="150px"
                    border="1px dashed grey"
                    borderRadius="4px"
                    sx={{ cursor: 'pointer' }}
                  >
                    <input
                      type="file"
                      id="photo"
                      onChange={handlePhotoChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="photo">
                      <UploadFileIcon fontSize="large" />
                      <Typography className={poppins.className} variant="body2">
                        Choose a file
                      </Typography>
                    </label>
                  </Box>
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  sx={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    backgroundColor: '#405189',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#334a6c',
                    },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default AddAppreciation;
