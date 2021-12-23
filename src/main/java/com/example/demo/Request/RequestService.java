package com.example.demo.Request;

import com.example.demo.customer.Customer;
import com.example.demo.customer.CustomerRepository;
import com.example.demo.serviceType.ServiceType;
import com.example.demo.serviceType.ServiceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

        private final RequestRepository requestRepository;

        private final CustomerRepository customerRepository;

        private  final ServiceTypeRepository serviceTypeRepository;

    @Autowired
    public RequestService(RequestRepository requestRepository, CustomerRepository customerRepository, ServiceTypeRepository serviceTypeRepository) {
        this.requestRepository = requestRepository;
        this.customerRepository = customerRepository;
        this.serviceTypeRepository = serviceTypeRepository;
    }

    public List<Request> getRequests(){
        return requestRepository.findAll();
    }

        public Request getRequest(String id){
        Long request_iD=Long.parseLong(id);
            return requestRepository.findById(request_iD).orElse(null);
        }


    }


