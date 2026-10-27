package com.mylife.restaurant.service;
import com.mylife.restaurant.entity.*;
import com.mylife.restaurant.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orders; private final MenuItemRepository menu;
    public OrderService(OrderRepository orders, MenuItemRepository menu){this.orders=orders;this.menu=menu;}
    public record ItemRequest(Long menuItemId, Integer quantity) {}
    public record OrderRequest(String customerName, String phone, String address, List<ItemRequest> items) {}
    @Transactional
    public CustomerOrder place(OrderRequest req) {
        if(req.customerName()==null || req.customerName().isBlank() || req.phone()==null || req.phone().isBlank() || req.address()==null || req.address().isBlank())
            throw new IllegalArgumentException("Customer name, phone and address are required");
        if(req.items()==null || req.items().isEmpty()) throw new IllegalArgumentException("Your cart is empty");
        CustomerOrder order=new CustomerOrder(); order.setCustomerName(req.customerName().trim()); order.setPhone(req.phone().trim()); order.setAddress(req.address().trim()); order.setOrderDate(LocalDateTime.now()); order.setStatus("PLACED");
        BigDecimal total=BigDecimal.ZERO;
        for(ItemRequest r:req.items()){
            if(r.quantity()==null || r.quantity()<1 || r.quantity()>50) throw new IllegalArgumentException("Quantity must be between 1 and 50");
            MenuItem m=menu.findById(r.menuItemId()).orElseThrow(()->new IllegalArgumentException("Menu item not found: "+r.menuItemId()));
            if(!m.isAvailable()) throw new IllegalArgumentException(m.getName()+" is currently unavailable");
            order.addItem(new OrderItem(m.getId(),m.getName(),r.quantity(),m.getPrice()));
            total=total.add(m.getPrice().multiply(BigDecimal.valueOf(r.quantity())));
        }
        order.setTotalAmount(total);
        return orders.save(order);
    }
    public List<CustomerOrder> all(){return orders.findAllByOrderByOrderDateDesc();}
    public CustomerOrder one(Long id){return orders.findById(id).orElseThrow(()->new IllegalArgumentException("Order not found: "+id));}
    public CustomerOrder status(Long id,String status){
        if(!List.of("PLACED","ACCEPTED","PREPARING","OUT_FOR_DELIVERY","COMPLETED","CANCELLED").contains(status)) throw new IllegalArgumentException("Invalid order status");
        CustomerOrder o=one(id); o.setStatus(status); return orders.save(o);
    }
}
