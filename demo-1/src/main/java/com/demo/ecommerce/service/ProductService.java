package com.demo.ecommerce.service;

import java.util.List;

import com.demo.ecommerce.entity.Product;

public interface ProductService {

	List<Product> findAll();
	
	Product findById(long theId);
	
	Product save(Product theEmployee);
	
	void DeleteById(long theId);
}
