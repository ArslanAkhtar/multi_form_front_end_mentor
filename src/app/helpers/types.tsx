export interface Plan {
  title: string;
  price?: string;
  type?: string;
  monthlyPrice?: string;
  yearlyPrice?: string;
}

export interface AddOnsType {
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
