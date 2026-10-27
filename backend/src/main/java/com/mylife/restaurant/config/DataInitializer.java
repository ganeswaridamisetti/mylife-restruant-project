package com.mylife.restaurant.config;
import com.mylife.restaurant.entity.MenuItem;
import com.mylife.restaurant.repository.MenuItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;
@Configuration
public class DataInitializer {
    @Bean CommandLineRunner seedMenu(MenuItemRepository repo) {
        return args -> {
            if(repo.count()==0) {
                repo.save(new MenuItem("Chicken Biryani","Biryani","Aromatic rice with chicken and spices",new BigDecimal("250.00"),"https://images.unsplash.com/photo-1563379091339-03246963d96c?w=900",true));
                repo.save(new MenuItem("Veg Biryani","Veg","Flavourful vegetable biryani",new BigDecimal("180.00"),"https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=900",true));
                repo.save(new MenuItem("Chicken 65","Starters","Crispy spicy chicken starter",new BigDecimal("200.00"),"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=900",true));
                repo.save(new MenuItem("Pepper Chicken","Starters","Peppery chicken starter",new BigDecimal("220.00"),"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900",true));
                repo.save(new MenuItem("Chicken Fried Rice","Rice","Wok-tossed rice with chicken",new BigDecimal("200.00"),"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900",true));
                repo.save(new MenuItem("Butter Naan","Breads","Soft naan brushed with butter",new BigDecimal("40.00"),"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=900",true));
            }
        };
    }
}
