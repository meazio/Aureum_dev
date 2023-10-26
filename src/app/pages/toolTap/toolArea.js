import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from 'app/components/Navbar/Navbar';
import Routes from 'app/components/Routes';
import Footer from 'app/components/Footer/Footer.tsx';

const toolArea = () => {
  return (
    <Router>
      <Navbar />
      <Routes />
      <Footer />
    </Router>
  );
};

export default toolArea;
