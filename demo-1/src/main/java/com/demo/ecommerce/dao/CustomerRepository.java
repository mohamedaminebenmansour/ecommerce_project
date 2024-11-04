package com.demo.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.ecommerce.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
