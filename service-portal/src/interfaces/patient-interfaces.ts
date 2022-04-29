export interface Patient {
  id: string;
  fullName: string;
  gender: string;
  dayOfBirth: string;
  address: string;
  phoneNumber: string;
  createdAt: string;
  creatorId: string;
}

export interface CreatePatientPayload {
  fullName: string;
  gender: string;
  dayOfBirth: string;
  phoneNumber: string;
  address?: string;
  creatorId: string;
}

export interface GetMorePatientPayload {
  page?: number;
  text?: number;
  limit?: number;
}
