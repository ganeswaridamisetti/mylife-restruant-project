package com.mylife.restaurant.controller;
import com.mylife.restaurant.entity.Review;
import com.mylife.restaurant.repository.ReviewRepository;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/reviews") @CrossOrigin(origins="http://localhost:5173")
public class ReviewController {
    private final ReviewRepository repo;
    public ReviewController(ReviewRepository repo){this.repo=repo;}
    @GetMapping public List<Review> all(){return repo.findAllByOrderByCreatedAtDesc();}
    @PostMapping public Review create(@Valid @RequestBody Review review){review.setId(null);return repo.save(review);}
}
