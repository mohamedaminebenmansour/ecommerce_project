package com.demo.ecommerce.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.demo.ecommerce.entity.State;
import com.demo.ecommerce.service.StateService;


@RestController
@RequestMapping("/api/states")
public class StateController {

    private final StateService stateService;

    @Autowired
    public StateController(StateService stateService) {
        this.stateService = stateService;
    }

    @GetMapping
    public List<State> getAllStates() {
        return stateService.getAllStates();
    }

    @GetMapping("/{id}")
    public ResponseEntity<State> getStateById(@PathVariable Integer id) {
        State state = stateService.getStateById(id);
        return state != null ? ResponseEntity.ok(state) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/country/{code}")
    public List<State> getStatesByCountryCode(@PathVariable String code) {
        return stateService.getStatesByCountryCode(code);
    }

    @PostMapping
    public State createState(@RequestBody State state) {
        return stateService.saveState(state);
    }

    @PutMapping("/{id}")
    public ResponseEntity<State> updateState(@PathVariable Integer id, @RequestBody State state) {
        State existingState = stateService.getStateById(id);
        if (existingState != null) {
            state.setId(id); // Set the ID to the existing state ID
            return ResponseEntity.ok(stateService.saveState(state));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteState(@PathVariable Integer id) {
        stateService.deleteStateById(id);
        return ResponseEntity.noContent().build();
    }
}
