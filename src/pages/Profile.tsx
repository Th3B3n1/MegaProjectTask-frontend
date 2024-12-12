import { useState } from 'react';

export function Profile() {
    const [newUsername, setNewUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = () => {

    };

    const handlePasswordChange = () => {

    };

    return (
        <div className="profile-container">
            <div className="profile-section">
                <h3>Change Username</h3>
                <input
                    type="text"
                    placeholder="New Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <button onClick={handleNameChange}>Update Username</button>
            </div>
            <div className="profile-section">
                <h3>Change Password</h3>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handlePasswordChange}>Update Password</button>
            </div>
        </div>
    );
}