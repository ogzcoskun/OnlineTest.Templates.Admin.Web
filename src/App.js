import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Questions from './components/Questions';
import SentTests from './components/SentTests';
import CompletedTests from './components/CompletedTests';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/questions" element={<Questions />} />
        <Route path="/sent-tests" element={<SentTests />} />
        <Route path="/completed-tests" element={<CompletedTests />} />
        <Route path="/" element={<Questions />} />
      </Routes>
    </Router>
  );
}

export default App;