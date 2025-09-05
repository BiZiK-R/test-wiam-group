import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { FormData } from '../types/FormData';

interface Props {
  formData: FormData;
  onSubmit: (data: Partial<FormData>) => void;
}

const Form1PersonalData: React.FC<Props> = ({ formData, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  const handleFormSubmit = (data: Partial<FormData>) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="needs-validation">
      <h3 className="mb-4">Личные данные</h3>
      
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Телефон</label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Телефон обязателен для заполнения',
            pattern: {
              value: /^\d{3} \d{3} \d{4}$/,
              message: 'Введите телефон в формате XXX XXX XXXX'
            }
          }}
          render={({ field }) => (
            <InputMask
              mask="999 999 9999"
              maskChar=" "
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              id="phone"
              placeholder="XXX XXX XXXX"
            />
          )}
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">Имя</label>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: 'Имя обязательно для заполнения' }}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              id="firstName"
            />
          )}
        />
        {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Фамилия</label>
        <Controller
          name="lastName"
          control={control}
          rules={{ required: 'Фамилия обязательна для заполнения' }}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              id="lastName"
            />
          )}
        />
        {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="gender" className="form-label">Пол</label>
        <Controller
          name="gender"
          control={control}
          rules={{ required: 'Выберите пол' }}
          render={({ field }) => (
            <select
              {...field}
              className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
              id="gender"
            >
              <option value="">Выберите пол</option>
              <option value="Мужской">Мужской</option>
              <option value="Женский">Женский</option>
            </select>
          )}
        />
        {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Далее</button>
      </div>
    </form>
  );
};

export default Form1PersonalData;