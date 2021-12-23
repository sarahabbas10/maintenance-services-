package com.example.demo.maintenance_service;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class MaintenanceServiceRepositoryTest {

   private final MaintenanceServiceRepository maintenanceServiceRepository;

    @Autowired
    MaintenanceServiceRepositoryTest(MaintenanceServiceRepository maintenanceServiceRepository) {
        this.maintenanceServiceRepository = maintenanceServiceRepository;
    }

    @Test
    void itShouldFindById() {
        String name="Electronic";
       MaintenanceService maintenanceService=new MaintenanceService(name);
        maintenanceServiceRepository.save(maintenanceService);

        MaintenanceService result= maintenanceServiceRepository.findById(maintenanceService.getIdService()).orElse(null);
        assertNotNull(result);
    }

    @Test
    void itShouldFindByName() {
        MaintenanceService maintenanceService=new MaintenanceService("Phones");
        maintenanceServiceRepository.save(maintenanceService);

        MaintenanceService result= maintenanceServiceRepository.findByName(maintenanceService.getName());
        assertNotNull(result);
    }

    @Test
    void itShouldSaveMaintenanceService() {
        MaintenanceService maintenanceService=new MaintenanceService("Phones");
        MaintenanceService result=  maintenanceServiceRepository.save(maintenanceService);

        assertTrue(result.getIdService() != null);

    }

    @Test
    void itShouldUpdateMaintenanceService() {
        String name="phones";
        MaintenanceService maintenanceService=new MaintenanceService(name);
        maintenanceServiceRepository.save(maintenanceService);
        String name2="Electronic";
        maintenanceService.setName(name2);
        MaintenanceService updateMaintenanceService=maintenanceServiceRepository.findByName(name2);

        assertTrue(updateMaintenanceService.getName()!= name);

    }

    @Test
    void itShouldDeleteMaintenanceService() {
         MaintenanceService maintenanceService=new MaintenanceService("Electrical");
        maintenanceServiceRepository.save(maintenanceService);
        Long id= maintenanceService.getIdService();
        boolean isExistBeforeDelete = maintenanceServiceRepository.findById(id).isPresent();
        maintenanceServiceRepository.deleteById(id);
        boolean notExistAfterDelete =maintenanceServiceRepository.findById(id).isPresent();
        assertTrue(isExistBeforeDelete);
        assertFalse(notExistAfterDelete);

    }


}