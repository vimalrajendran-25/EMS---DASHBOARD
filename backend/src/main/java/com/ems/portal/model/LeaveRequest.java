package com.ems.portal.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "leave_requests")
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    private String leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer totalDays;
    private String reason;
    private String status;
    private String approvedBy;
    private String adminComments;
    private LocalDateTime createdAt;

    public LeaveRequest() {}

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) this.status = "PENDING";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }

    public String getLeaveType() { return leaveType; }
    public void setLeaveType(String leaveType) { this.leaveType = leaveType; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public Integer getTotalDays() { return totalDays; }
    public void setTotalDays(Integer totalDays) { this.totalDays = totalDays; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getApprovedBy() { return approvedBy; }
    public void setApprovedBy(String approvedBy) { this.approvedBy = approvedBy; }

    public String getAdminComments() { return adminComments; }
    public void setAdminComments(String adminComments) { this.adminComments = adminComments; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static LeaveRequestBuilder builder() { return new LeaveRequestBuilder(); }

    public static class LeaveRequestBuilder {
        private Employee employee;
        private String leaveType;
        private LocalDate startDate;
        private LocalDate endDate;
        private Integer totalDays;
        private String reason;
        private String status;
        private String approvedBy;
        private String adminComments;

        public LeaveRequestBuilder employee(Employee employee) { this.employee = employee; return this; }
        public LeaveRequestBuilder leaveType(String leaveType) { this.leaveType = leaveType; return this; }
        public LeaveRequestBuilder startDate(LocalDate startDate) { this.startDate = startDate; return this; }
        public LeaveRequestBuilder endDate(LocalDate endDate) { this.endDate = endDate; return this; }
        public LeaveRequestBuilder totalDays(Integer totalDays) { this.totalDays = totalDays; return this; }
        public LeaveRequestBuilder reason(String reason) { this.reason = reason; return this; }
        public LeaveRequestBuilder status(String status) { this.status = status; return this; }
        public LeaveRequestBuilder approvedBy(String approvedBy) { this.approvedBy = approvedBy; return this; }
        public LeaveRequestBuilder adminComments(String adminComments) { this.adminComments = adminComments; return this; }

        public LeaveRequest build() {
            LeaveRequest r = new LeaveRequest();
            r.setEmployee(employee);
            r.setLeaveType(leaveType);
            r.setStartDate(startDate);
            r.setEndDate(endDate);
            r.setTotalDays(totalDays);
            r.setReason(reason);
            r.setStatus(status);
            r.setApprovedBy(approvedBy);
            r.setAdminComments(adminComments);
            return r;
        }
    }
}
