import React from 'react';
import { Container, Typography } from '@mui/material';

const SentTests = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Gönderilmiş Testler
      </Typography>
      <Typography variant="body1">
        Gönderilmiş testler burada listelenecek.
      </Typography>
    </Container>
  );
};

export default SentTests;