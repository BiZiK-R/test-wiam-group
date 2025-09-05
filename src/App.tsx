import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Form1PersonalData from './components/Form1PersonalData';
import Form2AddressWork from './components/Form2AddressWork';
import Form3LoanParams from './components/Form3LoanParams';
import ConfirmationModal from './components/ConfirmationModal';
import ProgressBar from './components/ProgressBar';
import { useFormData } from './hooks/useFormData';
import { FormStep, FormData } from './types/FormData';
import { api } from './services/api';
import './styles.css';

function App() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    navigate('/form1');
  }, [])

  const handleForm1Submit = (data: Partial<FormData>) => {
    updateFormData(data);
    setCurrentStep(2);
    navigate('/form2');
  };

  const handleForm2Submit = (data: Partial<FormData>) => {
    updateFormData(data);
    setCurrentStep(3);
    navigate('/form3');
  };

  const handleForm3Submit = (data: Partial<FormData>) => {
    updateFormData(data);
  };

  const handleApplicationSubmit = async () => {
    setIsSubmitting(true);
    try {
      await api.submitApplication({
        title: `${formData.firstName} ${formData.lastName}`
      });
      
      setShowModal(true);
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error);
      alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentStep(1);
    navigate('/form1');
  };

  const goBack = () => {
    setCurrentStep(prev => (prev - 1) as FormStep);
  };

  return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h1 className="text-center mb-4">Заявка на займ</h1>
            
            <ProgressBar currentStep={currentStep} />
            
            <div className="card shadow">
              <div className="card-body p-4">
                <Routes>
                  <Route 
                    path="/" 
                    element={<Navigate to="/form1" replace />} 
                  />
                  <Route 
                    path="/form1" 
                    element={
                      <Form1PersonalData 
                        formData={formData} 
                        onSubmit={handleForm1Submit} 
                      />
                    } 
                  />
                  <Route 
                    path="/form2" 
                    element={
                      <Form2AddressWork 
                        formData={formData} 
                        onSubmit={handleForm2Submit} 
                        onBack={goBack}
                      />
                    } 
                  />
                  <Route 
                    path="/form3" 
                    element={
                      <Form3LoanParams 
                        formData={formData} 
                        onSubmit={handleForm3Submit} 
                        onBack={goBack}
                        onApplicationSubmit={handleApplicationSubmit}
                      />
                    } 
                  />
                </Routes>
                
                {isSubmitting && (
                  <div className="text-center mt-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Отправка заявки...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <ConfirmationModal 
          show={showModal} 
          formData={formData} 
          onClose={handleModalClose} 
        />
      </div>
  );
}

export default App;