package com.ems.portal.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "payrolls")
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    private String monthYear;
    private LocalDate payDate;

    private BigDecimal basicSalary;
    private BigDecimal hra;
    private BigDecimal allowances;
    private BigDecimal bonus;
    private BigDecimal incentives;

    private BigDecimal pfDeduction;
    private BigDecimal esiDeduction;
    private BigDecimal tdsDeduction;
    private BigDecimal loanDeductions;
    private BigDecimal lossOfPayDeductions;

    private BigDecimal grossEarnings;
    private BigDecimal totalDeductions;
    private BigDecimal netSalary;

    private String status;

    public Payroll() {}

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }

    public String getMonthYear() { return monthYear; }
    public void setMonthYear(String monthYear) { this.monthYear = monthYear; }

    public LocalDate getPayDate() { return payDate; }
    public void setPayDate(LocalDate payDate) { this.payDate = payDate; }

    public BigDecimal getBasicSalary() { return basicSalary; }
    public void setBasicSalary(BigDecimal basicSalary) { this.basicSalary = basicSalary; }

    public BigDecimal getHra() { return hra; }
    public void setHra(BigDecimal hra) { this.hra = hra; }

    public BigDecimal getAllowances() { return allowances; }
    public void setAllowances(BigDecimal allowances) { this.allowances = allowances; }

    public BigDecimal getBonus() { return bonus; }
    public void setBonus(BigDecimal bonus) { this.bonus = bonus; }

    public BigDecimal getIncentives() { return incentives; }
    public void setIncentives(BigDecimal incentives) { this.incentives = incentives; }

    public BigDecimal getPfDeduction() { return pfDeduction; }
    public void setPfDeduction(BigDecimal pfDeduction) { this.pfDeduction = pfDeduction; }

    public BigDecimal getEsiDeduction() { return esiDeduction; }
    public void setEsiDeduction(BigDecimal esiDeduction) { this.esiDeduction = esiDeduction; }

    public BigDecimal getTdsDeduction() { return tdsDeduction; }
    public void setTdsDeduction(BigDecimal tdsDeduction) { this.tdsDeduction = tdsDeduction; }

    public BigDecimal getLoanDeductions() { return loanDeductions; }
    public void setLoanDeductions(BigDecimal loanDeductions) { this.loanDeductions = loanDeductions; }

    public BigDecimal getLossOfPayDeductions() { return lossOfPayDeductions; }
    public void setLossOfPayDeductions(BigDecimal lossOfPayDeductions) { this.lossOfPayDeductions = lossOfPayDeductions; }

    public BigDecimal getGrossEarnings() { return grossEarnings; }
    public void setGrossEarnings(BigDecimal grossEarnings) { this.grossEarnings = grossEarnings; }

    public BigDecimal getTotalDeductions() { return totalDeductions; }
    public void setTotalDeductions(BigDecimal totalDeductions) { this.totalDeductions = totalDeductions; }

    public BigDecimal getNetSalary() { return netSalary; }
    public void setNetSalary(BigDecimal netSalary) { this.netSalary = netSalary; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public static PayrollBuilder builder() { return new PayrollBuilder(); }

    public static class PayrollBuilder {
        private Employee employee;
        private String monthYear;
        private LocalDate payDate;
        private BigDecimal basicSalary;
        private BigDecimal hra;
        private BigDecimal allowances;
        private BigDecimal bonus;
        private BigDecimal incentives;
        private BigDecimal pfDeduction;
        private BigDecimal esiDeduction;
        private BigDecimal tdsDeduction;
        private BigDecimal loanDeductions;
        private BigDecimal lossOfPayDeductions;
        private BigDecimal grossEarnings;
        private BigDecimal totalDeductions;
        private BigDecimal netSalary;
        private String status;

        public PayrollBuilder employee(Employee employee) { this.employee = employee; return this; }
        public PayrollBuilder monthYear(String monthYear) { this.monthYear = monthYear; return this; }
        public PayrollBuilder payDate(LocalDate payDate) { this.payDate = payDate; return this; }
        public PayrollBuilder basicSalary(BigDecimal basicSalary) { this.basicSalary = basicSalary; return this; }
        public PayrollBuilder hra(BigDecimal hra) { this.hra = hra; return this; }
        public PayrollBuilder allowances(BigDecimal allowances) { this.allowances = allowances; return this; }
        public PayrollBuilder bonus(BigDecimal bonus) { this.bonus = bonus; return this; }
        public PayrollBuilder incentives(BigDecimal incentives) { this.incentives = incentives; return this; }
        public PayrollBuilder pfDeduction(BigDecimal pfDeduction) { this.pfDeduction = pfDeduction; return this; }
        public PayrollBuilder esiDeduction(BigDecimal esiDeduction) { this.esiDeduction = esiDeduction; return this; }
        public PayrollBuilder tdsDeduction(BigDecimal tdsDeduction) { this.tdsDeduction = tdsDeduction; return this; }
        public PayrollBuilder loanDeductions(BigDecimal loanDeductions) { this.loanDeductions = loanDeductions; return this; }
        public PayrollBuilder lossOfPayDeductions(BigDecimal lossOfPayDeductions) { this.lossOfPayDeductions = lossOfPayDeductions; return this; }
        public PayrollBuilder grossEarnings(BigDecimal grossEarnings) { this.grossEarnings = grossEarnings; return this; }
        public PayrollBuilder totalDeductions(BigDecimal totalDeductions) { this.totalDeductions = totalDeductions; return this; }
        public PayrollBuilder netSalary(BigDecimal netSalary) { this.netSalary = netSalary; return this; }
        public PayrollBuilder status(String status) { this.status = status; return this; }

        public Payroll build() {
            Payroll p = new Payroll();
            p.setEmployee(employee);
            p.setMonthYear(monthYear);
            p.setPayDate(payDate);
            p.setBasicSalary(basicSalary);
            p.setHra(hra);
            p.setAllowances(allowances);
            p.setBonus(bonus);
            p.setIncentives(incentives);
            p.setPfDeduction(pfDeduction);
            p.setEsiDeduction(esiDeduction);
            p.setTdsDeduction(tdsDeduction);
            p.setLoanDeductions(loanDeductions);
            p.setLossOfPayDeductions(lossOfPayDeductions);
            p.setGrossEarnings(grossEarnings);
            p.setTotalDeductions(totalDeductions);
            p.setNetSalary(netSalary);
            p.setStatus(status);
            return p;
        }
    }
}
