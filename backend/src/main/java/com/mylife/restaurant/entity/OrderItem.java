package com.mylife.restaurant.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.math.BigDecimal;

@Entity
@Table(name="order_items")
public class OrderItem {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @JsonIgnore @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="order_id", nullable=false) private CustomerOrder order;
    @Column(nullable=false) private Long menuItemId;
    @Column(nullable=false) private String itemName;
    @Column(nullable=false) private Integer quantity;
    @Column(nullable=false, precision=10, scale=2) private BigDecimal unitPrice;
    public OrderItem() {}
    public OrderItem(Long menuItemId, String itemName, Integer quantity, BigDecimal unitPrice) {
        this.menuItemId=menuItemId; this.itemName=itemName; this.quantity=quantity; this.unitPrice=unitPrice;
    }
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public CustomerOrder getOrder(){return order;} public void setOrder(CustomerOrder v){order=v;}
    public Long getMenuItemId(){return menuItemId;} public void setMenuItemId(Long v){menuItemId=v;}
    public String getItemName(){return itemName;} public void setItemName(String v){itemName=v;}
    public Integer getQuantity(){return quantity;} public void setQuantity(Integer v){quantity=v;}
    public BigDecimal getUnitPrice(){return unitPrice;} public void setUnitPrice(BigDecimal v){unitPrice=v;}
}
