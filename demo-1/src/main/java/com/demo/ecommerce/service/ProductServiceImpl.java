package com.demo.ecommerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.demo.ecommerce.dao.ProductRepository;
import com.demo.ecommerce.entity.Product;

import jakarta.transaction.Transactional;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository theProductRepository) {
        productRepository = theProductRepository;
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product findById(long theId) {
        Optional<Product> result = productRepository.findById(theId);
        Product theProduct = null;
        
        if (result.isPresent()) {
            theProduct = result.get();
        } else {
            throw new RuntimeException("Did not find product with id - " + theId);
        }
        return theProduct;
    }

    @Transactional
    @Override
    public Product save(Product theProduct) {
        return productRepository.save(theProduct);
    }

    @Transactional
	@Override
	public void deleteById(long theId) {
		// TODO Auto-generated method stub
		productRepository.deleteById(theId);
	}
    
    @Override
    public Page<Product> findByCategoryId(Long id, Pageable pageable) {
        return productRepository.findByCategoryId(id, pageable);
    }
    
    @Override
    public Page<Product> findByNameContaining(String name, Pageable pageable) {
        return productRepository.findByNameContaining(name, pageable);
    }
}

