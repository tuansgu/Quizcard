import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FlashcardSet {
    id: number;
    name: string;
    description: string;
    user_id: number;
}

const FlashcardSetList: React.FC = () => {
    const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlashcardSets = async () => {
            try {
                const response = await axios.get<FlashcardSet[]>('http://localhost:3002/get-flashcard-sets', { withCredentials: true });
                setFlashcardSets(response.data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchFlashcardSets();
    }, []);

    const handleNavigate = (id: number) => {
        navigate(`/flashcards/${id}`);
    };

    const handleShare = async (id: number) => {
        try {
            const response = await axios.post('http://localhost:3002/share-flashcard-set', {
                id: id
            }, { withCredentials: true });
            if (response.data.message === "Flashcard set shared successfully") {
                toast.success('Chia sẻ thành công');
            } else {
                console.error('Error sharing flashcard set');
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="col-12 col-md-12">
            <h2>Your Flashcard Sets</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {flashcardSets.map((set) => (
                    <div key={set.id} className="col-12 col-md-6 col-lg-3 mb-2">
                        <div className="card h-100 d-flex flex-column" style={{ cursor: 'pointer' }}>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{set.name}</h5>
                                {set.description && <p className="card-text">{set.description}</p>}
                                <div className="mt-auto d-flex justify-content-center">
                                    <button className="btn btn-primary me-2" onClick={() => handleNavigate(set.id)}>Learn Now</button>
                                    <button className="btn btn-primary me-2" onClick={() => handleShare(set.id)}>Share List</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default FlashcardSetList;
