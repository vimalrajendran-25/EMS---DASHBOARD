package com.ems.portal.controller;

import com.ems.portal.model.Payroll;
import com.ems.portal.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payroll")
@CrossOrigin(origins = "*")
public class PayrollController {

    @Autowired
    private PayrollService payrollService;

    @GetMapping
    public ResponseEntity<List<Payroll>> getAllPayrolls() {
        return ResponseEntity.ok(payrollService.getAllPayrolls());
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Payroll>> getPayrollByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(payrollService.getPayrollByEmployee(employeeId));
    }

    @PostMapping("/process")
    public ResponseEntity<Payroll> processSalary(@RequestBody Map<String, Object> payload) {
        Long employeeId = Long.valueOf(payload.get("employeeId").toString());
        String monthYear = (String) payload.getOrDefault("monthYear", "August 2026");
        BigDecimal bonus = payload.containsKey("bonus") ? new BigDecimal(payload.get("bonus").toString()) : BigDecimal.ZERO;
        BigDecimal incentives = payload.containsKey("incentives") ? new BigDecimal(payload.get("incentives").toString()) : BigDecimal.ZERO;
        BigDecimal loanDeductions = payload.containsKey("loanDeductions") ? new BigDecimal(payload.get("loanDeductions").toString()) : BigDecimal.ZERO;

        return ResponseEntity.ok(payrollService.processSalary(employeeId, monthYear, bonus, incentives, loanDeductions));
    }
}
