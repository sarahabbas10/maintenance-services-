package com.example.demo.maintenance_service;

import com.example.demo.review.Review;
import com.example.demo.serviceType.ServiceType;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "maintenanceService")
public class MaintenanceService {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idMaintenanceService ;
    private String name;
    private String imgUrl;

    @OneToMany(mappedBy = "maintenanceService")
    private List<ServiceType> serviceTypes=new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "maintenanceService")
    private List<Review> reviews=new ArrayList<>();

   public MaintenanceService(){}
    public MaintenanceService(String name){}

    public MaintenanceService(long idMaintenanceService, String name ) {
        this.idMaintenanceService = idMaintenanceService;
        this.name = name;

    }

    //getter and setter
    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
    public List<ServiceType> getServiceTypes() {
        return serviceTypes;
    }

    public void setServiceTypes(List<ServiceType> serviceTypes) {
        this.serviceTypes = serviceTypes;
    }


    public Long getIdService() {
        return idMaintenanceService;
    }

    public void setIdService(Long idMaintenanceService) {
        this.idMaintenanceService = idMaintenanceService;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    @Override
    public String toString() {
        return "MaintenanceService{" +
                "idMaintenanceService=" + idMaintenanceService +
                ", name='" + name + '\'' +
                ", imgUrl='" + imgUrl + '\'' +
                ", serviceTypes=" + serviceTypes +
                ", reviews=" + reviews +
                '}';
    }
}

