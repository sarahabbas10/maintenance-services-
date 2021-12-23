package com.example.demo.review;

import com.example.demo.Request.Request;
import com.example.demo.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    public List<Review> findByMaintenanceService(String name);
}
