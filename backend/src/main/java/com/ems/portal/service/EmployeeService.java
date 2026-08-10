package com.ems.portal.service;

import com.ems.portal.model.Employee;
import com.ems.portal.model.User;
import com.ems.portal.model.UserRole;
import com.ems.portal.repository.EmployeeRepository;
import com.ems.portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Optional<Employee> getEmployeeByUserId(Long userId) {
        return employeeRepository.findByUserId(userId);
    }

    public Employee saveEmployee(Employee employee) {
        if (employee.getUser() != null && employee.getUser().getId() == null) {
            User user = employee.getUser();
            if (user.getPassword() == null) user.setPassword("password123");
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            if (user.getRole() == null) user.setRole(UserRole.EMPLOYEE);
            user = userRepository.save(user);
            employee.setUser(user);
        }
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
