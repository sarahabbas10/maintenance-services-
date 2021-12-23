package com.example.demo.review;

import com.example.demo.customer.Customer;
import com.example.demo.maintenance_service.MaintenanceService;

import javax.persistence.*;

@Entity
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idReview ;
    private String comment;


    @ManyToOne(fetch=FetchType.EAGER,optional = true)
    private MaintenanceService maintenanceService;

    @ManyToOne(fetch=FetchType.EAGER,optional = true)
    private Customer customer;

    public Review(){}

    public Long getIdReview() {
        return idReview;
    }

    public void setIdReview(Long idReview) {
        this.idReview = idReview;
    }

    public Review(Long idReview, String comment) {
        this.idReview = idReview;
        this.comment = comment;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public MaintenanceService getMaintenanceService() {
        return maintenanceService;
    }

    public void setMaintenanceService(MaintenanceService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }


    @Override
    public String toString() {
        return "Review{" +
                "idReview=" + idReview +
                ", comment='" + comment + '\'' +
                ", maintenanceService=" + maintenanceService +
                ", customer=" + customer +
                '}';
    }
}
