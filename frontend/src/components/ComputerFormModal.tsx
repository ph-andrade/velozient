import React, { useState, useEffect } from 'react';
import { Computer } from '@/interfaces/Computer';
import { ModalOverlay, ModalContent } from '../styles/components/FormModal';
import { FaTimes } from 'react-icons/fa';
import { ComputerFormModalHooks } from '@/interfaces/ComputerFormModalHooks';
import { serialRegex } from '@/utils/regexMap';

const ComputerFormModal: React.FC<ComputerFormModalHooks> = ({ show, onClose, computer, onSave }) => {
  const [computerId, setComputerId] = useState<number>(0);
  const [formData, setFormData] = useState<Computer>({
    manufacturer: 'Apple',
    serialNumber: '',
    status: 'Available',
    purchaseDate: '',
    warrantyExpiryDate: '',
    specifications: '',
    imageURL: '',
  });

  const [errors, setErrors] = useState({
    serialNumber: '',
  });

  useEffect(() => {
    setComputerId(computer?.id || 0);
    setFormData({
      manufacturer: computer?.manufacturer || 'Apple',
      serialNumber: computer?.serialNumber || '',
      status: computer?.status || 'Available',
      purchaseDate: computer?.purchaseDate ? new Date(computer?.purchaseDate).toISOString().split('T')[0] : '',
      warrantyExpiryDate: computer?.warrantyExpiryDate ? new Date(computer?.warrantyExpiryDate).toISOString().split('T')[0] : '',
      specifications: computer?.specifications || '',
      imageURL: computer?.imageURL || '',
    });
  }, [computer]);

  const validateFields = () => {
    let serialNumberError = '';

    const regex = serialRegex[formData.manufacturer as keyof typeof serialRegex];
    if (formData.serialNumber && !regex?.test(formData.serialNumber)) {
      serialNumberError = `Invalid serial number format for ${formData.manufacturer}. Please follow the correct pattern.`;
    }

    setErrors({
      serialNumber: serialNumberError,
    });

    return !serialNumberError;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      onSave(formData, computerId);
      onClose();
    }
  };

  return (
    show ? (
      <ModalOverlay>
        <ModalContent>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
          <h2>{computer ? 'Edit Computer' : 'Add New Computer'}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Manufacturer:
              <select
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                required
              >
                <option value="Apple">Apple</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
                <option value="Lenovo">Lenovo</option>
              </select>
            </label>
            <label>
              Serial Number:
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber || ''}
                onChange={handleChange}
                required
              />
              {errors.serialNumber && <span className="error">{errors.serialNumber}</span>}
            </label>
            <label>
              Status:
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="In Use">In Use</option>
                <option value="In Maintenance">In Maintenance</option>
                <option value="Available">Available</option>
              </select>
            </label>
            <label>
              Purchase Date:
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate || ''}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Warranty Expiry Date:
              <input
                type="date"
                name="warrantyExpiryDate"
                value={formData.warrantyExpiryDate || ''}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Specifications:
              <textarea
                name="specifications"
                value={formData.specifications || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="imageURL"
                value={formData.imageURL || ''}
                onChange={handleChange}
              />
            </label>
            <div className="button-group">
              <button type="submit">Save</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </ModalContent>
      </ModalOverlay>
    ) : null
  );
};

export default ComputerFormModal;
