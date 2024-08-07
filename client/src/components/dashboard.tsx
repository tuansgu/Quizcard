import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FlashcardSetList from './flashcardSetList';
import Home from './home';

const Dashboard: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/insert-flashcard-set', {
        name,
        description,
      }, { withCredentials: true });
      toast.success('Flashcard set added successfully');
      console.log(response.data);
    } catch (err) {
      toast.error('Failed to add flashcard set');
      console.error('Failed to add flashcard set', err);
    }
  };

  return (
    <>
      <div>
        <Home />
        <div>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add New Flashcard Set
          </button>
          <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Create List Word</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        id="title"
                        className="form-control custom-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="English for me, English-Environment, ..."
                        required
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <input
                        type="text"
                        id="description"
                        className="form-control custom-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Input your description in here..."
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Save changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <FlashcardSetList />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
