export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'HR_ADMIN' 
  | 'HR_EXECUTIVE' 
  | 'FINANCE' 
  | 'TEAM_LEAD' 
  | 'EMPLOYEE' 
  | 'IT_ADMIN';

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface AuthResponse {
  token: string;
  id: number;
  email: string;
  fullName: string;
  role: UserRole;
  employeeId: string;
  department: string;
  designation: string;
  avatarUrl?: string;
}

export interface Employee {
  id: number;
  employeeId: string;
  user: User;
  firstName: string;
  lastName: string;
  phone: string;
  designation: string;
  department: string;
  managerName: string;
  shiftName: string;
  workLocation: string;
  dateOfJoining: string;
  dateOfBirth?: string;
  gender?: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'RESIGNED' | 'TERMINATED';
  basicSalary: number;
  hra: number;
  allowances: number;
  pfDeduction: number;
  esiDeduction: number;
  tdsDeduction: number;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  panNumber?: string;
  aadhaarNumber?: string;
}

export interface Attendance {
  id: number;
  employee: Employee;
  date: string;
  punchIn?: string;
  punchOut?: string;
  workHours: number;
  overtimeHours: number;
  status: 'PRESENT' | 'LATE' | 'HALF_DAY' | 'ABSENT' | 'ON_LEAVE';
  isLate: boolean;
  isOvertime: boolean;
  workType: 'OFFICE' | 'WFH' | 'FIELD';
  locationAddress?: string;
}

export interface LeaveRequest {
  id: number;
  employee: Employee;
  leaveType: 'CASUAL' | 'SICK' | 'EARNED' | 'MATERNITY' | 'PATERNITY' | 'COMP_OFF';
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  approvedBy?: string;
  adminComments?: string;
  createdAt: string;
}

export interface Payroll {
  id: number;
  employee: Employee;
  monthYear: string;
  payDate: string;
  basicSalary: number;
  hra: number;
  allowances: number;
  bonus: number;
  incentives: number;
  pfDeduction: number;
  esiDeduction: number;
  tdsDeduction: number;
  loanDeductions: number;
  lossOfPayDeductions: number;
  grossEarnings: number;
  totalDeductions: number;
  netSalary: number;
  status: 'DRAFT' | 'PROCESSED' | 'APPROVED' | 'PAID';
}

export interface NotificationItem {
  id: number;
  userId?: number;
  title: string;
  message: string;
  category: 'SYSTEM' | 'LEAVE' | 'PAYROLL' | 'ATTENDANCE' | 'ANNOUNCEMENT';
  isRead: boolean;
  timestamp: string;
}

export interface AuditLogItem {
  id: number;
  userEmail: string;
  action: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}
