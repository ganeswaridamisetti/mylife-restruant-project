package com.mylife.restaurant.controller;
import com.mylife.restaurant.entity.CustomerOrder;
import com.mylife.restaurant.service.OrderService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/orders") @CrossOrigin(origins="http://localhost:5173")
public class OrderController {
    private final OrderService service;
    public OrderController(OrderService service){this.service=service;}
    @PostMapping public CustomerOrder place(@RequestBody OrderService.OrderRequest req){return service.place(req);}
    @GetMapping public List<CustomerOrder> all(){return service.all();}
    @GetMapping("/{id}") public CustomerOrder one(@PathVariable Long id){return service.one(id);}
    public record StatusRequest(String status) {}
    @PatchMapping("/{id}/status") public CustomerOrder status(@PathVariable Long id,@RequestBody StatusRequest req){return service.status(id,req.status());}
}
