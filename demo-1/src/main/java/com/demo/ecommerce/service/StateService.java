package com.demo.ecommerce.service;

import java.util.List;

import com.demo.ecommerce.entity.State;

public interface StateService {
    List<State> getAllStates();
    State getStateById(Integer id);
    List<State> getStatesByCountryCode(String code);
    State saveState(State state);
    void deleteStateById(Integer id);
}
