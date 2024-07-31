import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Home from './home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';

interface Flashcard {
    id: number;
    term: string;
    definition: string;
    flashcard_set_id: number;
}

const LearnFlashCard: React.FC = () => {
    const { setId } = useParams<{ setId: string }>();
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await axios.get<Flashcard[]>(`http://localhost:3002/get-flashcard-learn?flashcard_set_id=${setId}`, { withCredentials: true });
                setFlashcards(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchFlashcards();
    }, [setId]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
        setIsFlipped(false);
    };

    const currentFlashcard = flashcards[currentIndex];

    return (
        <>
            <div className='fixed-top' style={{ paddingBottom: "50px" }}>
                <Home />
            </div>
            <div className='container-sm' style={{ position: "relative", marginTop: "100px", display: "flex", justifyContent: "center" }}>
                <div className="d-flex" style={{
                    flexDirection: "column",
                    boxSizing: "border-box",
                    fontSize: "1rem",
                    fontWeight: "400",
                    lineHeight: "1.5",
                    textAlign: "center"
                }}>
                    {currentFlashcard ? (
                        <div className='flashcard' style={{
                            position: "relative",
                            height: "365px",
                            width: "500px",
                            border: "2px solid #000",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            perspective: "1000px"
                        }}>
                            <div className='flashcard-flip flip-btn' style={{
                                position: "absolute",
                                bottom: ".5rem",
                                right: "1rem",
                                zIndex: "99",
                                fontSize: "2rem",
                                fontWeight: "600",
                                cursor: "pointer",
                            }}
                                onClick={handleFlip}
                            >
                                <FontAwesomeIcon icon={faRepeat} />
                            </div>
                            <div className={`flippable ${isFlipped ? 'flipped' : ''}`} style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                transition: "transform 0.6s",
                                transformStyle: "preserve-3d",
                                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                            }}>
                                <div className='flashcard-front' style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    backfaceVisibility: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "2rem",
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    overflow: "hidden"
                                }}>
                                    <h1>{currentFlashcard.term}</h1>
                                </div>
                                <div className='flashcard-back' style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    backfaceVisibility: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.5rem",
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    transform: "rotateY(180deg)"
                                }}>
                                    <p>{currentFlashcard.definition}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Không có dữ liệu để hiển thị</p>
                    )}
                    <div className='flashcard-action-controls' style={{ marginTop: "20px", textAlign: "center" }}>
                        <button className='btn btn-primary mt-3' onClick={handleNext}>Tiếp theo</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LearnFlashCard;
