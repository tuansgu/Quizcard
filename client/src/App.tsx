import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import Me from './components/me';
import AddFlashcardSet from './components/addFlashcardSet';
import Dashboard from './components/dashboard';
import FlashcardsList from './components/flashcardsList';
import LearnFlashCard from './components/learnFlashCard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/me" element={<Me />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-flashcard-set" element={<AddFlashcardSet />} />
        <Route path="/flashcards/:setId" element={<FlashcardsList />} />
        <Route path="/flaschcards/learn/:setId" element={<LearnFlashCard/>} />
      </Routes>
    </Router>
  );
};

export default App;
