import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Home from './home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Flashcard {
  id: number;
  term: string;
  definition: string;
  flashcard_set_id: number;
  definition_vn: string;
  example: string;
}

interface FlashcardSet {
  id: number;
  name: string;
  description: string;
  user_id: number;
}

const FlashcardsList: React.FC = () => {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [definition_vn, setDefinition_vn] = useState("")
  const [example, setExample] = useState("")
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


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3002/insert-term?flashcard_set_id=${setId}`, {
        term,
        definition,
        definition_vn,
        example,
      }, { withCredentials: true });
      toast.success('Term added successfully');
      setTerm("");
      setDefinition("");
      setDefinition_vn("");
      setExample("");
      console.log(response.data);
    } catch (err) {
      toast.error('Failed to add term');
      console.error('Failed to add term', err);
    }
  };

  return (
    <>
      <div className='fixed-top'>
        <Home />
      </div>
      <div className="container-sm mb-3" style={{ maxWidth: "744px", marginTop: '100px' }}>
        <div className='mt-3'>
          <h1>{flashcardSet ? flashcardSet.name : 'Loading...'}</h1>
        </div>
        <button className="btn btn-primary mt-3 form-control" onClick={() => handleNavigate(flashcardSet ? flashcardSet.id : 0)}>Luyện tập flashcards</button>
        <button className="btn btn-success mt-3 form-control" data-bs-toggle="modal" data-bs-target="#modalAddWord"> Thêm từ vựng</button>
      </div>
      <div className="modal fade" id="modalAddWord" tabIndex={-1} aria-labelledby="modalAddWord" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalAddWord">Create Word</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="term">Term</label>
                  <input
                    type="text"
                    id="term"
                    className="form-control custom-input"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="apple, banana, ..."
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="definition">Definition</label>
                  <input
                    type="text"
                    id="definition"
                    className="form-control custom-input"
                    value={definition}
                    onChange={(e) => setDefinition(e.target.value)}
                    placeholder="Input definition in here ..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="definition_vn">Definition By Vietnamese</label>
                  <input
                    type="text"
                    id="definition_vn"
                    className="form-control custom-input"
                    value={definition_vn}
                    onChange={(e) => setDefinition_vn(e.target.value)}
                    placeholder="Input definition in here ..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="example">Example</label>
                  <input
                    type="text"
                    id="example"
                    className="form-control custom-input"
                    value={example}
                    onChange={(e) => setExample(e.target.value)}
                    placeholder="Input definition in here ..."
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Add Term</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container-sm" style={{ maxWidth: "744px" }}>
        <div className="row">
          {flashcards.map((flashcard) => (
            <div key={flashcard.id} className='mt-3'>
              <div className="card h-100 d-flex flex-column" style={{ cursor: 'pointer' }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{flashcard.term}</h5>
                  {flashcard.definition && <p className="card-text 1">{flashcard.definition}</p>}
                  {flashcard.definition_vn && <p className="card-text 2">{flashcard.definition_vn}</p>}
                  {flashcard.example && <p className="card-text 3"><strong>Ví dụ:<br/></strong> {flashcard.example}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default FlashcardsList;
