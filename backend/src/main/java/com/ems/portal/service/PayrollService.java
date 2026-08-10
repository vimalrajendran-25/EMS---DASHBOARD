package com.ems.portal.service;

import com.ems.portal.model.Employee;
import com.ems.portal.model.Notification;
import com.ems.portal.model.Payroll;
import com.ems.portal.repository.EmployeeRepository;
import com.ems.portal.repository.NotificationRepository;
import com.ems.portal.repository.PayrollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class PayrollService {

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Payroll> getAllPayrolls() {
        return payrollRepository.findAll();
    }

    public List<Payroll> getPayrollByEmployee(Long employeeId) {
        return payrollRepository.findByEmployeeId(employeeId);
    }

    public Payroll processSalary(Long employeeId, String monthYear, BigDecimal bonus, BigDecimal incentives, BigDecimal loanDeductions) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        BigDecimal basic = employee.getBasicSalary() != null ? employee.getBasicSalary() : new BigDecimal("50000.00");
        BigDecimal hra = employee.getHra() != null ? employee.getHra() : new BigDecimal("20000.00");
        BigDecimal allowances = employee.getAllowances() != null ? employee.getAllowances() : new BigDecimal("10000.00");

        BigDecimal extraBonus = bonus != null ? bonus : BigDecimal.ZERO;
        BigDecimal extraIncentives = incentives != null ? incentives : BigDecimal.ZERO;

        BigDecimal pf = employee.getPfDeduction() != null ? employee.getPfDeduction() : new BigDecimal("1800.00");
        BigDecimal esi = employee.getEsiDeduction() != null ? employee.getEsiDeduction() : new BigDecimal("0.00");
        BigDecimal tds = employee.getTdsDeduction() != null ? employee.getTdsDeduction() : new BigDecimal("3500.00");
        BigDecimal loan = loanDeductions != null ? loanDeductions : BigDecimal.ZERO;
        BigDecimal lossOfPay = BigDecimal.ZERO;

        BigDecimal grossEarnings = basic.add(hra).add(allowances).add(extraBonus).add(extraIncentives);
        BigDecimal totalDeductions = pf.add(esi).add(tds).add(loan).add(lossOfPay);
        BigDecimal netSalary = grossEarnings.subtract(totalDeductions);

        Payroll payroll = Payroll.builder()
                .employee(employee)
                .monthYear(monthYear)
                .payDate(LocalDate.now())
                .basicSalary(basic)
                .hra(hra)
                .allowances(allowances)
                .bonus(extraBonus)
                .incentives(extraIncentives)
                .pfDeduction(pf)
                .esiDeduction(esi)
                .tdsDeduction(tds)
                .loanDeductions(loan)
                .lossOfPayDeductions(lossOfPay)
                .grossEarnings(grossEarnings)
                .totalDeductions(totalDeductions)
                .netSalary(netSalary)
                .status("PROCESSED")
                .build();

        Payroll saved = payrollRepository.save(payroll);

        // Notify Employee
        if (employee.getUser() != null) {
            notificationRepository.save(Notification.builder()
                    .userId(employee.getUser().getId())
                    .title("Payslip Generated: " + monthYear)
                    .message("Your payslip for " + monthYear + " has been processed. Net Amount: ₹" + netSalary)
                    .category("PAYROLL")
                    .build());
        }

        return saved;
    }
}
