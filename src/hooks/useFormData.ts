import { useState } from 'react';
import { FormData } from '../types/FormData';

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    firstName: '',
    lastName: '',
    gender: '',
    workPlace: '',
    address: '',
    loanAmount: 200,
    loanTerm: 10,
  });

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  return { formData, updateFormData };
};