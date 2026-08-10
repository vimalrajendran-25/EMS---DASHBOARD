package com.ems.portal.controller;

import com.ems.portal.dto.AttendancePunchRequest;
import com.ems.portal.model.Attendance;
import com.ems.portal.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Attendance>> getAttendanceByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployee(employeeId));
    }

    @GetMapping("/today")
    public ResponseEntity<List<Attendance>> getTodayAttendance() {
        return ResponseEntity.ok(attendanceService.getTodayAttendance());
    }

    @PostMapping("/punch-in")
    public ResponseEntity<Attendance> punchIn(@RequestBody AttendancePunchRequest request) {
        return ResponseEntity.ok(attendanceService.punchIn(request));
    }

    @PostMapping("/punch-out")
    public ResponseEntity<Attendance> punchOut(@RequestBody AttendancePunchRequest request) {
        return ResponseEntity.ok(attendanceService.punchOut(request));
    }
}
