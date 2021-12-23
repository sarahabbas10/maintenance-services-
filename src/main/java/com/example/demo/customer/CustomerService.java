package com.example.demo.customer;

import com.example.demo.Request.Request;
import com.example.demo.Role.Role;
import com.example.demo.Role.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
@Service
public class CustomerService implements UserDetailsService {

        private final CustomerRepository customerRepository;
        private final RoleRepo roleRepo;
        private final PasswordEncoder passwordEncoder;

        @Autowired
        public CustomerService(CustomerRepository customerRepository, RoleRepo roleRepo, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
            this.roleRepo = roleRepo;
            this.passwordEncoder = passwordEncoder;
        }

    @Override
    public UserDetails loadUserByUsername(String phoneNo) throws UsernameNotFoundException {
        Customer user = customerRepository.findByPhoneNo(phoneNo);
        if(user  == null){
            throw new UsernameNotFoundException("User not found in the database");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getPhoneNo(), user.getPassword(), authorities);
    }


    public List<Customer> getCustomers(){
        return customerRepository.findAll();
    }


        public Customer getCustomer(String id){
            Long customer_id = Long.parseLong(id);
            return customerRepository.findById(customer_id).orElse(null);
        }


        public Customer updateCustomer(String id, Customer data){
            Long customer_id = Long.parseLong(id);
            Customer customer = customerRepository.findById(customer_id).orElse(null);

            if (customer != null){
                customer.setName(data.getName());
                customer.setAddress(data.getAddress());
                customer.setPhoneNo(data.getPhoneNo());
                customerRepository.save(customer);
            }
           return customer;
        }


public Customer register(Form form){
    Customer user = form.getCustomer();
    Long role_id = form.getRole_id();
    Role role = roleRepo.findById(role_id).orElse(null);

    user.getRoles().add(role);
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    return customerRepository.save(user);
}
        public List<Request> getAllRequest(String  phoneNo){
            Customer customer=customerRepository.findByPhoneNo(phoneNo);
            return customer.getRequests();
        }

    public String deleteCustomer(String id){

            Long customer_id = Long.parseLong(id);
            if(customerRepository.findById(customer_id) !=null){
                customerRepository.deleteById(customer_id);

            }
            else
                return "Not found";

            return "True";
        }
    }






