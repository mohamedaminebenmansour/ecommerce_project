package com.demo.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.ecommerce.entity.Country;

public interface CountryRepository extends JpaRepository<Country, Integer> {
}
