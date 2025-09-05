import React from 'react';
import { FormData } from '../types/FormData';

interface Props {
  show: boolean;
  formData: FormData;
  onClose: () => void;
}

const ConfirmationModal: React.FC<Props> = ({ show, formData, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
      <div className="modal-dialog" style={{ zIndex: 9999 }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Заявка одобрена!</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>
              Поздравляем, {formData.lastName} {formData.firstName}. 
              Вам одобрена ${formData.loanAmount} на {formData.loanTerm} дней.
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Закрыть
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
};

export default ConfirmationModal;