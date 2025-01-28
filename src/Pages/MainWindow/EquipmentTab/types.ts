export type NavSection = 'inventory' | 'reserve' | 'manage';

export interface Department {
  id: number;
  name: string;
  departmentIcon: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  membershipType: string;
  studentId?: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  photoUrl?: string;
  quantity: number;
}