package com.example.demo.customer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;



import static org.junit.jupiter.api.Assertions.*;
@DataJpaTest
class CustomerRepositoryTest {

    private final CustomerRepository customerRepository;



    @Autowired
    public CustomerRepositoryTest(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;

    }

    @Test
    void itShouldFindById() {
        String phoneNo="05050";
        Customer customer=new Customer("05050","123");
        customerRepository.save(customer);

        Customer result= customerRepository.findById(customer.getIdCustomer()).orElse(null);
       assertNotNull(result);
    }

    @Test
    void itShouldSaveCustomer() {
        Customer customer=new Customer("05050","123");
        Customer result=  customerRepository.save(customer);

        assertTrue(result.getIdCustomer() !=null);
    }

    @Test
    void itShouldFindCustomerByPhoneNo() {
        String phoneNo="05050";
        Customer customer=new Customer("05050","123");
        customerRepository.save(customer);

        Customer result= customerRepository.findByPhoneNo(phoneNo);

        assertEquals(phoneNo,result.getPhoneNo());
        assertNotEquals("089787",result.getPhoneNo());
    }
    @Test
     void itShouldUpdateCustomer() {
        String phoneNo1="05050";
        Customer customer=new Customer(phoneNo1,"123");
        customerRepository.save(customer);
        String phoneNo2="0557200787";
        customer.setPhoneNo(phoneNo2);
        Customer updateCustomer=customerRepository.findByPhoneNo(phoneNo2);

    assertTrue(updateCustomer.getPhoneNo()!= phoneNo1);

    }

    @Test
    void itShouldDeleteCustomer() {
         Customer customer=new Customer("05050","123");
         customerRepository.save(customer);
         Long id= customer.getIdCustomer();
         boolean isExistBeforeDelete = customerRepository.findById(id).isPresent();
         customerRepository.deleteById(id);
         boolean notExistAfterDelete =customerRepository.findById(id).isPresent();
         assertTrue(isExistBeforeDelete);
         assertFalse(notExistAfterDelete);

    }
}