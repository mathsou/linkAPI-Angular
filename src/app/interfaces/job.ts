export interface Job {
  id: number;
  name: string;
  status: boolean;
  recurrenceTypeId: number;
  recurrenceValue: string;
  recurrencePeriod: string;
  createdAt: Date;
}

export interface Res {
  id: number;
  message: string;
}
