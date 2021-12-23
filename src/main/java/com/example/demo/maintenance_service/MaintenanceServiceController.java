package com.example.demo.maintenance_service;

import com.example.demo.Request.Request;
import com.example.demo.review.Review;
import com.example.demo.serviceType.ServiceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="maintenanceService")
@CrossOrigin("*")
public class MaintenanceServiceController {

    private final MaintenanceService_Service maintenanceService_service;

    @Autowired
    public MaintenanceServiceController(MaintenanceService_Service maintenanceService_service) {
        this.maintenanceService_service = maintenanceService_service;
    }

    @GetMapping
    public List<MaintenanceService> getServices(){
        return maintenanceService_service.getServices();
    }

    @GetMapping("/{name}")
    public MaintenanceService getService(@PathVariable String name){
        return maintenanceService_service.getService(name);
    }

    @PostMapping
    public MaintenanceService addService(@RequestBody MaintenanceService maintenanceService){
        return maintenanceService_service.addService(maintenanceService);
    }

    @PutMapping("/{id}")
    public void updateMaintenanceService(@PathVariable String id, @RequestBody MaintenanceService maintenanceService) {
        maintenanceService_service.updateMaintenanceService(id, maintenanceService);
    }
    @DeleteMapping("/{id}")
    public void deleteMaintenanceService(@PathVariable String id) {
        maintenanceService_service.deleteMaintenanceService(id);

    }

    @GetMapping("/service/{name}")
    public List<ServiceType> getAllServiceType(@PathVariable String name){
        return maintenanceService_service.getAllServiceType(name);
    }


    @GetMapping("/reviews/{name}")
    public List<Review> getAllReview(@PathVariable String name){
        return maintenanceService_service.getAllReview(name);
    }


}
