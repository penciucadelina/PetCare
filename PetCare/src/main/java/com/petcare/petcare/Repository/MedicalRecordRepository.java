package com.petcare.petcare.Repository;

import com.petcare.petcare.Entity.MedicalRecord;
import com.petcare.petcare.Entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    List<MedicalRecord> findByPetId(Long petId);

}