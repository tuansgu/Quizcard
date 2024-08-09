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
  username: string;
}

interface Flashcard {
  id: number;
  term: string;
  definition: string;
  flashcard_set_id: number;
  definition_vn: string;
  example: string;
}

const Discovery = () => {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const handleFlashcardDetail = async (id: number) => {
    try {
      const response = await axios.post('http://localhost:3002/get-flashcard-detail', {
        id: id
      }, { withCredentials: true });

      if (Array.isArray(response.data.result)) {
        setFlashcards(response.data.result); // Sử dụng response.data.result thay vì toàn bộ response.data
        console.log(response.data.result);
        toast.success('Loading Flashcard Detail Successfully');
      } else {
        console.error('Error: Flashcards data is not an array:', response.data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        <div className="container mt-5">
          <div className='col-12 col-md-12'>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className='row'>
              {flashcardSets.map((set) => (
                <div key={set.id} className='col-12 col-md-6 col-lg-3' style={{ marginBottom: "20px" }}>
                  <div className='card h-100 d-flex flex-column' style={{ cursor: 'pointer' }}>
                    <div className='card-body d-flex flex-column'>
                      <h5 className='card-title'>{set.name}</h5>
                      <p className='card-text'>{set.description}</p>
                      <p className='card-text'>Shared by <strong>{set.username}</strong></p>
                      <div className="mt-auto d-flex justify-content-center">
                        <button className="btn btn-primary me-2" onClick={() => handleFlashcardDetail(set.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Detail</button>
                        <button className="btn btn-primary me-2">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="modelDetailList" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered" style={{ height: '750px' }}>
            <div className="modal-content" style={{ height: '100%' }}>
              <div className="modal-header" style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white' }}>
                <h5 className="modal-title" id="modelDetailList">FlashcardSet's Name</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="container-sm" style={{ maxWidth: "744px", overflowY: 'auto' }}>
                <div className="row">
                  {flashcards.map((flashcard) => (
                    <div key={flashcard.id} className='mt-3 mb-3'>
                      <div className="card h-100 d-flex flex-column mb-3" style={{ cursor: 'pointer' }}>
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{flashcard.term}</h5>
                          {flashcard.definition && <p className="card-text 1">{flashcard.definition}</p>}
                          {flashcard.definition_vn && <p className="card-text 2">{flashcard.definition_vn}</p>}
                          {flashcard.example && <p className="card-text 3"><strong>Ví dụ:<br /></strong> {flashcard.example}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>



      </div >
      <ToastContainer />
    </>
  );
};

export default Discovery;
