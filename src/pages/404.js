import React from 'react';
import Image from 'next/image';
import { Box, Typography, Button, Grid } from '@mui/material';
import errorImage from '../images/errorimage.png'; 
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';


const Custom404 = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/dashboard'); 
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', textAlign: 'center' }}
    >
          <Button onClick={handleRedirect} sx={{ padding: 0 }}>
        <Image src={errorImage} alt="404 Error" width={900} height={500} />
      </Button>
     
    </Grid>
  // <Grid> <Loader/> </Grid>


  );
};

export default Custom404;
