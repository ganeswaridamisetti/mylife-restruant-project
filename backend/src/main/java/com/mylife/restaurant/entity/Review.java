package com.mylife.restaurant.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name="reviews")
public class Review {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @NotBlank private String customerName;
    @NotNull @Min(1) @Max(5) private Integer rating;
    @NotBlank @Column(length=1500) private String comment;
    private LocalDateTime createdAt = LocalDateTime.now();
    public Review() {}
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getCustomerName(){return customerName;} public void setCustomerName(String v){customerName=v;}
    public Integer getRating(){return rating;} public void setRating(Integer v){rating=v;}
    public String getComment(){return comment;} public void setComment(String v){comment=v;}
    public LocalDateTime getCreatedAt(){return createdAt;} public void setCreatedAt(LocalDateTime v){createdAt=v;}
}
