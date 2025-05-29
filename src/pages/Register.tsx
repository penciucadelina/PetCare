import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForm.css';
import bgPaws from '../media/background.png';
import pugLogin from '../media/pug-login.jpg';
import { register } from '../services/authService';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Parolele nu coincid!');
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            setError('Telefonul trebuie să aibă exact 10 cifre.');
            return;
        }

        try {
            await register({ username, fullName, email, phone, password });
            navigate('/login');
        } catch (err) {
            console.error(err);
            setError('Înregistrarea a eșuat. Verifică datele și încearcă din nou.');
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
                    <h3>Înregistrează-te</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Nume complet"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Telefon (10 cifre)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Parolă"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirmă Parola"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {error && <p className="error-msg">{error}</p>}
                        <button type="submit">Înregistrează-te</button>
                    </form>
                    <p className="bottom-link">
                        Ai deja cont? <a href="/login">Autentifică-te</a>
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

export default Register;
