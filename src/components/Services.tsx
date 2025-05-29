import React from 'react';
import '../styles/Services.css';

const Services = () => {
    return (
        <section className="services">
            <h2>Serviciile Noastre</h2>
            <div className="services-list">
                <div className="service-card">
                    <h3>Consultație</h3>
                    <p>Verificare generală de sănătate pentru animalul tău.</p>
                    <span>Tarif: 100 RON</span>
                </div>
                <div className="service-card">
                    <h3>Vaccinare</h3>
                    <p>Vaccinuri esențiale pentru câini și pisici.</p>
                    <span>Tarif: 80 RON</span>
                </div>
                <div className="service-card">
                    <h3>Toaletaj</h3>
                    <p>Spălare, tuns, periaj profesional.</p>
                    <span>Tarif: 120 RON</span>
                </div>
            </div>
        </section>
    );
};

export default Services;
