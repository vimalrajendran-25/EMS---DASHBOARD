package com.ems.portal.service;

import com.ems.portal.config.JwtUtils;
import com.ems.portal.dto.JwtResponse;
import com.ems.portal.dto.LoginRequest;
import com.ems.portal.model.AuditLog;
import com.ems.portal.model.Employee;
import com.ems.portal.model.User;
import com.ems.portal.repository.AuditLogRepository;
import com.ems.portal.repository.EmployeeRepository;
import com.ems.portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public JwtResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        // Audit Log
        auditLogRepository.save(AuditLog.builder()
                .userEmail(user.getEmail())
                .action("LOGIN")
                .details("User logged in successfully")
                .ipAddress("127.0.0.1")
                .build());

        String token = jwtUtils.generateJwtToken(user.getEmail());

        Optional<Employee> empOpt = employeeRepository.findByUserId(user.getId());

        return JwtResponse.builder()
                .token(token)
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .employeeId(empOpt.map(Employee::getEmployeeId).orElse("N/A"))
                .department(empOpt.map(Employee::getDepartment).orElse("Management"))
                .designation(empOpt.map(Employee::getDesignation).orElse("Executive"))
                .build();
    }
}
