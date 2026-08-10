package com.ems.portal.controller;

import com.ems.portal.dto.LeaveRequestDto;
import com.ems.portal.model.LeaveRequest;
import com.ems.portal.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/leaves")
@CrossOrigin(origins = "*")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAllLeaveRequests() {
        return ResponseEntity.ok(leaveService.getAllLeaveRequests());
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveRequest>> getLeaveRequestsByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveService.getLeaveRequestsByEmployee(employeeId));
    }

    @PostMapping
    public ResponseEntity<LeaveRequest> applyLeave(@RequestBody LeaveRequestDto dto) {
        return ResponseEntity.ok(leaveService.applyLeave(dto));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<LeaveRequest> updateLeaveStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String status = body.get("status");
        String approvedBy = body.getOrDefault("approvedBy", "HR Admin");
        String comments = body.getOrDefault("comments", "");
        return ResponseEntity.ok(leaveService.updateLeaveStatus(id, status, approvedBy, comments));
    }
}
