import React from 'react';
import { FormStep } from '../types/FormData';

interface Props {
  currentStep: FormStep;
}

const ProgressBar: React.FC<Props> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Личные данные' },
    { number: 2, title: 'Адрес и работа' },
    { number: 3, title: 'Параметры займа' },
  ];

  return (
    <div className="progress-bar-container mb-5">
      <div className="d-flex justify-content-between position-relative">
        {/* Линия прогресса */}
        <div 
          className="progress-line position-absolute"
          style={{ 
            height: '2px', 
            top: '15px', 
            left: '15%', 
            right: '15%', 
            backgroundColor: '#e9ecef' 
          }}
        >
          <div 
            className="progress-line-fill h-100 bg-primary"
            style={{ 
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` 
            }}
          ></div>
        </div>
        
        {steps.map((step) => (
          <div key={step.number} className="d-flex flex-column align-items-center position-relative">
            <div 
              className={`rounded-circle d-flex align-items-center justify-content-center ${
                step.number <= currentStep ? 'bg-primary text-white' : 'bg-light text-muted'
              }`}
              style={{ width: '30px', height: '30px', zIndex: 1 }}
            >
              {step.number}
            </div>
            <div className="mt-2 small text-center" style={{ maxWidth: '80px' }}>
              {step.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;