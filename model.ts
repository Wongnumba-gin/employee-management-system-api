import { firestore } from 'firebase-admin';

export interface Department {
    id?: string;
    name: string;
    createdAt?: firestore.Timestamp;
}

export interface Position {
    id?: string;
    title: string;
    departmentId: string;
    createdAt?: firestore.Timestamp;
}

export interface Employee {
    id?: string;
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
    positionId: string;
    departmentId: string;
    hireDate: firestore.Timestamp;
    isActive: boolean;
    createdAt?: firestore.Timestamp;
}

export interface AttendanceRecord {
    id?: string;
    timestamp: firestore.Timestamp;
    type: 'time-in' | 'time-out';
    location: string;
}
