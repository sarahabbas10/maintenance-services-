package com.example.demo.maintenance_service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintenanceServiceRepository extends JpaRepository<MaintenanceService, Long> {
public MaintenanceService findByName(String name);

}
