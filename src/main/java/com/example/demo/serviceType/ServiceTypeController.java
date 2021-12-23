package com.example.demo.serviceType;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping(path="serviceType")
@CrossOrigin("*")
public class ServiceTypeController {

    private final ServiceTypeService serviceTypeService;

    @Autowired
    public ServiceTypeController(ServiceTypeService serviceTypeService) {
        this.serviceTypeService = serviceTypeService;
    }

    @GetMapping
    public List<ServiceType> getServiceType() {
        return serviceTypeService.getAllServiceType();
    }

    @GetMapping("/{name}")
    public ServiceType getServiceType(@PathVariable String name) {
        return serviceTypeService.getServiceType(name);
    }

    @PutMapping("service/{id}")
    public void updateServiceType(@PathVariable String id, @RequestBody ServiceType serviceType) {
        serviceTypeService.updateServiceType(id,serviceType);
    }


    @DeleteMapping("/{id}")
    public void deleteServiceType(@PathVariable String id) {
        serviceTypeService.deleteServiceType(id);
    }

    @PostMapping
    public ServiceType addServiceType(@RequestBody Form form){
        return serviceTypeService.addServiceType(form.getServiceType(),form.getIdMaintenanceService());
    }

}

class Form{
    private ServiceType serviceType;
    private Long idMaintenanceService;
    public Long getIdMaintenanceService() {return idMaintenanceService;}
    public ServiceType getServiceType(){return serviceType;}
}