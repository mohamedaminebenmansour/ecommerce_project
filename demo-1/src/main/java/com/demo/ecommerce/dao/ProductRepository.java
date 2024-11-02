package com.demo.ecommerce.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.demo.ecommerce.entity.Product;
import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Long> {

	Page <Product> findByCategoryId(@Param("id") Long id,Pageable peageable);
}
