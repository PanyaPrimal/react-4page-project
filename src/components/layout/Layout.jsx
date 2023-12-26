import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ }) => {
  return (
    <>
      <Header />
      <main className='my-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;