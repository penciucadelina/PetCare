package com.petcare.petcare.Service;

import com.petcare.petcare.Entity.MedicalRecord;
import com.petcare.petcare.Repository.MedicalRecordRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;

    public MedicalRecordService(MedicalRecordRepository medicalRecordRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
    }

    public List<MedicalRecord> getByPetId(Long petId) {
        return medicalRecordRepository.findByPetId(petId);
    }

    public MedicalRecord save(MedicalRecord record) {
        return medicalRecordRepository.save(record);
    }

    public void delete(Long id) {
        medicalRecordRepository.deleteById(id);
    }
    public Optional<MedicalRecord> findById(Long id) {
        return medicalRecordRepository.findById(id);
    }
}