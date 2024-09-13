
import React, { useState, useEffect } from 'react';
import { Computer } from '@/interfaces/Computer';
import api from '@/services/api';
import { ModalOverlay, ModalContent } from '../styles/components/FormModal';
import { FaTimes } from 'react-icons/fa';

interface ComputerFormModalProps {
  show: boolean;
  onClose: () => void;
  computer?: Computer;
  onSave: (computer: Computer) => void;
}

const ComputerFormModal: React.FC<ComputerFormModalProps> = ({ show, onClose, computer, onSave }) => {
  const [formData, setFormData] = useState<Partial<Computer>>({
    manufacturer: '',
    serialNumber: '',
    status: '',
    purchaseDate: '',
    warrantyExpiryDate: '',
    specifications: '',
    imageURL: '',
  });

  useEffect(() => {
    if (computer) {
      setFormData({
        manufacturer: computer.manufacturer,
        serialNumber: computer.serialNumber,
        status: computer.status,
        purchaseDate: new Date(computer.purchaseDate).toISOString().split('T')[0],
        warrantyExpiryDate: new Date(computer.warrantyExpiryDate).toISOString().split('T')[0],
        specifications: computer.specifications,
        imageURL: computer.imageURL,
      });
    }
  }, [computer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (computer) {
      try {
        const response = await api.put(`/computers/${computer.id}`, formData);
        onSave(response.data);
      } catch (error) {
        console.error('Error updating computer:', error);
      }
    } else {
      try {
        const response = await api.post('/computers', formData);
        onSave(response.data);
      } catch (error) {
        console.error('Error creating computer:', error);
      }
    }
    onClose();
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
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer || ''}
                onChange={handleChange}
                required
              />
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
            </label>
            <label>
              Status:
              <input
                type="text"
                name="status"
                value={formData.status || ''}
                onChange={handleChange}
                required
              />
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
