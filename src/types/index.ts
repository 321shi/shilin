export interface PartTimeJob {
  id: string;
  salary: number;
  location: string;
  date: string;
  time: string;
  requirements: string;
  clothing: string;
  meals: string;
  contact: string;
  idRequired: boolean;
  deposit: string;
  notes: string;
  createdAt: string;
}

export interface FactoryJob {
  id: string;
  hourlyRate: number;
  location: string;
  date: string;
  interviewTime: string;
  age: string;
  gender: string;
  workContent: string;
  workHours: string;
  advancePayment: string;
  paymentDate: string;
  accommodation: string;
  deposit: string;
  meals: string;
  insurance: string;
  notes: string;
  createdAt: string;
}

export type SortField = 'date' | 'location' | 'salary' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface ParsedJob {
  raw: string;
  type: 'partTime' | 'factory';
  data: Partial<PartTimeJob> | Partial<FactoryJob>;
}
