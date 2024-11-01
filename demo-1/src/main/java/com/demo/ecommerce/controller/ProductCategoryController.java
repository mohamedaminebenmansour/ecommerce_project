package com.demo.ecommerce.controller;

import com.demo.ecommerce.entity.ProductCategory;
import com.demo.ecommerce.service.ProductCategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;

    public ProductCategoryController(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    @GetMapping("/product-categories")
    public List<ProductCategory> findAll() {
        return productCategoryService.getAllProductCategories();
    }

    @GetMapping("/product-categories/{categoryId}")
    public ProductCategory getProductCategory(@PathVariable Long categoryId) {
        ProductCategory productCategory = productCategoryService.getProductCategoryById(categoryId);
        if (productCategory == null) {
            throw new RuntimeException("ProductCategory ID not found - " + categoryId);
        }
        return productCategory;
    }

    @PostMapping("/product-categories")
    public ProductCategory addProductCategory(@RequestBody ProductCategory productCategory) {
        productCategory.setId(null); // Force a save operation instead of update
        return productCategoryService.saveProductCategory(productCategory);
    }

    @PutMapping("/product-categories")
    public ProductCategory updateProductCategory(@RequestBody ProductCategory productCategory) {
        return productCategoryService.saveProductCategory(productCategory);
    }

    @DeleteMapping("/product-categories/{categoryId}")
    public String deleteProductCategory(@PathVariable Long categoryId) {
        ProductCategory productCategory = productCategoryService.getProductCategoryById(categoryId);
        if (productCategory == null) {
            throw new RuntimeException("ProductCategory ID not found - " + categoryId);
        }
        productCategoryService.deleteProductCategory(categoryId);
        return "Deleted ProductCategory ID - " + categoryId;
    }
}
