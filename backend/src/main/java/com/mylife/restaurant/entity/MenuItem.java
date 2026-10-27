package com.mylife.restaurant.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Table(name = "menu_items")
public class MenuItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank private String name;
    @NotBlank private String category;
    @Column(length = 1000) private String description;
    @NotNull @DecimalMin("0.0") @Digits(integer = 8, fraction = 2) private BigDecimal price;
    private String imageUrl;
    private boolean available = true;

    public MenuItem() {}
    public MenuItem(String name, String category, String description, BigDecimal price, String imageUrl, boolean available) {
        this.name=name; this.category=category; this.description=description; this.price=price; this.imageUrl=imageUrl; this.available=available;
    }
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getName(){return name;} public void setName(String name){this.name=name;}
    public String getCategory(){return category;} public void setCategory(String category){this.category=category;}
    public String getDescription(){return description;} public void setDescription(String description){this.description=description;}
    public BigDecimal getPrice(){return price;} public void setPrice(BigDecimal price){this.price=price;}
    public String getImageUrl(){return imageUrl;} public void setImageUrl(String imageUrl){this.imageUrl=imageUrl;}
    public boolean isAvailable(){return available;} public void setAvailable(boolean available){this.available=available;}
}
