// src/Dashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import FlashcardSetList from './flashcardSetList';
import Home from './home';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Home/>
      <Link to="/add-flashcard-set" className="btn btn-primary">Add New Flashcard Set</Link>
      <div className="container mt-5">
        <FlashcardSetList /> {/* Thêm thành phần FlashcardSetList */}
      </div>
    </div>
  );
};

export default Dashboard;
