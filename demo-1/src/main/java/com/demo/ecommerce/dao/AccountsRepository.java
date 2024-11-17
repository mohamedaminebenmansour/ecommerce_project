package com.demo.ecommerce.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.ecommerce.entity.Accounts;

@Repository
public interface AccountsRepository extends CrudRepository<Accounts, Long> {

    Accounts findByCustomerId(long customerId);

}
