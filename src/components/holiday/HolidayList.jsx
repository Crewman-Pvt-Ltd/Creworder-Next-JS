import React, { useState } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const HolidayList = ({ onAddHoliday }) => {
  const [events, setEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [holidayDetails, setHolidayDetails] = useState({
    occasion: '',
    weekdays: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    },
  });
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);


  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

 
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleHolidayChange = (e) => {
    const { name, value } = e.target;
    setHolidayDetails({
      ...holidayDetails,
      [name]: value,
    });
  };

  
  const handleWeekdayChange = (e) => {
    const { name, checked } = e.target;
    setHolidayDetails({
      ...holidayDetails,
      weekdays: {
        ...holidayDetails.weekdays,
        [name]: checked,
      },
    });
  };

 
  const handleSaveHoliday = () => {
    const { occasion, weekdays } = holidayDetails;
    const newEvents = [];

 
    const currentYear = moment().year();

    
    for (let month = 0; month < 12; month++) {
      for (let day = 1; day <= moment({ year: currentYear, month }).daysInMonth(); day++) {
        const date = moment({ year: currentYear, month, day });
        const weekday = date.format('dddd');

        if (weekdays[weekday]) {
          newEvents.push({
            title: occasion,
            start: date.startOf('day').toDate(),
            end: date.endOf('day').toDate(),
          });
        }
      }
    }

    setEvents([...events, ...newEvents]);
    setHolidayDetails({
      occasion: '',
      weekdays: {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
      },
    });
    handleCloseDialog();
  };

 
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };


  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event !== selectedEvent));
    setIsDeleteDialogOpen(false);
  };

  
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

 
  const handleDateClick = (date) => {
    
    onAddHoliday();
  };

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', gap: 2 }}>
        <Button
          onClick={handleOpenDialog}
          sx={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#405189',
            color: 'white',
            '&:hover': {
              backgroundColor: '#334a6c',
            },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textTransform: 'none',
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} />
          Add Holiday
        </Button>
        <Button
          onClick={handleOpenDialog}
          sx={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: 'white',
            color: '#405189',
            border: '2px solid #405189',
            '&:hover': {
              backgroundColor: 'white',
            },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textTransform: 'none',
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} />
          Mark Default Holiday
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={12} sx={{
        m: 2,
        p: 2,
        backgroundColor:"white",
      }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={['month', 'week', 'day']}
          defaultView="month"
          onSelectEvent={handleEventClick} 
          onDrillDown={handleDateClick}
        />
      </Grid>

 
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Mark Default Holiday</DialogTitle>
        <DialogContent>
          <TextField
            name="occasion"
            label="Occasion"
            value={holidayDetails.occasion}
            onChange={handleHolidayChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Select Weekdays
          </Typography>
          {Object.keys(holidayDetails.weekdays).map((day) => (
            <FormControlLabel
              key={day}
              control={
                <Checkbox
                  name={day}
                  checked={holidayDetails.weekdays[day]}
                  onChange={handleWeekdayChange}
                />
              }
              label={day}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveHoliday}>Save</Button>
        </DialogActions>
      </Dialog>

    
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this event?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteEvent} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default HolidayList;
