import { Domain } from './domain';

export interface Reference {
  id: number;
  name: string;
  clientName: string;
  city: string;
  department: string;
  startYear: number;
  endYear: number;
  benefitAmount: number;
  benefitDetails: string;
  imageUrl: string;
  domains: Domain[];
}
