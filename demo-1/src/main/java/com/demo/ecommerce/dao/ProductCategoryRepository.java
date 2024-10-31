package com.demo.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.demo.ecommerce.entity.ProductCategory;

//@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long>{

}
