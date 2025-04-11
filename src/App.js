import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ReferralList from './components/ReferralList';
import PostForm from './components/PostForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [referrals, setReferrals] = useState([
    {
      id: 1,
      brand: 'Amazon',
      code: 'AMAZON2023',
      link: 'https://amazon.com/referral',
      postDate: '2023-04-10',
      tags: ['shopping', 'retail', 'prime'],
    },
    {
      id: 2,
      brand: 'Uber',
      code: 'UBER2023',
      link: 'https://uber.com/referral',
      postDate: '2023-04-09',
      tags: ['transportation', 'ride-sharing'],
    },
  ]);

  const handleSubmitReferral = (newReferral) => {
    setReferrals(prev => [...prev, { ...newReferral, id: Date.now() }]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <ReferralList referrals={referrals} />
        <PostForm onSubmit={handleSubmitReferral} />
      </Container>
    </ThemeProvider>
  );
}

export default App; 