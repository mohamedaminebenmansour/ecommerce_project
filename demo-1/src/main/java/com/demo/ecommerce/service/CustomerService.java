package com.demo.ecommerce.service;

import java.util.List;
import java.util.Optional;

import com.demo.ecommerce.entity.Customer;
import com.demo.ecommerce.entity.Order;

public interface CustomerService {
    List<Customer> getAllCustomers();
    Optional<Customer> getCustomerById(Long id);
    Customer saveCustomer(Customer customer);
    Customer updateCustomer(Long id, Customer customer);
    void deleteCustomer(Long id);

    // Order-related methods
    void addOrderToCustomer(Long customerId, Order order);
    List<Order> getOrdersByCustomerId(Long customerId);
}

