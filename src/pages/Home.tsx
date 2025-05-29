import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';


const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="hero">
                <h1>Urmărește sănătatea animalului tău cu ușurință</h1>
                <p>PetTrack este aplicația ta personală pentru a ține evidența vizitelor la veterinar, vaccinărilor și
                    rapoartelor medicale ale animalului tău. Totul într-un singur loc, oricând ai nevoie.
                </p>
                <ul className="features">
                    <li>📂 Salvezi cu ușurință rapoartele medicale </li>
                    <li>📅 Ai calendar cu toate vizitele trecute și viitoare</li>
                    <li>🐾 Istoric medical detaliat pentru fiecare animal</li>
                </ul>
                <button onClick={() => navigate('/register')} className="cta-btn">
                    Începe acum să folosesti PetTrack
                </button>
            </div>
        </>
    );
};

export default Home;
