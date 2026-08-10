package com.ems.portal.service;

import com.ems.portal.dto.AttendancePunchRequest;
import com.ems.portal.model.Attendance;
import com.ems.portal.model.Employee;
import com.ems.portal.repository.AttendanceRepository;
import com.ems.portal.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Attendance> getAttendanceByEmployee(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId);
    }

    public List<Attendance> getTodayAttendance() {
        return attendanceRepository.findByDate(LocalDate.now());
    }

    public Attendance punchIn(AttendancePunchRequest request) {
        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        Optional<Attendance> existingOpt = attendanceRepository.findByEmployeeIdAndDate(employee.getId(), today);
        if (existingOpt.isPresent()) {
            throw new RuntimeException("Already punched in today!");
        }

        LocalTime standardShiftStart = LocalTime.of(9, 15); // Late if after 09:15 AM
        boolean isLate = now.isAfter(standardShiftStart);

        Attendance attendance = Attendance.builder()
                .employee(employee)
                .date(today)
                .punchIn(now)
                .status(isLate ? "LATE" : "PRESENT")
                .isLate(isLate)
                .isOvertime(false)
                .workHours(0.0)
                .overtimeHours(0.0)
                .workType(request.getWorkType() != null ? request.getWorkType() : "OFFICE")
                .locationAddress(request.getLocationAddress() != null ? request.getLocationAddress() : "Head Office - Bangalore")
                .build();

        return attendanceRepository.save(attendance);
    }

    public Attendance punchOut(AttendancePunchRequest request) {
        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        Attendance attendance = attendanceRepository.findByEmployeeIdAndDate(employee.getId(), today)
                .orElseThrow(() -> new RuntimeException("No active Punch-In record found for today!"));

        attendance.setPunchOut(now);

        long minutesWorked = Duration.between(attendance.getPunchIn(), now).toMinutes();
        double hoursWorked = Math.round((minutesWorked / 60.0) * 100.0) / 100.0;
        attendance.setWorkHours(hoursWorked);

        // Overtime rule calculation (> 9 hours)
        if (hoursWorked > 9.0) {
            attendance.setIsOvertime(true);
            attendance.setOvertimeHours(Math.round((hoursWorked - 9.0) * 100.0) / 100.0);
        }

        // Half day rule (< 4.5 hours)
        if (hoursWorked < 4.5) {
            attendance.setStatus("HALF_DAY");
        }

        return attendanceRepository.save(attendance);
    }
}
