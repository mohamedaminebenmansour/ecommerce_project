package com.demo.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.ecommerce.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
