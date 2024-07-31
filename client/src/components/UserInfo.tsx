// src/UserInfo.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserInfo: React.FC = () => {
    const [user, setUser] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3002/user', { withCredentials: true });
                console.log(response.data.user)
                setUser(response.data.user);
            } catch (err) {
                console.error('Failed to fetch user', err);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            {user ? <h2>Welcome, {user.name}!</h2> : <p>Loading user info...</p>}
        </div>
    );
};

export default UserInfo;
