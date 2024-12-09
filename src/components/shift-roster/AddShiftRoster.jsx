import React, { useState } from 'react';
import CustomCard from '../CustomCard';
import {
  CardContent,
  Grid,
  Typography,
  Box,
  Divider,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import dynamic from 'next/dynamic';
import CustomTextField from '../CustomTextField';
import CustomLabel from '../CustomLabel';
import UploadFileIcon from '@mui/icons-material/CloudUpload';
import { Poppins } from 'next/font/google';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

// Generate years and months for dropdown options
const years = Array.from(new Array(100), (_, index) => new Date().getFullYear() - index);
const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
];

const AddShiftRoster = ({ onShiftRosterList }) => {
  const [photo, setPhoto] = useState(null);
  const [value, setValue] = React.useState('date'); // Default to "Date"
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === 'date') {
      setStartDate(''); // Clear start date
      setEndDate(''); // Clear end date
      setYear(''); // Clear year
      setMonth(''); // Clear month
    } else if (event.target.value === 'multiple') {
      setDate(''); // Clear single date
      setYear(''); // Clear year
      setMonth(''); // Clear month
    } else if (event.target.value === 'month') {
      setDate(''); // Clear single date
      setStartDate(''); // Clear start date
      setEndDate(''); // Clear end date
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onShiftRosterList(); 
  };

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>
              Add Shift Roster
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="department" required>
                    Department
                  </CustomLabel>
                  <CustomTextField
                    id="department"
                    name="department"
                    placeholder="department"
                    type="text"
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="employees" required>
                    Employees 
                  </CustomLabel>
                  <CustomTextField
                    id="employees"
                    name="employees"
                    type="text"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="employeeshift" required>
                    Employee Shift
                  </CustomLabel>
                  <CustomTextField
                    id="employeeshift"
                    name="employeeshift"
                    type="employeeshift" 
                    fullWidth
                  />
                </Grid>
                
                <Grid item xs={12} sm={12} md={12}>
                  <FormControl component="fieldset" fullWidth>
                    <CustomLabel component="legend">Assign Shift By</CustomLabel>
                    <RadioGroup
                      aria-label="assign-shift-by"
                      name="assignshiftby"
                      value={value}
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel value="date" control={<Radio />} label="Date" />
                      <FormControlLabel value="multiple" control={<Radio />} label="Multiple" />
                      <FormControlLabel value="month" control={<Radio />} label="Month" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {value === 'date' && (
                  <Grid item xs={12} sm={4} md={4}>
                    <CustomLabel htmlFor="date" required>
                      Date
                    </CustomLabel>
                    <CustomTextField
                      id="date"
                      name="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                )}

                {value === 'multiple' && (
                  <>
                    <Grid item xs={12} sm={3} md={3}>
                      <CustomLabel htmlFor="start-date" required>
                        Start Date
                      </CustomLabel>
                      <CustomTextField
                        id="start-date"
                        name="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                      <CustomLabel htmlFor="end-date" required>
                        End Date
                      </CustomLabel>
                      <CustomTextField
                        id="end-date"
                        name="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </>
                )}

                {value === 'month' && (
                  <>
                    <Grid item xs={12} sm={3} md={3}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="year">Year</InputLabel>
                        <Select
                          id="year"
                          name="year"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                maxHeight: 200,
                              },
                            },
                          }}
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          {years.map((yr) => (
                            <MenuItem key={yr} value={yr}>
                              {yr}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="month">Month</InputLabel>
                        <Select
                          id="month"
                          name="month"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                maxHeight: 200,
                              },
                            },
                          }}
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          {months.map((mn) => (
                            <MenuItem key={mn.value} value={mn.value}>
                              {mn.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                )}

                <Grid item xs={12} sm={4} md={12}>
                  <CustomLabel htmlFor="remark" required>
                    Remark
                  </CustomLabel>
                  <CustomTextField
                    id="remark"
                    name="remark"
                    type="remark" 
                    fullWidth
                    multiline
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <CustomLabel htmlFor="photo" required>
                    Upload Photo
                  </CustomLabel>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    height="120px"
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

export default AddShiftRoster;
