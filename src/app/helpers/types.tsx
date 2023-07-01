export interface Plan {
  title: string;
  price?: string;
  type?: string;
  monthlyPrice?: string;
  yearlyPrice?: string;
}

export interface FormDataProps {
  activeStep: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
}

export interface AddOns {
  title: string;
  description: string;
  price: string;
}
