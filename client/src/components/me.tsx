import React from 'react'
import Home from './home'

const Me = () => {
    return (
        <>
        <Home/>
            <div>
                <span>
                    Đang học
                    <div className='bg-gray' style={{
                        marginTop: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        <div className='flashcard-stats-counts d-flex' style={{ justifyContent: 'space-evenly' }}>
                            <div className='d-flex justify-content-center' style={{
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div className='flashcard-stats-item-number' style={{
                                    fontWeight: '600',
                                    fontSize: '2rem'
                                }}>
                                    31
                                </div>
                                <div className='flashcard-stats-item-text'>
                                    List từ đã tạo
                                </div>
                            </div>
                            <div className='d-flex justify-content-center' style={{
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div className='flashcard-stats-item-number' style={{
                                    fontWeight: '600',
                                    fontSize: '2rem'
                                }}>
                                    31
                                </div>
                                <div className='flashcard-stats-item-text'>
                                    List từ lưu về
                                </div>
                            </div>
                            <div className='d-flex justify-content-center' style={{
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div className='flashcard-stats-item-number' style={{
                                    fontWeight: '600',
                                    fontSize: '2rem'
                                }}>
                                    31
                                </div>
                                <div className='flashcard-stats-item-text'>
                                    Đã học
                                </div>
                            </div>

                        </div>
                        <div className='flashcard-stats-day'>

                        </div>
                    </div>
                </span >
            </div >
        </>
    )
}

export default Me