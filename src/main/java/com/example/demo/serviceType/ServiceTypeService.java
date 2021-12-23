package com.example.demo.serviceType;

import com.example.demo.maintenance_service.MaintenanceService;import com.example.demo.maintenance_service.MaintenanceServiceController;
import com.example.demo.maintenance_service.MaintenanceServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ServiceTypeService {
    private final ServiceTypeRepository serviceTypeRepository;
    private final MaintenanceServiceRepository maintenanceServiceRepository;

    @Autowired
    public ServiceTypeService(ServiceTypeRepository serviceTypeRepository, MaintenanceServiceRepository maintenanceServiceRepository) {
        this.serviceTypeRepository = serviceTypeRepository;
        this.maintenanceServiceRepository = maintenanceServiceRepository;
    }

    public ServiceType getServiceType(String name) {

        return serviceTypeRepository.findByName(name);
    }

    public List<ServiceType> getAllServiceType(){
        return serviceTypeRepository.findAll();
    }


    public ServiceType addServiceType(ServiceType serviceType,Long idMaintenanceService){
        MaintenanceService maintenanceServiceController=maintenanceServiceRepository.findById(idMaintenanceService).orElse(null);
        serviceType.setMaintenanceService(maintenanceServiceController);
        return serviceTypeRepository.save(serviceType);
    }

    public void updateServiceType(String id, ServiceType data) {
        Long service_id = Long.parseLong(id);
        ServiceType serviceType = serviceTypeRepository.findById(service_id).orElse(null);
        if (data != null)
            serviceType.setName(data.getName());
            serviceType.setImgUrl(data.getImgUrl());

        serviceTypeRepository.save(data);
    }

    public void deleteServiceType(String id) {
        Long maintenanceService_id = Long.parseLong(id);
        serviceTypeRepository.deleteById(maintenanceService_id);
    }

}
