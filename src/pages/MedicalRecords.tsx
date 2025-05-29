import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MedicalRecords.css';
import { PET_ENDPOINTS, MEDICAL_RECORD_ENDPOINTS } from '../services/api';
import bgPaws from '../media/background.png';

interface Pet {
    id: number;
    name: string;
}

interface MedicalRecord {
    id?: number;
    petId: number;
    diagnosis: string;
    treatment: string;
    date: string;
}

const MedicalRecords: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
    const [records, setRecords] = useState<MedicalRecord[]>([]);
    const [newRecord, setNewRecord] = useState<Omit<MedicalRecord, 'id'>>({
        petId: 0,
        diagnosis: '',
        treatment: '',
        date: '',
    });
    const [showAddPetForm, setShowAddPetForm] = useState(false);
    const [newPet, setNewPet] = useState({ name: '', type: '', breed: '', age: '' });
    const [successMessage, setSuccessMessage] = useState('');

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        if (!token) {
            console.warn('Token lipsă – utilizator neautentificat');
            return;
        }

        axios
            .get(PET_ENDPOINTS.BASE, { headers })
            .then((res) => {
                setPets(res.data);
                if (res.data.length > 0) {
                    setSelectedPetId(res.data[0].id);
                }
            })
            .catch((err) => console.error('Eroare la fetch animale:', err));
    }, []);

    useEffect(() => {
        if (!selectedPetId || !token) return;

        axios
            .get(MEDICAL_RECORD_ENDPOINTS.BY_PET(selectedPetId), { headers })
            .then((res) => setRecords(res.data))
            .catch((err) => console.error('Eroare la fetch rapoarte medicale:', err));
    }, [selectedPetId]);

    const handleRecordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
    };

    const handleRecordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPetId || !token) return;

        const recordToSend = { ...newRecord, petId: selectedPetId };

        axios
            .post(MEDICAL_RECORD_ENDPOINTS.BASE, recordToSend, { headers })
            .then((res) => {
                setRecords([...records, res.data]);
                setNewRecord({ petId: selectedPetId, diagnosis: '', treatment: '', date: '' });
                setSuccessMessage('Raportul a fost salvat cu succes!');
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch((err) => console.error('Eroare la salvare raport:', err));
    };

    const handlePetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPet({ ...newPet, [e.target.name]: e.target.value });
    };

    const handleAddPet = () => {
        if (!token) return;

        const ageAsNumber = Number(newPet.age);
        if (!newPet.name || !newPet.type || !newPet.breed || isNaN(ageAsNumber)) {
            alert('Toate câmpurile sunt obligatorii.');
            return;
        }

        const petToSend = { ...newPet, age: ageAsNumber };

        axios
            .post(PET_ENDPOINTS.BASE, petToSend, { headers })
            .then((res) => {
                const newPetAdded = res.data;
                setPets([...pets, newPetAdded]);
                setSelectedPetId(newPetAdded.id);
                setShowAddPetForm(false);
                setNewPet({ name: '', type: '', breed: '', age: '' });
            })
            .catch((err) => {
                console.error('Eroare la adăugare animal:', err);
                alert('Eroare la salvare. Verifică datele.');
            });
    };

    const handleDeletePet = (id: number) => {
        if (!window.confirm('Ești sigur că vrei să ștergi acest animal?') || !token) return;

        axios
            .delete(PET_ENDPOINTS.BY_ID(id), { headers })
            .then(() => {
                const updatedPets = pets.filter((p) => p.id !== id);
                setPets(updatedPets);
                setSelectedPetId(updatedPets.length > 0 ? updatedPets[0].id : null);
                setRecords([]);
            })
            .catch((err) => console.error('Eroare la ștergere animal:', err));
    };

    const handleDeleteRecord = (recordId: number) => {
        if (!window.confirm('Ești sigur că vrei să ștergi acest raport?') || !token) return;

        axios
            .delete(MEDICAL_RECORD_ENDPOINTS.BY_ID(recordId), { headers })
            .then(() => {
                setRecords(records.filter((r) => r.id !== recordId));
            })
            .catch((err) => {
                console.error('Eroare la ștergere raport:', err);
                alert('A apărut o eroare la ștergerea raportului.');
            });
    };

    return (
        <div
            className="medical-records-page"
            style={{
                backgroundImage: `url(${bgPaws})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
            }}
        >
            <div className="records-container">
                <h2>Rapoarte medicale</h2>

                {pets.length > 0 ? (
                    <>
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
                        <button onClick={() => handleDeletePet(selectedPetId!)}>Șterge animalul</button>
                    </>
                ) : (
                    <p>Nu ai animale salvate.</p>
                )}

                <button onClick={() => setShowAddPetForm(!showAddPetForm)}>
                    {showAddPetForm ? 'Anulează' : 'Adaugă animal'}
                </button>

                {showAddPetForm && (
                    <div className="add-pet-form">
                        <h4>Adaugă animal</h4>
                        <input type="text" name="name" placeholder="Nume" value={newPet.name} onChange={handlePetChange} />
                        <input type="text" name="type" placeholder="Tip" value={newPet.type} onChange={handlePetChange} />
                        <input type="text" name="breed" placeholder="Rasă" value={newPet.breed} onChange={handlePetChange} />
                        <input type="number" name="age" placeholder="Vârstă" value={newPet.age} onChange={handlePetChange} />
                        <button onClick={handleAddPet}>Salvează animalul</button>
                    </div>
                )}

                {selectedPetId && (
                    <div className="medical-sections">
                        <div className="record-my-reports">
                            <h3>📋 Rapoartele mele</h3>
                            {records.length === 0 ? (
                                <p>Nu există rapoarte salvate pentru acest animal.</p>
                            ) : (
                                <ul>
                                    {records.map((r) => (
                                        <li key={r.id}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <strong>{r.diagnosis}</strong> – {r.date}
                                                    <div>{r.treatment}</div>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteRecord(r.id!)}
                                                    style={{
                                                        backgroundColor: '#f44336',
                                                        color: '#fff',
                                                        border: 'none',
                                                        padding: '0.4rem 0.8rem',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        marginLeft: '1rem',
                                                    }}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="record-add-form">
                            <h3>➕ Adaugă raport medical</h3>
                            <form onSubmit={handleRecordSubmit}>
                                <input
                                    type="text"
                                    name="diagnosis"
                                    placeholder="Diagnostic"
                                    value={newRecord.diagnosis}
                                    onChange={handleRecordChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="treatment"
                                    placeholder="Tratament"
                                    value={newRecord.treatment}
                                    onChange={handleRecordChange}
                                    required
                                />
                                <input
                                    type="date"
                                    name="date"
                                    value={newRecord.date}
                                    onChange={handleRecordChange}
                                    required
                                />
                                <button type="submit">Salvează raportul</button>
                                {successMessage && <p className="success-msg">{successMessage}</p>}
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicalRecords;
