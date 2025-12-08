export interface MemberData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  accessId: string;
  //membershipId: string;
  dateOfBirth: string;
  gender: string;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatarUrl?: string;
  membershipType: string;
  studentId:string;
}
