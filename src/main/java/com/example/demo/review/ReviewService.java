package com.example.demo.review;

import com.example.demo.customer.Customer;
import com.example.demo.customer.CustomerRepository;
import com.example.demo.maintenance_service.MaintenanceService;
import com.example.demo.maintenance_service.MaintenanceServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final MaintenanceServiceRepository maintenanceServiceRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, MaintenanceServiceRepository maintenanceServiceRepository, CustomerRepository customerRepository) {
        this.reviewRepository = reviewRepository;
        this.maintenanceServiceRepository=maintenanceServiceRepository;
        this.customerRepository = customerRepository;
    }

    public List<Review> getReviewsList(){
            return reviewRepository.findAll();
    }

    public List<Review> getReviewsListByMaintenanceName(String name){
        return reviewRepository.findByMaintenanceService(name);
    }

    public String deleteReview(String id){
        Long review_id = Long.parseLong(id);
        if(reviewRepository.findById(review_id) !=null){
        reviewRepository.deleteById(review_id);

        }
        else
            return "Not found";

        return "True";
    }



    public Review saveReview(Review review,Long idMaintenanceService,Long idCustomer){
        MaintenanceService maintenanceService=maintenanceServiceRepository.findById(idMaintenanceService).orElse(null);
        review.setMaintenanceService(maintenanceService);

        Customer customer=customerRepository.findById(idCustomer).orElse(null);
        review.setCustomer(customer);

        return reviewRepository.save(review);
    }


}


