import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import Me from './components/me';
import Dashboard from './components/dashboard';
import FlashcardsList from './components/flashcardsList';
import LearnFlashCard from './components/learnFlashCard';
import Discovery from './components/discovery';
import Studying from './components/studying';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/me" element={<Me />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flashcards/:setId" element={<FlashcardsList />} />
        <Route path="/flaschcards/learn/:setId" element={<LearnFlashCard/>} />
        <Route path="/flaschcards/addword/:setId" element={<LearnFlashCard/>} />
        <Route path="/discovery" element={<Discovery />} />
        <Route path="/studying" element={<Studying />} />
        <Route path="/me" element={<Me/>} />
      </Routes>
    </Router>
  );
};

export default App;
