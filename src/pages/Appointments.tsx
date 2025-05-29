import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PET_ENDPOINTS, APPOINTMENT_ENDPOINTS } from '../services/api';
import '../styles/Appointments.css';
import bgPaws from '../media/background.png';

interface Pet {
    id: number;
    name: string;
}

interface Appointment {
    id?: number;
    petId: number;
    date: string;
    reason: string;
}

const Appointments: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
        petId: 0,
        date: '',
        reason: '',
    });
    const [successMessage, setSuccessMessage] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;

        axios
            .get(PET_ENDPOINTS.BASE, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setPets(res.data);
                if (res.data.length > 0) {
                    setSelectedPetId(res.data[0].id);
                }
            })
            .catch((err) => {
                console.error('Eroare la fetch animale:', err);
                if (err.response) {
                    console.error("Status:", err.response.status, "Mesaj:", err.response.data);
                }
            });
    }, [token]);

    useEffect(() => {
        if (!selectedPetId || !token) return;

        axios
            .get(APPOINTMENT_ENDPOINTS.BY_PET(selectedPetId), {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setAppointments(res.data))
            .catch((err) => {
                console.error('Eroare la fetch programări:', err);
                if (err.response) {
                    console.error("Status:", err.response.status, "Mesaj:", err.response.data);
                }
            });
    }, [selectedPetId, token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPetId || !token) return;

        const toSend = {
            petId: selectedPetId,
            appointmentDate: newAppointment.date,
            description: newAppointment.reason,
        };

        axios
            .post(APPOINTMENT_ENDPOINTS.BASE, toSend, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setAppointments([...appointments, res.data]);
                setNewAppointment({ petId: selectedPetId, date: '', reason: '' });
                setSuccessMessage('Programarea a fost adăugată cu succes!');
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch((err) => {
                console.error('Eroare la adăugare programare:', err);
                if (err.response) {
                    console.error("Status:", err.response.status, "Mesaj:", err.response.data);
                }
            });
    };

    const handleDelete = (id: number) => {
        if (!window.confirm('Ești sigur că vrei să ștergi această programare?') || !token) return;

        axios
            .delete(APPOINTMENT_ENDPOINTS.BY_ID(id), {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                setAppointments(appointments.filter(a => a.id !== id));
            })
            .catch((err) => {
                console.error('Eroare la ștergere programare:', err);
                if (err.response) {
                    console.error("Status:", err.response.status, "Mesaj:", err.response.data);
                }
                alert('A apărut o eroare la ștergere.');
            });
    };

    return (
        <div
            className="appointments-page"
            style={{
                backgroundImage: `url(${bgPaws})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
            }}
        >
            <div className="appointments-container">
                <h2>Programări</h2>

                {pets.length > 0 ? (
                    <select
                        value={selectedPetId ?? ''}
                        onChange={(e) => setSelectedPetId(Number(e.target.value))}
                    >
                        {pets.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>Nu ai animale salvate.</p>
                )}

                {selectedPetId && (
                    <>
                        <div className="appointments-list">
                            <h3>📅 Programări existente</h3>
                            {appointments.length === 0 ? (
                                <p>Nu există programări pentru acest animal.</p>
                            ) : (
                                <ul>
                                    {appointments.map((a) => (
                                        <li key={a.id}>
                                            <strong>{a.date}</strong> – {a.reason}
                                            <button
                                                onClick={() => handleDelete(a.id!)}
                                                style={{
                                                    marginLeft: '1rem',
                                                    backgroundColor: '#d9534f',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    padding: '0.3rem 0.6rem',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                🗑️
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="appointments-form">
                            <h3>➕ Adaugă programare</h3>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="date"
                                    name="date"
                                    value={newAppointment.date}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="reason"
                                    placeholder="Motivul programării"
                                    value={newAppointment.reason}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="submit">Salvează</button>
                                {successMessage && <p className="success-msg">{successMessage}</p>}
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Appointments;
