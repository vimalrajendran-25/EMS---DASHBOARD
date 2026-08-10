package com.ems.portal.service;

import com.ems.portal.dto.LeaveRequestDto;
import com.ems.portal.model.Employee;
import com.ems.portal.model.LeaveRequest;
import com.ems.portal.model.Notification;
import com.ems.portal.repository.EmployeeRepository;
import com.ems.portal.repository.LeaveRequestRepository;
import com.ems.portal.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    public List<LeaveRequest> getLeaveRequestsByEmployee(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    public LeaveRequest applyLeave(LeaveRequestDto dto) {
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        LeaveRequest request = LeaveRequest.builder()
                .employee(employee)
                .leaveType(dto.getLeaveType())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .totalDays(dto.getTotalDays() != null ? dto.getTotalDays() : 1)
                .reason(dto.getReason())
                .status("PENDING")
                .build();

        LeaveRequest saved = leaveRequestRepository.save(request);

        // Send notification to HR
        notificationRepository.save(Notification.builder()
                .title("New Leave Application")
                .message(employee.getFirstName() + " " + employee.getLastName() + " applied for " + saved.getLeaveType() + " leave.")
                .category("LEAVE")
                .build());

        return saved;
    }

    public LeaveRequest updateLeaveStatus(Long id, String status, String approvedBy, String comments) {
        LeaveRequest request = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));

        request.setStatus(status);
        request.setApprovedBy(approvedBy);
        request.setAdminComments(comments);

        LeaveRequest updated = leaveRequestRepository.save(request);

        // Notify employee
        notificationRepository.save(Notification.builder()
                .userId(request.getEmployee().getUser().getId())
                .title("Leave Application " + status)
                .message("Your leave request for " + request.getLeaveType() + " has been " + status.toLowerCase() + " by " + approvedBy + ".")
                .category("LEAVE")
                .build());

        return updated;
    }
}
