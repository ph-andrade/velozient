import React from 'react';
import { ModalOverlay, ModalContent, ModalActions, ConfirmButton, CancelButton } from '../styles/components/ConfirmModal';
import { ConfirmDeleteModalHooks } from '@/interfaces/ConfirmDeleteModalHooks';

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalHooks> = ({ show, onClose, onConfirm, computer }) => {
  if (!show) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Delete Confirmation</h2>
        <p>Are you sure you want to delete the computer?</p>
        <strong>Serial Number: {computer.serialNumber}</strong>
        <ModalActions>
          <ConfirmButton onClick={onConfirm}>Yes, Delete</ConfirmButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmDeleteModal;
