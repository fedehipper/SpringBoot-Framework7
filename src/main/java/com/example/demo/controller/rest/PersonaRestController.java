package com.example.demo.controller.rest;

import com.example.demo.domain.Persona;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonaRestController {

    @GetMapping("/api/persona")
    public Persona buscarPersona() {
        Persona persona = new Persona();
        persona.setNombre("Nisco");
        persona.setEdad("30");
        return persona;
    }

}
