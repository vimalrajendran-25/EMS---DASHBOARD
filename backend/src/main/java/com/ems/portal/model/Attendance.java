package com.ems.portal.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    private LocalDate date;
    private LocalTime punchIn;
    private LocalTime punchOut;

    private Double workHours;
    private Double overtimeHours;

    private String status;

    private Boolean isLate;
    private Boolean isOvertime;
    private String workType;
    private String locationAddress;

    public Attendance() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public LocalTime getPunchIn() { return punchIn; }
    public void setPunchIn(LocalTime punchIn) { this.punchIn = punchIn; }

    public LocalTime getPunchOut() { return punchOut; }
    public void setPunchOut(LocalTime punchOut) { this.punchOut = punchOut; }

    public Double getWorkHours() { return workHours; }
    public void setWorkHours(Double workHours) { this.workHours = workHours; }

    public Double getOvertimeHours() { return overtimeHours; }
    public void setOvertimeHours(Double overtimeHours) { this.overtimeHours = overtimeHours; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Boolean getIsLate() { return isLate; }
    public void setIsLate(Boolean isLate) { this.isLate = isLate; }

    public Boolean getIsOvertime() { return isOvertime; }
    public void setIsOvertime(Boolean isOvertime) { this.isOvertime = isOvertime; }

    public String getWorkType() { return workType; }
    public void setWorkType(String workType) { this.workType = workType; }

    public String getLocationAddress() { return locationAddress; }
    public void setLocationAddress(String locationAddress) { this.locationAddress = locationAddress; }

    // Builder
    public static AttendanceBuilder builder() { return new AttendanceBuilder(); }

    public static class AttendanceBuilder {
        private Employee employee;
        private LocalDate date;
        private LocalTime punchIn;
        private LocalTime punchOut;
        private Double workHours;
        private Double overtimeHours;
        private String status;
        private Boolean isLate;
        private Boolean isOvertime;
        private String workType;
        private String locationAddress;

        public AttendanceBuilder employee(Employee employee) { this.employee = employee; return this; }
        public AttendanceBuilder date(LocalDate date) { this.date = date; return this; }
        public AttendanceBuilder punchIn(LocalTime punchIn) { this.punchIn = punchIn; return this; }
        public AttendanceBuilder punchOut(LocalTime punchOut) { this.punchOut = punchOut; return this; }
        public AttendanceBuilder workHours(Double workHours) { this.workHours = workHours; return this; }
        public AttendanceBuilder overtimeHours(Double overtimeHours) { this.overtimeHours = overtimeHours; return this; }
        public AttendanceBuilder status(String status) { this.status = status; return this; }
        public AttendanceBuilder isLate(Boolean isLate) { this.isLate = isLate; return this; }
        public AttendanceBuilder isOvertime(Boolean isOvertime) { this.isOvertime = isOvertime; return this; }
        public AttendanceBuilder workType(String workType) { this.workType = workType; return this; }
        public AttendanceBuilder locationAddress(String locationAddress) { this.locationAddress = locationAddress; return this; }

        public Attendance build() {
            Attendance a = new Attendance();
            a.setEmployee(employee);
            a.setDate(date);
            a.setPunchIn(punchIn);
            a.setPunchOut(punchOut);
            a.setWorkHours(workHours);
            a.setOvertimeHours(overtimeHours);
            a.setStatus(status);
            a.setIsLate(isLate);
            a.setIsOvertime(isOvertime);
            a.setWorkType(workType);
            a.setLocationAddress(locationAddress);
            return a;
        }
    }
}
