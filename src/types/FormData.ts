export interface FormData {
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  workPlace: string;
  address: string;
  loanAmount: number;
  loanTerm: number;
}

export type FormStep = 1 | 2 | 3;