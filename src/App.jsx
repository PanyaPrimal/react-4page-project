import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AboutMePage from './components/pages/AboutMePage/AboutMePage';
import GalleryPage from './components/pages/GalleryPage/GalleryPage';
import ContactsPage from './components/pages/ContactsPage';
import MessagesPage from './components/pages/MessagesPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route index element={<AboutMePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="about" element={<AboutMePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;