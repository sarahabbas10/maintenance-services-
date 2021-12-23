package com.example.demo.serviceType;

import com.example.demo.maintenance_service.MaintenanceService;
import com.example.demo.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceTypeRepository extends JpaRepository<ServiceType, Long> {
    public ServiceType findByName(String name);
}
