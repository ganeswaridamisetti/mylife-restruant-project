package com.mylife.restaurant.controller;

import com.mylife.restaurant.entity.MenuItem;
import com.mylife.restaurant.service.MenuService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:5173")
public class MenuController {
	private final MenuService service;

	public MenuController(MenuService service) {
		this.service = service;
	}

	@GetMapping
	public List<MenuItem> all(@RequestParam(required = false) String q,
			@RequestParam(required = false) String category) {
		return service.all(q, category);
	}

	@GetMapping("/{id}")
	public MenuItem one(@PathVariable Long id) {
		return service.one(id);
	}

	@PostMapping
	public MenuItem create(@Valid @RequestBody MenuItem item) {
		item.setId(null);
		return service.save(item);
	}

	@PutMapping("/{id}")
	public MenuItem update(@PathVariable Long id, @Valid @RequestBody MenuItem item) {
		return service.update(id, item);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
