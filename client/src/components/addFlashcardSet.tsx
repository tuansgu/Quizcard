import React, { useState } from 'react';
import axios from 'axios';

const AddFlashcardSet: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/insert-flashcard-set', {
                name,
                description,
            }, { withCredentials: true });
            setMessage('Flashcard set added successfully');
            console.log(response.data);
        } catch (err) {
            setMessage('Failed to add flashcard set');
            console.error('Failed to add flashcard set', err);
        }
    };

    return (
        <div>
            <h2>Add New Flashcard Set</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Name Flashcard Set</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="title" className="form-label">Description</label>
                    <input
                        type="text"
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Flashcard Set</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddFlashcardSet;
