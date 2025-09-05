import React from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from '../types/FormData';

interface Props {
  formData: FormData;
  onSubmit: (data: Partial<FormData>) => void;
  onBack: () => void;
  onApplicationSubmit: () => void;
}

const Form3LoanParams: React.FC<Props> = ({ 
  formData, 
  onSubmit, 
  onBack, 
  onApplicationSubmit 
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  const loanAmount = watch('loanAmount', formData.loanAmount);
  const loanTerm = watch('loanTerm', formData.loanTerm);

  const handleFormSubmit = (data: Partial<FormData>) => {
    onSubmit(data);
    onApplicationSubmit();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="needs-validation">
      <h3 className="mb-4">Параметры займа</h3>
      
      <div className="mb-4">
        <label htmlFor="loanAmount" className="form-label">
          Сумма займа: ${loanAmount}
        </label>
        <input
          type="range"
          {...register('loanAmount', { 
            required: 'Выберите сумму займа',
            min: { value: 200, message: 'Минимальная сумма: $200' },
            max: { value: 1000, message: 'Максимальная сумма: $1000' }
          })}
          className={`form-range ${errors.loanAmount ? 'is-invalid' : ''}`}
          id="loanAmount"
          min="200"
          max="1000"
          step="100"
        />
        <div className="d-flex justify-content-between">
          <small>$200</small>
          <small>$1000</small>
        </div>
        {errors.loanAmount && <div className="invalid-feedback">{errors.loanAmount.message}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="loanTerm" className="form-label">
          Срок займа: {loanTerm} дней
        </label>
        <input
          type="range"
          {...register('loanTerm', { 
            required: 'Выберите срок займа',
            min: { value: 10, message: 'Минимальный срок: 10 дней' },
            max: { value: 30, message: 'Максимальный срок: 30 дней' }
          })}
          className={`form-range ${errors.loanTerm ? 'is-invalid' : ''}`}
          id="loanTerm"
          min="10"
          max="30"
          step="1"
        />
        <div className="d-flex justify-content-between">
          <small>10 дней</small>
          <small>30 дней</small>
        </div>
        {errors.loanTerm && <div className="invalid-feedback">{errors.loanTerm.message}</div>}
      </div>

      <div className="d-grid gap-2 d-md-flex justify-content-md-between">
        <button type="button" className="btn btn-secondary me-md-2" onClick={onBack}>
          Назад
        </button>
        <button type="submit" className="btn btn-primary">Подать заявку</button>
      </div>
    </form>
  );
};

export default Form3LoanParams;