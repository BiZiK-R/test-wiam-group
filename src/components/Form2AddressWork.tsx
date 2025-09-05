import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from '../types/FormData';
import { api } from '../services/api';
import { Category } from '../types/Category';

interface Props {
  formData: FormData;
  onSubmit: (data: Partial<FormData>) => void;
  onBack: () => void;
}

const Form2AddressWork: React.FC<Props> = ({ formData, onSubmit, onBack }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await api.getCategories();
      setCategories(data);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const handleFormSubmit = (data: Partial<FormData>) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="needs-validation">
      <h3 className="mb-4">Адрес и место работы</h3>
      
      <div className="mb-3">
        <label htmlFor="workPlace" className="form-label">Место работы</label>
        {loading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        ) : (
          <select
            {...register('workPlace', { required: 'Выберите место работы' })}
            className={`form-select ${errors.workPlace ? 'is-invalid' : ''}`}
            id="workPlace"
          >
            <option value="">Выберите место работы</option>
            {categories.map((category, index) => (
              <option key={index} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        )}
        {errors.workPlace && <div className="invalid-feedback">{errors.workPlace.message}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="form-label">Адрес проживания</label>
        <input
          type="text"
          {...register('address', { required: 'Адрес обязателен для заполнения' })}
          className={`form-control ${errors.address ? 'is-invalid' : ''}`}
          id="address"
        />
        {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
      </div>

      <div className="d-grid gap-2 d-md-flex justify-content-md-between">
        <button type="button" className="btn btn-secondary me-md-2" onClick={onBack}>
          Назад
        </button>
        <button type="submit" className="btn btn-primary">Далее</button>
      </div>
    </form>
  );
};

export default Form2AddressWork;