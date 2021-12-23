package com.example.demo.customer;


import com.example.demo.Request.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="customer")
@CrossOrigin("*")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/{id}")
    public Customer getCustomer(@PathVariable String id){
        return customerService.getCustomer(id);
    }


    @GetMapping("/request/{phoneNo}")
    public List<Request> getAllRequest(@PathVariable String phoneNo){
        return customerService.getAllRequest(phoneNo);
    }


    @GetMapping
    public List<Customer> getCustomers(){
        return customerService.getCustomers();

    }


    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable String id){
        System.out.println(id);
        return customerService.deleteCustomer(id);

    }


    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable String id, @RequestBody Customer data){
       return customerService.updateCustomer(id, data);
    }

    @PostMapping
    public Customer register(@RequestBody Form form){
        return customerService.register(form);
    }


}

class Form {


    private Customer customer;
    private Long role_id;

    public Customer getCustomer() {
        return customer;
    }

    public Long getRole_id() {
        return role_id;
    }
}