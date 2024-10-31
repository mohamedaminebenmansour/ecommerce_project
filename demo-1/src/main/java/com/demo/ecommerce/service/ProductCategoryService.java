package com.demo.ecommerce.service;

import com.demo.ecommerce.entity.ProductCategory;
import java.util.List;

public interface ProductCategoryService {
    
    List<ProductCategory> getAllProductCategories();

    ProductCategory getProductCategoryById(Long id);

    ProductCategory saveProductCategory(ProductCategory productCategory);

    void deleteProductCategory(Long id);
}
