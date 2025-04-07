import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthForm from './Auth_form';
import NotesPage from './Notes_page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/notes" element={<NotesPage />} />
    </Routes>
  );
}

export default App;
