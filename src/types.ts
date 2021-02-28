export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum Type {
  HealthCheckEntry = 'HealthCheck',
  OccupationalHealthCareEntry = 'OccupationalHealthcare',
  HospitalEntry = 'Hospital'
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: Type.HealthCheckEntry;
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: Type.OccupationalHealthCareEntry;
  employerName: string;
  sickLeave?: {
      startDate: string;
      endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: Type.HospitalEntry;
  discharge: {
      date: string;
      criteria: string;
  };
}

export type Entry =
  | OccupationalHealthCareEntry
  | HospitalEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}
