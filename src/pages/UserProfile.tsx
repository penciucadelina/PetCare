import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UserProfile.css';
import { USER_ENDPOINTS } from '../services/api';

type UserProfile = {
    username: string;
    fullName: string;
    email: string;
    phone: string;
};

const UserProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'info' | 'contact' | 'password'>('info');
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(USER_ENDPOINTS.PROFILE, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setProfile(res.data);
                setEmail(res.data.email);
                setPhone(res.data.phone);
            })
            .catch(() => setMessage('Eroare la încărcarea datelor de profil.'));
    }, []);

    const updateEmail = () => {
        axios.put(USER_ENDPOINTS.EMAIL, { email }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setMessage('Emailul a fost actualizat.');
                setProfile(prev => prev ? { ...prev, email } : null);
            })
            .catch(() => setMessage('Eroare la actualizarea emailului.'));
    };

    const updatePhone = () => {
        axios.put(USER_ENDPOINTS.PHONE, { phone }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setMessage('Telefonul a fost actualizat.');
                setProfile(prev => prev ? { ...prev, phone } : null);
            })
            .catch(() => setMessage('Eroare la actualizarea telefonului.'));
    };

    const updatePassword = () => {
        axios.put(USER_ENDPOINTS.PASSWORD, {
            oldPassword,
            newPassword,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setMessage('Parola a fost schimbată cu succes.');
                setOldPassword('');
                setNewPassword('');
            })
            .catch(() => setMessage('Eroare la schimbarea parolei.'));
    };

    return (
        <div className="user-profile-page">
            <div className="tabs">
                <button onClick={() => setActiveTab('info')}>📄 Profil</button>
                <button onClick={() => setActiveTab('contact')}>📧 Date de contact</button>
                <button onClick={() => setActiveTab('password')}>🔒 Parolă</button>
            </div>

            <div className="tab-content">
                {message && <p className="message">{message}</p>}

                {activeTab === 'info' && profile && (
                    <div>
                        <p><strong>Username:</strong> {profile.username}</p>
                        <p><strong>Nume complet:</strong> {profile.fullName}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Telefon:</strong> {profile.phone}</p>
                    </div>
                )}

                {activeTab === 'contact' && (
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={updateEmail}>Salvează emailul</button>

                        <label>Telefon</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button onClick={updatePhone}>Salvează telefonul</button>
                    </div>
                )}

                {activeTab === 'password' && (
                    <div>
                        <label>Parola actuală</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <label>Parolă nouă</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button onClick={updatePassword}>Salvează parola</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
