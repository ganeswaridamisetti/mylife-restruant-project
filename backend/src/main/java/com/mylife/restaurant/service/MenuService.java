package com.mylife.restaurant.service;
import com.mylife.restaurant.entity.MenuItem;
import com.mylife.restaurant.repository.MenuItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class MenuService {
    private final MenuItemRepository repo;
    public MenuService(MenuItemRepository repo){this.repo=repo;}
    public List<MenuItem> all(String q, String category) {
        List<MenuItem> items = (q != null && !q.isBlank()) ? repo.findByNameContainingIgnoreCase(q.trim()) :
            (category != null && !category.isBlank()) ? repo.findByCategoryIgnoreCase(category.trim()) : repo.findAll();
        if (category != null && !category.isBlank() && q != null && !q.isBlank())
            items = items.stream().filter(i -> i.getCategory().equalsIgnoreCase(category.trim())).toList();
        return items;
    }
    public MenuItem one(Long id){return repo.findById(id).orElseThrow(()->new IllegalArgumentException("Menu item not found: "+id));}
    public MenuItem save(MenuItem item){return repo.save(item);}
    public MenuItem update(Long id, MenuItem input){MenuItem old=one(id); old.setName(input.getName()); old.setCategory(input.getCategory()); old.setDescription(input.getDescription()); old.setPrice(input.getPrice()); old.setImageUrl(input.getImageUrl()); old.setAvailable(input.isAvailable()); return repo.save(old);}
    public void delete(Long id){if(!repo.existsById(id)) throw new IllegalArgumentException("Menu item not found: "+id); repo.deleteById(id);}
}
