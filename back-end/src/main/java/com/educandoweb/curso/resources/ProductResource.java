package com.educandoweb.curso.resources;

import com.educandoweb.curso.entities.Product;
import com.educandoweb.curso.repositories.ProductRepository;
import com.educandoweb.curso.services.ProductService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/products")
public class ProductResource {
	@Autowired
	private ProductService service;

	@Autowired
	private ProductRepository productRepository;

	@GetMapping
	public ResponseEntity<List<Product>> findAll() {
		List<Product> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/{id}")
	public ResponseEntity<Product> findById(@PathVariable Long id) {
		Product obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}


	@PostMapping
	public ResponseEntity<Product> createProduct(@RequestBody Product product) {
		Product savedProduct = service.createProduct(product);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
	}

	@PutMapping(value = "/{id}/{quantity}")
	@CrossOrigin(origins = "*")
	public ResponseEntity<Product> putProductConsume(@PathVariable Long id, @PathVariable int quantity) {
		Product updatedProduct = service.updateProductQuantity(id, quantity);

		return ResponseEntity.status(HttpStatus.OK).body(updatedProduct);
	}

	@CrossOrigin(origins = "*")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));

		// Excluir o produto
		productRepository.delete(product);

		return ResponseEntity.noContent().build();
	}
}
