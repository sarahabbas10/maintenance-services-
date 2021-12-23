package com.example.demo.serviceType;

import com.example.demo.Request.Request;
import com.example.demo.maintenance_service.MaintenanceService;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "serviceType")
public class ServiceType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idServiceType;
    @Column(unique = true)
    private String name;


    @JsonIgnore
    @ManyToOne(fetch=FetchType.EAGER,optional = true)
    private MaintenanceService maintenanceService;


    private String imgUrl;

    @JsonIgnore
    @OneToMany(mappedBy = "serviceType")
    private List<Request> request=new ArrayList<>();

    public ServiceType(){}

    public ServiceType(Long idServiceType, String name,String imgUrl) {
        this.idServiceType = idServiceType;
        this.name = name;

        this.imgUrl=imgUrl;
    }


    public List<Request> getRequest() {
        return request;
    }

    public void setRequest(List<Request> request) {
        this.request = request;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public Long getIdServiceType() {
        return idServiceType;
    }

    public void setIdServiceType(long idServiceType) {
        this.idServiceType = idServiceType;
    }
    public MaintenanceService getMaintenanceService() {
        return maintenanceService;
    }

    public void setMaintenanceService(MaintenanceService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @Override
    public String toString() {
        return "ServiceType{" +
                "idServiceType=" + idServiceType +
                ", name='" + name + '\'' +
                ", maintenanceService=" + maintenanceService +
                ", imgUrl='" + imgUrl + '\'' +
                ", request=" + request +
                '}';
    }


}

