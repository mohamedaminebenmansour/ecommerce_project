package com.demo.ecommerce.service;
import com.demo.ecommerce.entity.Customer;
import com.demo.ecommerce.entity.Order;
import com.demo.ecommerce.dao.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    @Override
    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Long id, Customer customer) {
        return customerRepository.findById(id)
                .map(existingCustomer -> {
                    existingCustomer.setFirstName(customer.getFirstName());
                    existingCustomer.setLastName(customer.getLastName());
                    existingCustomer.setEmail(customer.getEmail());

                    if (customer.getOrders() != null) {
                        existingCustomer.getOrders().clear();
                        customer.getOrders().forEach(existingCustomer::add);
                    }

                    return customerRepository.save(existingCustomer);
                })
                .orElseThrow(() -> new RuntimeException("Customer not found with id " + id));
    }

    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    @Override
    public void addOrderToCustomer(Long customerId, Order order) {
        customerRepository.findById(customerId).ifPresent(customer -> {
            customer.add(order);
            customerRepository.save(customer);
        });
    }

    @Override
    public List<Order> getOrdersByCustomerId(Long customerId) {
        return customerRepository.findById(customerId)
                .map(Customer::getOrders)
                .map(List::copyOf) // Convert Set<Order> to List<Order>
                .orElseThrow(() -> new RuntimeException("Customer not found with id " + customerId));
    }
}
