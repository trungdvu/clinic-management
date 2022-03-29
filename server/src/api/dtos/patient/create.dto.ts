export interface CreatePatientDto {
  fullName: string;
  gender: string;
  dayOfBirth: string;
  phoneNumber: string;
  address?: string;
}
