import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import Enquiryimg from '../images/Custom-email-message-pattern-for-Divi-contact-form.png';


export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const Enquiry= {
    width: '600px',
    height: 'auto',
  };

  return (
    <Container
      id="form"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}>
      <Typography  component="h2" variant="h4" color="text.primary"
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}>
        Get Free Demo
      </Typography>
   
      <Box sx={{ width: '100%', mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography component="h3" variant="h5" gutterBottom>
            <Image src={Enquiryimg}  style={Enquiry} alt="Enquiry Form" />
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography component="h3" variant="h5" gutterBottom>
            </Typography>
            <form>
              <TextField  fullWidth label="Full Name"  margin="normal" required/>
              <TextField  fullWidth label="Enter Email" type="email"  margin="normal"  required />
              <TextField  fullWidth label="Enter Number" type="text" margin="normal" required/>
              <TextField  fullWidth label="Message" margin="normal" multiline rows={4} required />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>      
    </Container>
  );
}
