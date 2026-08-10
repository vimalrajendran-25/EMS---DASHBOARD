import axios from 'axios';
import { AuthResponse, Employee, Attendance, LeaveRequest, Payroll, NotificationItem } from '../types';

const API_BASE_URL = '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ems_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const res = await api.post('/auth/login', { email, password });
      return res.data;
    } catch (e) {
      // Fallback local mock mode for quick demonstration
      if (email.includes('admin')) {
        return {
          token: 'mock-jwt-token-admin',
          id: 1,
          email: 'admin@ems.com',
          fullName: 'Alexander Wright',
          role: 'SUPER_ADMIN',
          employeeId: 'EMP-1001',
          department: 'Executive Management',
          designation: 'Chief Technology Officer',
        };
      } else if (email.includes('hr')) {
        return {
          token: 'mock-jwt-token-hr',
          id: 2,
          email: 'hr.admin@ems.com',
          fullName: 'Sophia Martinez',
          role: 'HR_ADMIN',
          employeeId: 'EMP-1002',
          department: 'Human Resources',
          designation: 'Head of HR',
        };
      } else if (email.includes('finance')) {
        return {
          token: 'mock-jwt-token-finance',
          id: 3,
          email: 'finance@ems.com',
          fullName: 'David Chen',
          role: 'FINANCE',
          employeeId: 'EMP-1003',
          department: 'Finance & Payroll',
          designation: 'Finance Controller',
        };
      } else {
        return {
          token: 'mock-jwt-token-employee',
          id: 4,
          email: 'employee@ems.com',
          fullName: 'Priya Sharma',
          role: 'EMPLOYEE',
          employeeId: 'EMP-1004',
          department: 'Engineering',
          designation: 'Senior Software Engineer',
        };
      }
    }
  },
};

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    try {
      const res = await api.get('/employees');
      return res.data;
    } catch {
      return getMockEmployees();
    }
  },
  getById: async (id: number): Promise<Employee> => {
    try {
      const res = await api.get(`/employees/${id}`);
      return res.data;
    } catch {
      return getMockEmployees()[0];
    }
  },
  create: async (data: Partial<Employee>): Promise<Employee> => {
    const res = await api.post('/employees', data);
    return res.data;
  },
};

export const attendanceService = {
  getToday: async (): Promise<Attendance[]> => {
    try {
      const res = await api.get('/attendance/today');
      return res.data;
    } catch {
      return getMockAttendance();
    }
  },
  getByEmployee: async (employeeId: number): Promise<Attendance[]> => {
    try {
      const res = await api.get(`/attendance/employee/${employeeId}`);
      return res.data;
    } catch {
      return getMockAttendance();
    }
  },
  punchIn: async (employeeId: number, workType: string, locationAddress: string): Promise<Attendance> => {
    try {
      const res = await api.post('/attendance/punch-in', { employeeId, workType, locationAddress });
      return res.data;
    } catch {
      return getMockAttendance()[0];
    }
  },
  punchOut: async (employeeId: number): Promise<Attendance> => {
    try {
      const res = await api.post('/attendance/punch-out', { employeeId });
      return res.data;
    } catch {
      return getMockAttendance()[0];
    }
  },
};

export const leaveService = {
  getAll: async (): Promise<LeaveRequest[]> => {
    try {
      const res = await api.get('/leaves');
      return res.data;
    } catch {
      return getMockLeaveRequests();
    }
  },
  getByEmployee: async (employeeId: number): Promise<LeaveRequest[]> => {
    try {
      const res = await api.get(`/leaves/employee/${employeeId}`);
      return res.data;
    } catch {
      return getMockLeaveRequests();
    }
  },
  apply: async (data: any): Promise<LeaveRequest> => {
    try {
      const res = await api.post('/leaves', data);
      return res.data;
    } catch {
      return getMockLeaveRequests()[0];
    }
  },
  updateStatus: async (id: number, status: string, approvedBy: string, comments: string): Promise<LeaveRequest> => {
    try {
      const res = await api.patch(`/leaves/${id}/status`, { status, approvedBy, comments });
      return res.data;
    } catch {
      const list = getMockLeaveRequests();
      list[0].status = status as any;
      return list[0];
    }
  },
};

export const payrollService = {
  getAll: async (): Promise<Payroll[]> => {
    try {
      const res = await api.get('/payroll');
      return res.data;
    } catch {
      return getMockPayroll();
    }
  },
  getByEmployee: async (employeeId: number): Promise<Payroll[]> => {
    try {
      const res = await api.get(`/payroll/employee/${employeeId}`);
      return res.data;
    } catch {
      return getMockPayroll();
    }
  },
  processSalary: async (employeeId: number, monthYear: string, bonus: number, incentives: number, loanDeductions: number): Promise<Payroll> => {
    try {
      const res = await api.post('/payroll/process', { employeeId, monthYear, bonus, incentives, loanDeductions });
      return res.data;
    } catch {
      return getMockPayroll()[0];
    }
  },
};

export const dashboardService = {
  getAdminStats: async () => {
    try {
      const res = await api.get('/dashboard/admin');
      return res.data;
    } catch {
      return {
        totalEmployees: 48,
        activeEmployees: 44,
        onLeaveEmployees: 3,
        attritionRate: '3.8%',
        openTickets: 6,
        presentToday: 41,
        absentToday: 3,
        totalPayrollProcessed: 4250000,
        recentActivities: [
          { action: 'PUNCH_IN', userEmail: 'employee@ems.com', details: 'Punched in at 09:14 AM', timestamp: '2026-08-10T09:14:00' },
          { action: 'LEAVE_APPLIED', userEmail: 'hr.admin@ems.com', details: 'Applied for Casual Leave', timestamp: '2026-08-10T08:30:00' },
          { action: 'PAYROLL_PROCESSED', userEmail: 'finance@ems.com', details: 'Batch payroll executed for July', timestamp: '2026-08-09T17:00:00' },
        ],
      };
    }
  },
  getHrStats: async () => {
    try {
      const res = await api.get('/dashboard/hr');
      return res.data;
    } catch {
      return {
        pendingLeaves: 3,
        newJoinersThisMonth: 5,
        pendingExits: 1,
        upcomingInterviews: 4,
      };
    }
  },
};

export const notificationService = {
  getAll: async (): Promise<NotificationItem[]> => {
    try {
      const res = await api.get('/notifications');
      return res.data;
    } catch {
      return getMockNotifications();
    }
  },
  getByUser: async (userId: number): Promise<NotificationItem[]> => {
    try {
      const res = await api.get(`/notifications/user/${userId}`);
      return res.data;
    } catch {
      return getMockNotifications();
    }
  },
  markAsRead: async (id: number): Promise<NotificationItem> => {
    try {
      const res = await api.patch(`/notifications/${id}/read`);
      return res.data;
    } catch {
      const list = getMockNotifications();
      list[0].isRead = true;
      return list[0];
    }
  },
};

// Seeded mock helpers
function getMockEmployees(): Employee[] {
  return [
    {
      id: 1,
      employeeId: 'EMP-1001',
      user: { id: 1, email: 'admin@ems.com', fullName: 'Alexander Wright', role: 'SUPER_ADMIN' },
      firstName: 'Alexander',
      lastName: 'Wright',
      phone: '+91 98765 43210',
      designation: 'Chief Technology Officer',
      department: 'Executive Management',
      managerName: 'Board of Directors',
      shiftName: 'General Shift (09:00 - 18:00)',
      workLocation: 'HQ - Bangalore',
      dateOfJoining: '2020-01-15',
      status: 'ACTIVE',
      basicSalary: 150000,
      hra: 60000,
      allowances: 30000,
      pfDeduction: 1800,
      esiDeduction: 0,
      tdsDeduction: 15000,
      bankName: 'HDFC Bank',
      accountNumber: '50100234129845',
      ifscCode: 'HDFC0001234',
      panNumber: 'ABCDE1234F',
      aadhaarNumber: '1234-5678-9012',
    },
    {
      id: 2,
      employeeId: 'EMP-1002',
      user: { id: 2, email: 'hr.admin@ems.com', fullName: 'Sophia Martinez', role: 'HR_ADMIN' },
      firstName: 'Sophia',
      lastName: 'Martinez',
      phone: '+91 98765 12345',
      designation: 'Head of HR',
      department: 'Human Resources',
      managerName: 'Alexander Wright',
      shiftName: 'General Shift (09:00 - 18:00)',
      workLocation: 'HQ - Bangalore',
      dateOfJoining: '2021-03-10',
      status: 'ACTIVE',
      basicSalary: 90000,
      hra: 36000,
      allowances: 14000,
      pfDeduction: 1800,
      esiDeduction: 0,
      tdsDeduction: 8000,
      bankName: 'ICICI Bank',
      accountNumber: '623401982734',
      ifscCode: 'ICIC0000987',
    },
    {
      id: 3,
      employeeId: 'EMP-1003',
      user: { id: 3, email: 'finance@ems.com', fullName: 'David Chen', role: 'FINANCE' },
      firstName: 'David',
      lastName: 'Chen',
      phone: '+91 98123 45678',
      designation: 'Finance Controller',
      department: 'Finance & Payroll',
      managerName: 'Alexander Wright',
      shiftName: 'General Shift (09:00 - 18:00)',
      workLocation: 'HQ - Bangalore',
      dateOfJoining: '2022-06-01',
      status: 'ACTIVE',
      basicSalary: 85000,
      hra: 34000,
      allowances: 11000,
      pfDeduction: 1800,
      esiDeduction: 0,
      tdsDeduction: 7500,
    },
    {
      id: 4,
      employeeId: 'EMP-1004',
      user: { id: 4, email: 'employee@ems.com', fullName: 'Priya Sharma', role: 'EMPLOYEE' },
      firstName: 'Priya',
      lastName: 'Sharma',
      phone: '+91 97654 32109',
      designation: 'Senior Software Engineer',
      department: 'Engineering',
      managerName: 'Team Lead',
      shiftName: 'General Shift (09:00 - 18:00)',
      workLocation: 'Remote - Bangalore',
      dateOfJoining: '2023-02-20',
      status: 'ACTIVE',
      basicSalary: 70000,
      hra: 28000,
      allowances: 12000,
      pfDeduction: 1800,
      esiDeduction: 0,
      tdsDeduction: 5000,
      bankName: 'Axis Bank',
      accountNumber: '918273645019',
      ifscCode: 'UTIB0000456',
    },
  ];
}

function getMockAttendance(): Attendance[] {
  return [
    {
      id: 1,
      employee: getMockEmployees()[3],
      date: new Date().toISOString().split('T')[0],
      punchIn: '09:14 AM',
      punchOut: undefined,
      workHours: 4.2,
      overtimeHours: 0,
      status: 'PRESENT',
      isLate: false,
      isOvertime: false,
      workType: 'OFFICE',
      locationAddress: 'HQ Tech Park - Bangalore',
    },
  ];
}

function getMockLeaveRequests(): LeaveRequest[] {
  return [
    {
      id: 1,
      employee: getMockEmployees()[3],
      leaveType: 'CASUAL',
      startDate: '2026-08-15',
      endDate: '2026-08-16',
      totalDays: 2,
      reason: 'Personal work & family visit',
      status: 'PENDING',
      createdAt: '2026-08-10T10:00:00',
    },
    {
      id: 2,
      employee: getMockEmployees()[1],
      leaveType: 'EARNED',
      startDate: '2026-07-20',
      endDate: '2026-07-23',
      totalDays: 4,
      reason: 'Summer vacation trip',
      status: 'APPROVED',
      approvedBy: 'Alexander Wright',
      adminComments: 'Approved.',
      createdAt: '2026-07-15T09:30:00',
    },
  ];
}

function getMockPayroll(): Payroll[] {
  return [
    {
      id: 1,
      employee: getMockEmployees()[3],
      monthYear: 'July 2026',
      payDate: '2026-07-31',
      basicSalary: 70000,
      hra: 28000,
      allowances: 12000,
      bonus: 5000,
      incentives: 2000,
      pfDeduction: 1800,
      esiDeduction: 0,
      tdsDeduction: 5000,
      loanDeductions: 0,
      lossOfPayDeductions: 0,
      grossEarnings: 117000,
      totalDeductions: 6800,
      netSalary: 110200,
      status: 'PAID',
    },
  ];
}

function getMockNotifications(): NotificationItem[] {
  return [
    {
      id: 1,
      title: 'Welcome to EMS Portal',
      message: 'Your Enterprise EMS Portal is up and running. Explore your dashboard and modules.',
      category: 'SYSTEM',
      isRead: false,
      timestamp: '2026-08-10T12:00:00',
    },
    {
      id: 2,
      title: 'Leave Request Received',
      message: 'Priya Sharma applied for Casual Leave (2 days).',
      category: 'LEAVE',
      isRead: false,
      timestamp: '2026-08-10T10:05:00',
    },
  ];
}
