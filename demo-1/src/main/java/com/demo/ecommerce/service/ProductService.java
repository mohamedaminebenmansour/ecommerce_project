package com.demo.ecommerce.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.demo.ecommerce.entity.Product;

public interface ProductService {

	List<Product> findAll();
	
	Product findById(long theId);
	
	Product save(Product theEmployee);
	
	void deleteById(long theId);

	Page<Product> findByCategoryId(Long id, Pageable pageable);
}
