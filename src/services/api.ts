

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// Autentificare
export const AUTH_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
};

//  Animale
export const PET_ENDPOINTS = {
    BASE: `${API_BASE_URL}/api/pets`,
    BY_ID: (id: number) => `${API_BASE_URL}/api/pets/${id}`,
};

// Rapoarte medicale
export const MEDICAL_RECORD_ENDPOINTS = {
    BASE: `${API_BASE_URL}/medical-records`,
    BY_ID: (id: number) => `${API_BASE_URL}/medical-records/${id}`,
    BY_PET: (petId: number) => `${API_BASE_URL}/medical-records/pet/${petId}`,
};

//  Programari
export const APPOINTMENT_ENDPOINTS = {
    BASE: `${API_BASE_URL}/api/appointments`,
    BY_ID: (id: number) => `${API_BASE_URL}/api/appointments/${id}`,
    BY_PET: (petId: number) => `${API_BASE_URL}/api/appointments/pet/${petId}`,
};

//  Utilizatori
export const USER_ENDPOINTS = {
    BASE: `${API_BASE_URL}/api/users`,
    BY_ID: (id: number) => `${API_BASE_URL}/api/users/${id}`,

    PROFILE: `${API_BASE_URL}/api/user/profile`,
    EMAIL: `${API_BASE_URL}/api/user/email`,
    PHONE: `${API_BASE_URL}/api/user/phone`,
    PASSWORD: `${API_BASE_URL}/api/user/change-password`,
};

