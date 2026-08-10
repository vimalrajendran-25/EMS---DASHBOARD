package com.ems.portal.repository;

import com.ems.portal.model.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    List<Payroll> findByEmployeeId(Long employeeId);
    List<Payroll> findByMonthYear(String monthYear);
    Optional<Payroll> findByEmployeeIdAndMonthYear(Long employeeId, String monthYear);
}
