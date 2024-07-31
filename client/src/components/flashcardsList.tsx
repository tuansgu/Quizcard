import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Home from './home';

interface Flashcard {
  id: number;
  term: string;
  definition: string;
  flashcard_set_id: number;
}

interface FlashcardSet {
  id: number;
  name: string;
  description: string;
  user_id: number;
}

const FlashcardsList: React.FC = () => {
  const { setId } = useParams<{ setId: string }>();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get<Flashcard[]>(`http://localhost:3002/get-flashcards?flashcard_set_id=${setId}`, { withCredentials: true });
        setFlashcards(response.data);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchFlashcards();
  }, [setId]);

  useEffect(() => {
    const fetchFlashcardSet = async () => {
      try {
        const res = await axios.get<FlashcardSet>(`http://localhost:3002/get-flashcard-set-id?flashcard_set_id=${setId}`, { withCredentials: true });
        setFlashcardSet(res.data);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchFlashcardSet();
  }, [setId]);

  const handleNavigate = (id: number) => {
    navigate(`/flaschcards/learn/${id}`);
};

  return (
    <>
      <div className='fixed-top'>
        <Home />
      </div>
      <div className="container-sm mb-3" style={{ maxWidth: "744px" }}>
        <div>
          <h1>{flashcardSet ? flashcardSet.name : 'Loading...'}</h1>
        </div>
        <button className="btn btn-primary mt-3 form-control"  onClick={() => handleNavigate(flashcardSet ? flashcardSet.id : 0)}>Luyện tập flashcards</button>
      </div>
      <div className="container-sm" style={{ maxWidth: "744px" }}>
        <div className="row">
          {flashcards.map((flashcard) => (
            <div key={flashcard.id} className='mt-3'>
              <div className="card h-100 d-flex flex-column" style={{ cursor: 'pointer' }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{flashcard.term}</h5>
                  {flashcard.definition && <p className="card-text">{flashcard.definition}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FlashcardsList;
