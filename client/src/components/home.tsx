import React, { useEffect, useState } from 'react';
import Icon from '../assets/image.png';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<{ user: User }>('http://localhost:3002/user', { withCredentials: true });
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          setError('User not authenticated');
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Flashcard</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/me">List từ của bạn</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/studying">Đang học</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/discovery">Khám phá</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/dashboard">Dashboard</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle user-topnav-profile d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={Icon} alt="User Icon" className="rounded-circle" width="40" height="40" />
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="profile">Profile</a></li>
                  <li><a className="dropdown-item" href="#">Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Home;
