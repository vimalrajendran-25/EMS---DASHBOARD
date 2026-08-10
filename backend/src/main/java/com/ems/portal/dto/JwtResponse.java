package com.ems.portal.dto;

import com.ems.portal.model.UserRole;

public class JwtResponse {
    private String token;
    private Long id;
    private String email;
    private String fullName;
    private UserRole role;
    private String employeeId;
    private String department;
    private String designation;

    public JwtResponse() {}

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }

    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public static JwtResponseBuilder builder() { return new JwtResponseBuilder(); }

    public static class JwtResponseBuilder {
        private String token;
        private Long id;
        private String email;
        private String fullName;
        private UserRole role;
        private String employeeId;
        private String department;
        private String designation;

        public JwtResponseBuilder token(String token) { this.token = token; return this; }
        public JwtResponseBuilder id(Long id) { this.id = id; return this; }
        public JwtResponseBuilder email(String email) { this.email = email; return this; }
        public JwtResponseBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public JwtResponseBuilder role(UserRole role) { this.role = role; return this; }
        public JwtResponseBuilder employeeId(String employeeId) { this.employeeId = employeeId; return this; }
        public JwtResponseBuilder department(String department) { this.department = department; return this; }
        public JwtResponseBuilder designation(String designation) { this.designation = designation; return this; }

        public JwtResponse build() {
            JwtResponse r = new JwtResponse();
            r.setToken(token);
            r.setId(id);
            r.setEmail(email);
            r.setFullName(fullName);
            r.setRole(role);
            r.setEmployeeId(employeeId);
            r.setDepartment(department);
            r.setDesignation(designation);
            return r;
        }
    }
}
