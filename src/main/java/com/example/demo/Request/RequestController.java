package com.example.demo.Request;

import com.example.demo.customer.Customer;
import com.example.demo.serviceType.ServiceType;
import com.example.demo.customer.CustomerRepository;
import com.example.demo.serviceType.ServiceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="request")
@CrossOrigin("*")
public class RequestController {
    private final RequestService requestService;

private final RequestRepository requestRepository;

private final ServiceTypeRepository serviceTypeRepository;


private final CustomerRepository customerRepository;
    @Autowired
    public RequestController(RequestService requestService, RequestRepository requestRepository, ServiceTypeRepository serviceTypeRepository, CustomerRepository customerRepository) {
        this.requestService = requestService;
        this.requestRepository = requestRepository;
        this.serviceTypeRepository = serviceTypeRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping
    public List<Request> getRequests(){
        return requestService.getRequests();
    }


    @GetMapping("/{idRequest}")
    public Request getRequest(@PathVariable String idRequest){
        return requestService.getRequest(idRequest);
    }



    @PostMapping("/newRequest")
    Request enrollServiceToRequest(
            @RequestBody Form form

    ){
        Customer customer = customerRepository.findById(form.getIdCustomer()).get();
        form.getRequest().setCustomer(customer);

        ServiceType serviceType=serviceTypeRepository.findById(form.getIdServiceType()).get();
        form.getRequest().setServiceType(serviceType);

        return requestRepository.save(form.getRequest());

    }

}




class Form{
    private Request request;
    private Long idCustomer;
    private Long idServiceType;
   public Request getRequest(){return request;}
    public Long getIdCustomer(){return idCustomer;}
    public Long getIdServiceType() {
        return idServiceType;
    }
}