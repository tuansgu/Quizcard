import React, { useEffect, useState } from 'react';
import Home from './home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface FlashcardSet {
  id: number;
  name: string;
  description: string;
  user_id: number;
}

const Discovery = () => {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      try {
        const response = await axios.get('http://localhost:3002/get-flashcard-sets-shared', { withCredentials: true });
        if (Array.isArray(response.data.result)) {
          setFlashcardSets(response.data.result);
        } else {
          setError('Invalid data format received from server');
          console.error('Invalid data format:', response.data);
        }
      } catch (err: any) {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError(err.message);
        }
        toast.error(err.message || 'An error occurred while fetching flashcard sets.');
      }
    };
    fetchFlashcardSets();
  }, []);

  return (
    <>
      <Home />
      <div>
        <h1>Discovery</h1>
        <div className='col-12 col-md-12'>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className='row'>
            {flashcardSets.map((set) => (
              <div key={set.id} className='col-12 col-md-6 col-lg-3 mb-2'>
                <div className='card h-100 d-flex flex-column' style={{ cursor: 'pointer' }}>
                  <div className='card-body d-flex flex-column'>
                    <h5 className='card-title'>{set.name}</h5>
                    <p className='card-text'>{set.description}</p>
                    <div className="mt-auto d-flex justify-content-center">
                      <button className="btn btn-primary me-2">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Discovery;
