package com.example.demo.customer;

import com.example.demo.Role.Role;
import com.example.demo.review.Review;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.example.demo.Request.Request;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(unique = true)
    private Long idCustomer;
    @Column(unique = true)
    private String phoneNo;

private String name;
private String password;
private String address;

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles = new ArrayList<>();

    public Customer(Long idCustomer, String phoneNo, String name, String password, String address, List<Role> roles) {
        this.idCustomer = idCustomer;
        this.phoneNo = phoneNo;
        this.name = name;
        this.password = password;
        this.address = address;
        this.roles = roles;
        this.reviews = reviews;
        this.requests = requests;
    }

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private List<Review> reviews=new ArrayList<>();

    public Customer(String phoneNo, String password) {
        this.phoneNo = phoneNo;
        this.password = password;
    }

    public List<Request> getRequests() {
        return requests;
    }

    public void setRequests(List<Request> requests) {
        this.requests = requests;
    }

    @OneToMany(mappedBy = "customer")
    private List<Request> requests=new ArrayList<>();


public Customer(){}

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public Long getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(long idCustomer) {
        this.idCustomer = idCustomer;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }




    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    @Override
    public String toString() {
        return "Customer{" +
                "idCustomer=" + idCustomer +
                ", phoneNo='" + phoneNo + '\'' +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", address='" + address + '\'' +
                ", reviews=" + reviews +
                '}';
    }
}
