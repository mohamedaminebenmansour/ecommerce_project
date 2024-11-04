package com.demo.ecommerce.dto;

import java.util.Set;

import com.demo.ecommerce.entity.Address;
import com.demo.ecommerce.entity.Customer;
import com.demo.ecommerce.entity.Order;
import com.demo.ecommerce.entity.OrderItem;

import lombok.Data;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
