package com.example.demo.maintenance_service;

import com.example.demo.Request.Request;
import com.example.demo.customer.Customer;
import com.example.demo.review.Review;
import com.example.demo.serviceType.ServiceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaintenanceService_Service {

    private final MaintenanceServiceRepository maintenanceServiceRepository;

    @Autowired
    public MaintenanceService_Service(MaintenanceServiceRepository maintenanceServiceRepository) {
        this.maintenanceServiceRepository = maintenanceServiceRepository;
    }


    public List<MaintenanceService> getServices(){
        return maintenanceServiceRepository.findAll();
    }

    public MaintenanceService getService(String name){
        return maintenanceServiceRepository.findByName(name);
    }

    public MaintenanceService addService(MaintenanceService maintenanceService){
        return  maintenanceServiceRepository.save(maintenanceService);
    }
    public void updateMaintenanceService(String id, MaintenanceService data) {
        Long service_id = Long.parseLong(id);
        MaintenanceService maintenanceService = maintenanceServiceRepository.findById(service_id).orElse(null);
        if (data != null)
        maintenanceService.setName(data.getName());
        maintenanceService.setImgUrl(data.getImgUrl());
        maintenanceServiceRepository.save(data);
    }

    public void deleteMaintenanceService(String id) {
        Long maintenanceService_id = Long.parseLong(id);
        maintenanceServiceRepository.deleteById(maintenanceService_id);
    }

    public List<ServiceType> getAllServiceType(String  name){
        MaintenanceService maintenanceService=maintenanceServiceRepository.findByName(name);
        return maintenanceService.getServiceTypes();
    }

    public List<Review> getAllReview(String  name){
        MaintenanceService maintenanceService=maintenanceServiceRepository.findByName(name);
        return maintenanceService.getReviews();
    }
}
