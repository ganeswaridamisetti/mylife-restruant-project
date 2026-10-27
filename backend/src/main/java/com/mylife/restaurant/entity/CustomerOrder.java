package com.mylife.restaurant.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="customer_orders")
public class CustomerOrder {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false) private String customerName;
    @Column(nullable=false) private String phone;
    @Column(nullable=false, length=1000) private String address;
    @Column(nullable=false, precision=10, scale=2) private BigDecimal totalAmount = BigDecimal.ZERO;
    @Column(nullable=false) private String status = "PLACED";
    @Column(nullable=false) private LocalDateTime orderDate = LocalDateTime.now();
    @OneToMany(mappedBy="order", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<OrderItem> items = new ArrayList<>();
    public CustomerOrder() {}
    public void addItem(OrderItem item){ items.add(item); item.setOrder(this); }
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getCustomerName(){return customerName;} public void setCustomerName(String v){customerName=v;}
    public String getPhone(){return phone;} public void setPhone(String v){phone=v;}
    public String getAddress(){return address;} public void setAddress(String v){address=v;}
    public BigDecimal getTotalAmount(){return totalAmount;} public void setTotalAmount(BigDecimal v){totalAmount=v;}
    public String getStatus(){return status;} public void setStatus(String v){status=v;}
    public LocalDateTime getOrderDate(){return orderDate;} public void setOrderDate(LocalDateTime v){orderDate=v;}
    public List<OrderItem> getItems(){return items;} public void setItems(List<OrderItem> v){items=v;}
}
