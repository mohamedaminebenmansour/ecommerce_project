package com.demo.ecommerce.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.ecommerce.dao.StateRepository;
import com.demo.ecommerce.entity.State;


@Service
public class StateServiceImpl implements StateService {

    private final StateRepository stateRepository;

    @Autowired
    public StateServiceImpl(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    @Override
    public List<State> getAllStates() {
        return stateRepository.findAll();
    }

    @Override
    public State getStateById(Integer id) {
        Optional<State> state = stateRepository.findById(id);
        return state.orElse(null);
    }

    @Override
    public List<State> getStatesByCountryCode(String code) {
        return stateRepository.findByCountryCode(code);
    }

    @Override
    public State saveState(State state) {
        return stateRepository.save(state);
    }

    @Override
    public void deleteStateById(Integer id) {
        stateRepository.deleteById(id);
    }
}
