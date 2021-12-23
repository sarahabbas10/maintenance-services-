package com.example.demo.Role;

import com.example.demo.customer.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "roles")
@CrossOrigin("*")
public class RoleController {

    private final RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping
    public Role saveRole(@RequestBody Role role){
        return roleService.saveRole(role);
    }

    @GetMapping
    public List<Role> getRoles(){
        return roleService.getRoles();

    }
}
