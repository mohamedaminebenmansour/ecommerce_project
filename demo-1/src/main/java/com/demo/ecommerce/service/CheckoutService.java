package com.demo.ecommerce.service;

import com.demo.ecommerce.dto.Purchase;
import com.demo.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
