import React, { useState } from 'react';
import CustomCard from '../CustomCard';
import {
  CardContent,
  Grid,
  Typography,
  Divider,
  Button,
  Box,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import CustomLabel from '../CustomLabel';
import CustomTextField from '../CustomTextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const AddHoliday = ({ onHolidayList }) => {
  // State for form fields including dynamic date and occasion pairs
  const [formValues, setFormValues] = useState({
    datePairs: [{ date: '', occasion: '' }],
    departments: [],
    designations: [],
    employmentTypes: [],
  });

  // Handle input changes for dynamic date and occasion fields
  const handleDatePairChange = (index, e) => {
    const { name, value } = e.target;
    const newDatePairs = [...formValues.datePairs];
    newDatePairs[index] = {
      ...newDatePairs[index],
      [name]: value,
    };
    setFormValues({
      ...formValues,
      datePairs: newDatePairs,
    });
  };

  // Handle input changes for multi-select fields
  const handleMultiSelectChange = (name) => (event) => {
    setFormValues({
      ...formValues,
      [name]: event.target.value,
    });
  };

  // Add a new date and occasion pair
  const handleAddPair = () => {
    setFormValues({
      ...formValues,
      datePairs: [...formValues.datePairs, { date: '', occasion: '' }],
    });
  };

  // Remove a specific date and occasion pair
  const handleRemovePair = (index) => {
    const newDatePairs = formValues.datePairs.filter((_, i) => i !== index);
    setFormValues({
      ...formValues,
      datePairs: newDatePairs,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onHolidayList) {
      onHolidayList(formValues);
    }
  };

  // Dropdown options
  const allDepartments = ['HR', 'Finance', 'Engineering', 'Sales'];
  const allDesignations = ['Manager', 'Team Lead', 'Developer', 'Intern'];
  const allEmploymentTypes = ['Full-Time', 'Part-Time', 'Contract', 'Temporary'];

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>
              Add Holiday
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box component="form" onSubmit={handleSubmit}>
              {formValues.datePairs.map((pair, index) => (
                <Grid container spacing={2} sx={{ marginTop: 2 }} key={index}>
                  <Grid item xs={12} sm={4} md={4}>
                    <CustomLabel htmlFor={`date-${index}`} required>
                      Date
                    </CustomLabel>
                    <CustomTextField
                      id={`date-${index}`}
                      name="date"
                      type="date"
                      value={pair.date}
                      onChange={(e) => handleDatePairChange(index, e)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={4}>
                    <CustomLabel htmlFor={`occasion-${index}`} required>
                      Occasion
                    </CustomLabel>
                    <CustomTextField
                      id={`occasion-${index}`}
                      name="occasion"
                      type="text"
                      value={pair.occasion}
                      onChange={(e) => handleDatePairChange(index, e)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Add Pair">
                      <IconButton
                        onClick={handleAddPair}
                        sx={{
                          marginLeft: 1,
                          color: '#003366', // Dark Blue
                          backgroundColor: '#e0f7fa', // Light Blue background
                          borderRadius: '50%',
                          '&:hover': {
                            backgroundColor: '#b3e5fc', // Slightly darker blue
                          },
                        }}
                        aria-label="add"
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                    <Typography sx={{ marginLeft: 1, color: '#003366' }}>
                      Add
                    </Typography>
                    {formValues.datePairs.length > 1 && (
                      <Tooltip title="Remove Pair">
                        <IconButton
                          onClick={() => handleRemovePair(index)}
                          sx={{
                            marginLeft: 1,
                            color: '#d32f2f', // Red
                            backgroundColor: '#ffebee', // Light red background
                            borderRadius: '50%',
                            '&:hover': {
                              backgroundColor: '#ffcdd2', // Slightly darker red
                            },
                          }}
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Grid>
                </Grid>
              ))}

              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="departments" required>
                    Department
                  </CustomLabel>
                  <FormControl fullWidth>
                    
                    <Select
                      id="departments"
                      name="departments"
                      multiple
                      value={formValues.departments}
                      onChange={handleMultiSelectChange('departments')}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      inputProps={{ 'aria-label': 'Departments' }}
                      sx={{ height: '40px' }}
                    >
                      {allDepartments.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="designations" required>
                    Designation
                  </CustomLabel>
                  <FormControl fullWidth>
           
                    <Select
                      id="designations"
                      name="designations"
                      multiple
                      value={formValues.designations}
                      onChange={handleMultiSelectChange('designations')}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      inputProps={{ 'aria-label': 'Designations' }}
                      sx={{ height: '40px' }}
                    >
                      {allDesignations.map((designation) => (
                        <MenuItem key={designation} value={designation}>
                          {designation}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="employmentTypes" required>
                    Employment Type
                  </CustomLabel>
                  <FormControl fullWidth>
                 
                    <Select
                      id="employmentTypes"
                      name="employmentTypes"
                      multiple
                      value={formValues.employmentTypes}
                      onChange={handleMultiSelectChange('employmentTypes')}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      inputProps={{ 'aria-label': 'Employment Types' }}
                      sx={{ height: '40px' }}
                    >
                      {allEmploymentTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
            </Box>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default AddHoliday;
