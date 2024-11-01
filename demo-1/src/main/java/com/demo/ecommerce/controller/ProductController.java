package com.demo.ecommerce.controller;

import com.demo.ecommerce.entity.Product;
import com.demo.ecommerce.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<Product> findAll() {
        return productService.findAll();
    }

    @GetMapping("/products/{productId}")
    public Product getProduct(@PathVariable Long productId) {
        Product product = productService.findById(productId);
        if (product == null) {
            throw new RuntimeException("Product ID not found - " + productId);
        }
        return product;
    }

    @PostMapping("/products")
    public Product addProduct(@RequestBody Product product) {
        product.setId(null); // Force a save operation instead of update
        return productService.save(product);
    }

    @PutMapping("/products")
    public Product updateProduct(@RequestBody Product product) {
        return productService.save(product);
    }

    @DeleteMapping("/products/{productId}")
    public String deleteProduct(@PathVariable Long productId) {
        Product product = productService.findById(productId);
        if (product == null) {
            throw new RuntimeException("Product ID not found - " + productId);
        }
        productService.deleteById(productId);
        return "Deleted Product ID - " + productId;
    }
}
