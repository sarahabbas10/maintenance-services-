package com.example.demo.Request;

import com.example.demo.customer.Customer;
import com.example.demo.maintenance_service.MaintenanceService;
import com.example.demo.serviceType.ServiceType;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "request")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idRequest ;
    private String  requestState ;
    private Date date;
    private String time;
    private String comment;


    @ManyToOne(fetch=FetchType.EAGER,optional = true)
    private ServiceType serviceType;


    @ManyToOne(fetch=FetchType.EAGER,optional = true)
    @JsonIgnore
    private Customer customer;


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

public Request(){}


    public Request(Long idRequest, String requestState, String comment) {
        this.idRequest = idRequest;
        this.requestState = requestState;
        this.comment = comment;

    }
    public Long getIdRequest() {
        return idRequest;
    }

    public void setIdRequest(Long idRequest) {
        this.idRequest = idRequest;
    }

    public String getRequestState() {
        return requestState;
    }

    public void setRequestState(String requestState) {
        this.requestState = requestState;
    }

    public ServiceType getServiceType() {
        return serviceType;
    }

    public void setServiceType(ServiceType serviceType) {
        this.serviceType = serviceType;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }


    @Override
    public String toString() {
        return "Request{" +
                "idRequest=" + idRequest +
                ", requestState='" + requestState + '\'' +
                ", date=" + date +
                ", time='" + time + '\'' +
                ", comment='" + comment + '\'' +
                "Service Type=" +serviceType+
                ", customer=" + customer +
                '}';
    }
}
