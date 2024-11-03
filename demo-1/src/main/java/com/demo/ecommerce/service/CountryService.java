package com.demo.ecommerce.service;

import java.util.List;

import com.demo.ecommerce.entity.Country;

public interface CountryService {
    List<Country> getAllCountries();
    Country getCountryById(Integer id);
    Country saveCountry(Country country);
    void deleteCountryById(Integer id);
}
