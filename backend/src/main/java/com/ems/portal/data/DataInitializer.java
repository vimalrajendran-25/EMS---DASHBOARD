package com.ems.portal.data;

import com.ems.portal.model.*;
import com.ems.portal.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) return;

        String pass = passwordEncoder.encode("password123");

        // 1. Super Admin
        User superAdmin = userRepository.save(User.builder()
                .email("admin@ems.com")
                .password(pass)
                .fullName("Alexander Wright")
                .role(UserRole.SUPER_ADMIN)
                .active(true)
                .avatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150")
                .build());

        Employee emp1 = employeeRepository.save(Employee.builder()
                .employeeId("EMP-1001")
                .user(superAdmin)
                .firstName("Alexander")
                .lastName("Wright")
                .phone("+91 98765 43210")
                .designation("Chief Technology Officer")
                .department("Executive Management")
                .managerName("Board of Directors")
                .shiftName("General Shift (09:00 - 18:00)")
                .workLocation("HQ - Bangalore")
                .dateOfJoining(LocalDate.of(2020, 1, 15))
                .dateOfBirth(LocalDate.of(1985, 4, 12))
                .gender("Male")
                .status("ACTIVE")
                .basicSalary(new BigDecimal("150000.00"))
                .hra(new BigDecimal("60000.00"))
                .allowances(new BigDecimal("30000.00"))
                .pfDeduction(new BigDecimal("1800.00"))
                .esiDeduction(new BigDecimal("0.00"))
                .tdsDeduction(new BigDecimal("15000.00"))
                .bankName("HDFC Bank")
                .accountNumber("50100234129845")
                .ifscCode("HDFC0001234")
                .panNumber("ABCDE1234F")
                .aadhaarNumber("1234-5678-9012")
                .build());

        // 2. HR Admin
        User hrAdmin = userRepository.save(User.builder()
                .email("hr.admin@ems.com")
                .password(pass)
                .fullName("Sophia Martinez")
                .role(UserRole.HR_ADMIN)
                .active(true)
                .avatarUrl("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150")
                .build());

        Employee emp2 = employeeRepository.save(Employee.builder()
                .employeeId("EMP-1002")
                .user(hrAdmin)
                .firstName("Sophia")
                .lastName("Martinez")
                .phone("+91 98765 12345")
                .designation("Head of HR")
                .department("Human Resources")
                .managerName("Alexander Wright")
                .shiftName("General Shift (09:00 - 18:00)")
                .workLocation("HQ - Bangalore")
                .dateOfJoining(LocalDate.of(2021, 3, 10))
                .dateOfBirth(LocalDate.of(1989, 8, 24))
                .gender("Female")
                .status("ACTIVE")
                .basicSalary(new BigDecimal("90000.00"))
                .hra(new BigDecimal("36000.00"))
                .allowances(new BigDecimal("14000.00"))
                .pfDeduction(new BigDecimal("1800.00"))
                .esiDeduction(new BigDecimal("0.00"))
                .tdsDeduction(new BigDecimal("8000.00"))
                .bankName("ICICI Bank")
                .accountNumber("623401982734")
                .ifscCode("ICIC0000987")
                .panNumber("FGHIJ5678K")
                .aadhaarNumber("9876-5432-1098")
                .build());

        // 3. Finance
        User financeUser = userRepository.save(User.builder()
                .email("finance@ems.com")
                .password(pass)
                .fullName("David Chen")
                .role(UserRole.FINANCE)
                .active(true)
                .avatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150")
                .build());

        Employee emp3 = employeeRepository.save(Employee.builder()
                .employeeId("EMP-1003")
                .user(financeUser)
                .firstName("David")
                .lastName("Chen")
                .phone("+91 98123 45678")
                .designation("Finance Controller")
                .department("Finance & Payroll")
                .managerName("Alexander Wright")
                .shiftName("General Shift (09:00 - 18:00)")
                .workLocation("HQ - Bangalore")
                .dateOfJoining(LocalDate.of(2022, 6, 1))
                .status("ACTIVE")
                .basicSalary(new BigDecimal("85000.00"))
                .hra(new BigDecimal("34000.00"))
                .allowances(new BigDecimal("11000.00"))
                .pfDeduction(new BigDecimal("1800.00"))
                .esiDeduction(new BigDecimal("0.00"))
                .tdsDeduction(new BigDecimal("7500.00"))
                .build());

        // 4. Employee (Developer)
        User devUser = userRepository.save(User.builder()
                .email("employee@ems.com")
                .password(pass)
                .fullName("Priya Sharma")
                .role(UserRole.EMPLOYEE)
                .active(true)
                .avatarUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150")
                .build());

        Employee emp4 = employeeRepository.save(Employee.builder()
                .employeeId("EMP-1004")
                .user(devUser)
                .firstName("Priya")
                .lastName("Sharma")
                .phone("+91 97654 32109")
                .designation("Senior Software Engineer")
                .department("Engineering")
                .managerName("Team Lead")
                .shiftName("General Shift (09:00 - 18:00)")
                .workLocation("Remote - Bangalore")
                .dateOfJoining(LocalDate.of(2023, 2, 20))
                .status("ACTIVE")
                .basicSalary(new BigDecimal("70000.00"))
                .hra(new BigDecimal("28000.00"))
                .allowances(new BigDecimal("12000.00"))
                .pfDeduction(new BigDecimal("1800.00"))
                .esiDeduction(new BigDecimal("0.00"))
                .tdsDeduction(new BigDecimal("5000.00"))
                .bankName("Axis Bank")
                .accountNumber("918273645019")
                .ifscCode("UTIB0000456")
                .build());

        // Seed Attendance for Priya
        attendanceRepository.save(Attendance.builder()
                .employee(emp4)
                .date(LocalDate.now().minusDays(1))
                .punchIn(LocalTime.of(9, 4))
                .punchOut(LocalTime.of(18, 15))
                .workHours(9.18)
                .overtimeHours(0.18)
                .status("PRESENT")
                .isLate(false)
                .isOvertime(true)
                .workType("WFH")
                .locationAddress("Home Office - Bangalore")
                .build());

        attendanceRepository.save(Attendance.builder()
                .employee(emp4)
                .date(LocalDate.now())
                .punchIn(LocalTime.of(9, 28))
                .status("LATE")
                .isLate(true)
                .isOvertime(false)
                .workHours(0.0)
                .overtimeHours(0.0)
                .workType("OFFICE")
                .locationAddress("HQ - Tech Park Bangalore")
                .build());

        // Seed Leave Applications
        leaveRequestRepository.save(LeaveRequest.builder()
                .employee(emp4)
                .leaveType("CASUAL")
                .startDate(LocalDate.now().plusDays(5))
                .endDate(LocalDate.now().plusDays(6))
                .totalDays(2)
                .reason("Personal work & family visit")
                .status("PENDING")
                .build());

        leaveRequestRepository.save(LeaveRequest.builder()
                .employee(emp2)
                .leaveType("EARNED")
                .startDate(LocalDate.now().minusDays(10))
                .endDate(LocalDate.now().minusDays(8))
                .totalDays(3)
                .reason("Vacation leave")
                .status("APPROVED")
                .approvedBy("Alexander Wright")
                .adminComments("Approved. Have a great vacation!")
                .build());

        // Seed Payroll Slips
        payrollRepository.save(Payroll.builder()
                .employee(emp4)
                .monthYear("July 2026")
                .payDate(LocalDate.of(2026, 7, 31))
                .basicSalary(new BigDecimal("70000.00"))
                .hra(new BigDecimal("28000.00"))
                .allowances(new BigDecimal("12000.00"))
                .bonus(new BigDecimal("5000.00"))
                .incentives(new BigDecimal("2000.00"))
                .pfDeduction(new BigDecimal("1800.00"))
                .esiDeduction(new BigDecimal("0.00"))
                .tdsDeduction(new BigDecimal("5000.00"))
                .loanDeductions(BigDecimal.ZERO)
                .lossOfPayDeductions(BigDecimal.ZERO)
                .grossEarnings(new BigDecimal("117000.00"))
                .totalDeductions(new BigDecimal("6800.00"))
                .netSalary(new BigDecimal("110200.00"))
                .status("PAID")
                .build());

        // Seed Notifications
        notificationRepository.save(Notification.builder()
                .title("Welcome to EMS Portal")
                .message("Your Enterprise EMS Portal is up and running. Explore your dashboard and modules.")
                .category("SYSTEM")
                .isRead(false)
                .build());

        notificationRepository.save(Notification.builder()
                .userId(devUser.getId())
                .title("Leave Application Received")
                .message("Your Casual Leave request for " + LocalDate.now().plusDays(5) + " is under HR review.")
                .category("LEAVE")
                .isRead(false)
                .build());

        // Audit Logs
        auditLogRepository.save(AuditLog.builder()
                .userEmail("admin@ems.com")
                .action("SYSTEM_INITIALIZED")
                .details("System booted and initial data populated.")
                .ipAddress("127.0.0.1")
                .build());
    }
}
