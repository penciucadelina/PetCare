import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForm.css';
import bgPaws from '../media/background.png';
import pugLogin from '../media/pug-login.jpg';
import { login } from '../services/authService';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            const token = response.data.token;

            localStorage.setItem('token', token);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Autentificarea a eșuat. Verifică username-ul și parola.');
        }
    };

    return (
        <div
            className="auth-page"
            style={{
                backgroundImage: `url(${bgPaws})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
            }}
        >
            <div className="auth-container">
                <div className="auth-form">
                    <h1>PetTrack</h1>
                    <h3>Autentificare</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Parolă"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="error-msg">{error}</p>}
                        <button type="submit">Login</button>
                    </form>
                    <p className="bottom-link">
                        Nu ai cont? <a href="/register">Înregistrează-te</a>
                    </p>
                </div>

                <div
                    className="auth-image"
                    style={{ backgroundImage: `url(${pugLogin})` }}
                />
            </div>
        </div>
    );
};

export default Login;
