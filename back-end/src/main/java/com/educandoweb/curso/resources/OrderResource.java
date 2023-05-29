package com.educandoweb.curso.resources;

import com.educandoweb.curso.entities.Order;
import com.educandoweb.curso.repositories.OrderRepository;
import com.educandoweb.curso.services.OrderService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/orders")
public class OrderResource {
	@Autowired
	private OrderService service;

	@Autowired
	private OrderRepository orderRepository;

	@GetMapping
	public ResponseEntity<List<Order>> findAll() {
		List<Order> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Order> findById(@PathVariable Long id) {
		Order obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}

	@PostMapping
	public ResponseEntity<Order> createOrder(@RequestBody Order order) {
		Order savedOrder = orderRepository.save(order);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
	}

	@CrossOrigin(origins = "*")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
		Order order = orderRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));

		// Excluir o pedido
		orderRepository.delete(order);

		return ResponseEntity.noContent().build();
	}
}
