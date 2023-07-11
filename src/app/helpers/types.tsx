export interface Plan {
  id: string;
  title: string;
  price?: string;
  type?: string;
  monthlyPrice?: string;
  yearlyPrice?: string;
}

export interface AddOnsType {
  id: string;
  title: string;
  description: string;
  price?: string;
  monthlyPrice?: string;
  yearlyPrice?: string;
}

export interface Info {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface Wizard {
  name: string;
  locked: boolean;
}

export type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  planId: string;
  planDuration: boolean;
  addonsIds: string[];
};
