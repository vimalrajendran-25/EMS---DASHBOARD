package com.ems.portal.service;

import com.ems.portal.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class DashboardService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    public Map<String, Object> getAdminDashboardStats() {
        long totalEmployees = employeeRepository.count();
        long activeEmployees = employeeRepository.findByStatus("ACTIVE").size();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalEmployees", totalEmployees);
        stats.put("activeEmployees", activeEmployees);
        stats.put("onLeaveEmployees", employeeRepository.findByStatus("ON_LEAVE").size());
        stats.put("attritionRate", "4.2%");
        stats.put("openTickets", 8);

        // Attendance stats for today
        long presentToday = attendanceRepository.findByDate(LocalDate.now()).stream()
                .filter(a -> "PRESENT".equalsIgnoreCase(a.getStatus()) || "LATE".equalsIgnoreCase(a.getStatus()))
                .count();
        stats.put("presentToday", presentToday);
        stats.put("absentToday", Math.max(0, activeEmployees - presentToday));

        // Total payroll processed
        double totalPayroll = payrollRepository.findAll().stream()
                .mapToDouble(p -> p.getNetSalary() != null ? p.getNetSalary().doubleValue() : 0)
                .sum();
        stats.put("totalPayrollProcessed", totalPayroll);

        // Recent Audit logs
        stats.put("recentActivities", auditLogRepository.findAllByOrderByTimestampDesc().stream().limit(5).toList());

        return stats;
    }

    public Map<String, Object> getHrDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("pendingLeaves", leaveRequestRepository.findByStatus("PENDING").size());
        stats.put("newJoinersThisMonth", 6);
        stats.put("pendingExits", 2);
        stats.put("upcomingInterviews", 5);
        stats.put("recentLeaves", leaveRequestRepository.findByStatus("PENDING"));
        return stats;
    }
}
