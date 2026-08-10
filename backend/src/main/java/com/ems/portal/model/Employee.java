package com.ems.portal.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String employeeId;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String firstName;
    private String lastName;
    private String phone;
    private String designation;
    private String department;
    private String managerName;
    private String shiftName;
    private String workLocation;

    private LocalDate dateOfJoining;
    private LocalDate dateOfBirth;
    private String gender;

    private String status;

    private BigDecimal basicSalary;
    private BigDecimal hra;
    private BigDecimal allowances;
    private BigDecimal pfDeduction;
    private BigDecimal esiDeduction;
    private BigDecimal tdsDeduction;

    private String bankName;
    private String accountNumber;
    private String ifscCode;
    private String panNumber;
    private String aadhaarNumber;

    public Employee() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getManagerName() { return managerName; }
    public void setManagerName(String managerName) { this.managerName = managerName; }

    public String getShiftName() { return shiftName; }
    public void setShiftName(String shiftName) { this.shiftName = shiftName; }

    public String getWorkLocation() { return workLocation; }
    public void setWorkLocation(String workLocation) { this.workLocation = workLocation; }

    public LocalDate getDateOfJoining() { return dateOfJoining; }
    public void setDateOfJoining(LocalDate dateOfJoining) { this.dateOfJoining = dateOfJoining; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public BigDecimal getBasicSalary() { return basicSalary; }
    public void setBasicSalary(BigDecimal basicSalary) { this.basicSalary = basicSalary; }

    public BigDecimal getHra() { return hra; }
    public void setHra(BigDecimal hra) { this.hra = hra; }

    public BigDecimal getAllowances() { return allowances; }
    public void setAllowances(BigDecimal allowances) { this.allowances = allowances; }

    public BigDecimal getPfDeduction() { return pfDeduction; }
    public void setPfDeduction(BigDecimal pfDeduction) { this.pfDeduction = pfDeduction; }

    public BigDecimal getEsiDeduction() { return esiDeduction; }
    public void setEsiDeduction(BigDecimal esiDeduction) { this.esiDeduction = esiDeduction; }

    public BigDecimal getTdsDeduction() { return tdsDeduction; }
    public void setTdsDeduction(BigDecimal tdsDeduction) { this.tdsDeduction = tdsDeduction; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getIfscCode() { return ifscCode; }
    public void setIfscCode(String ifscCode) { this.ifscCode = ifscCode; }

    public String getPanNumber() { return panNumber; }
    public void setPanNumber(String panNumber) { this.panNumber = panNumber; }

    public String getAadhaarNumber() { return aadhaarNumber; }
    public void setAadhaarNumber(String aadhaarNumber) { this.aadhaarNumber = aadhaarNumber; }

    // Builder
    public static EmployeeBuilder builder() { return new EmployeeBuilder(); }

    public static class EmployeeBuilder {
        private String employeeId;
        private User user;
        private String firstName;
        private String lastName;
        private String phone;
        private String designation;
        private String department;
        private String managerName;
        private String shiftName;
        private String workLocation;
        private LocalDate dateOfJoining;
        private LocalDate dateOfBirth;
        private String gender;
        private String status;
        private BigDecimal basicSalary;
        private BigDecimal hra;
        private BigDecimal allowances;
        private BigDecimal pfDeduction;
        private BigDecimal esiDeduction;
        private BigDecimal tdsDeduction;
        private String bankName;
        private String accountNumber;
        private String ifscCode;
        private String panNumber;
        private String aadhaarNumber;

        public EmployeeBuilder employeeId(String employeeId) { this.employeeId = employeeId; return this; }
        public EmployeeBuilder user(User user) { this.user = user; return this; }
        public EmployeeBuilder firstName(String firstName) { this.firstName = firstName; return this; }
        public EmployeeBuilder lastName(String lastName) { this.lastName = lastName; return this; }
        public EmployeeBuilder phone(String phone) { this.phone = phone; return this; }
        public EmployeeBuilder designation(String designation) { this.designation = designation; return this; }
        public EmployeeBuilder department(String department) { this.department = department; return this; }
        public EmployeeBuilder managerName(String managerName) { this.managerName = managerName; return this; }
        public EmployeeBuilder shiftName(String shiftName) { this.shiftName = shiftName; return this; }
        public EmployeeBuilder workLocation(String workLocation) { this.workLocation = workLocation; return this; }
        public EmployeeBuilder dateOfJoining(LocalDate dateOfJoining) { this.dateOfJoining = dateOfJoining; return this; }
        public EmployeeBuilder dateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; return this; }
        public EmployeeBuilder gender(String gender) { this.gender = gender; return this; }
        public EmployeeBuilder status(String status) { this.status = status; return this; }
        public EmployeeBuilder basicSalary(BigDecimal basicSalary) { this.basicSalary = basicSalary; return this; }
        public EmployeeBuilder hra(BigDecimal hra) { this.hra = hra; return this; }
        public EmployeeBuilder allowances(BigDecimal allowances) { this.allowances = allowances; return this; }
        public EmployeeBuilder pfDeduction(BigDecimal pfDeduction) { this.pfDeduction = pfDeduction; return this; }
        public EmployeeBuilder esiDeduction(BigDecimal esiDeduction) { this.esiDeduction = esiDeduction; return this; }
        public EmployeeBuilder tdsDeduction(BigDecimal tdsDeduction) { this.tdsDeduction = tdsDeduction; return this; }
        public EmployeeBuilder bankName(String bankName) { this.bankName = bankName; return this; }
        public EmployeeBuilder accountNumber(String accountNumber) { this.accountNumber = accountNumber; return this; }
        public EmployeeBuilder ifscCode(String ifscCode) { this.ifscCode = ifscCode; return this; }
        public EmployeeBuilder panNumber(String panNumber) { this.panNumber = panNumber; return this; }
        public EmployeeBuilder aadhaarNumber(String aadhaarNumber) { this.aadhaarNumber = aadhaarNumber; return this; }

        public Employee build() {
            Employee e = new Employee();
            e.setEmployeeId(employeeId);
            e.setUser(user);
            e.setFirstName(firstName);
            e.setLastName(lastName);
            e.setPhone(phone);
            e.setDesignation(designation);
            e.setDepartment(department);
            e.setManagerName(managerName);
            e.setShiftName(shiftName);
            e.setWorkLocation(workLocation);
            e.setDateOfJoining(dateOfJoining);
            e.setDateOfBirth(dateOfBirth);
            e.setGender(gender);
            e.setStatus(status);
            e.setBasicSalary(basicSalary);
            e.setHra(hra);
            e.setAllowances(allowances);
            e.setPfDeduction(pfDeduction);
            e.setEsiDeduction(esiDeduction);
            e.setTdsDeduction(tdsDeduction);
            e.setBankName(bankName);
            e.setAccountNumber(accountNumber);
            e.setIfscCode(ifscCode);
            e.setPanNumber(panNumber);
            e.setAadhaarNumber(aadhaarNumber);
            return e;
        }
    }
}
