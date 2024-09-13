import React, { useState } from 'react';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';
import { List } from '../styles/components/List';
import WarnNonContent from './WarnNonContent';
import { TableHooks } from '@/interfaces/SellerTableHooks';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import ComputerFormModal from './ComputerFormModal'; // Importa o modal
import api from '@/services/api';
import { Computer } from '@/interfaces/Computer';

const Table: React.FC<TableHooks & { loadMoreData: () => void; hasMore: boolean }> = ({
  computers,
  setComputers,
  loadMoreData,
  hasMore,
}) => {
  const [selectedComputer, setSelectedComputer] = useState<Computer | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleOpenDeleteModal = (computer: Computer) => {
    setSelectedComputer(computer);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedComputer(null);
  };

  const handleOpenFormModal = (computer: Computer | null) => {
    setSelectedComputer(computer);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedComputer(null);
  };

  const handleDeleteComputer = async () => {
    if (selectedComputer) {
      try {
        await api.delete(`/computers/${selectedComputer.id}`);
        setComputers(prevComputers =>
          prevComputers.filter(computer => computer.id !== selectedComputer.id)
        );
      } catch (error) {
        console.error('Error deleting computer:', error);
      } finally {
        handleCloseDeleteModal();
      }
    }
  };

  const handleSaveComputer = async (updatedComputer: Computer) => {
    try {
      if (updatedComputer.id) {
        await api.put(`/computers/${updatedComputer.id}`, updatedComputer);
        setComputers(prevComputers =>
          prevComputers.map(computer =>
            computer.id === updatedComputer.id ? updatedComputer : computer
          )
        );
      } else {
        const response = await api.post('/computers', updatedComputer);
        setComputers(prevComputers => [...prevComputers, response.data]);
      }
    } catch (error) {
      console.error('Error saving computer:', error);
    } finally {
      handleCloseFormModal();
    }
  };

  const defaultImage = '/default-computer.jpeg';

  const getImageSrc = (imageURL: string | undefined) => {
    return imageURL || defaultImage;
  };

  const getWarrantyColor = (warrantyExpiryDate: Date): string => {
    const expiryDate = new Date(warrantyExpiryDate);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      return '#ff0000';
    } else if (diffDays <= 30) {
      return '#c4b200';
    } else {
      return '#008000';
    }
  };

  return (
    <>
      {computers.length ? (
        <InfiniteScroll
          dataLength={computers.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more items to show</p>}
        >
          <List selectable={true}>
            {computers.map((computer) => (
              <div key={computer.id} className="card">
                <div className="card-image">
                  <img
                    src={getImageSrc(computer.imageURL)}
                    alt={computer.manufacturer}
                    className="card-image"
                    onError={(e) => {
                      e.currentTarget.src = defaultImage;
                    }}
                  />
                </div>
                <div className="card-content">
                  <div className="info-row">
                    <div>
                      <strong>Manufacturer:</strong> {computer.manufacturer}
                    </div>
                    <div>
                      <strong>Serial Number:</strong> {computer.serialNumber}
                    </div>
                  </div>
                  <div className="info-row">
                    <div>
                      <strong>Status:</strong> {computer.status}
                    </div>
                    <div>
                      <strong>Purchase Date:</strong>{' '}
                      {new Date(computer.purchaseDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="info-row">
                    <div>
                      <strong>Warranty Expiry:</strong>{' '}
                      <span
                        style={{
                          color: getWarrantyColor(computer.warrantyExpiryDate),
                        }}
                      >
                        {new Date(computer.warrantyExpiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {computer.specifications && (
                    <div className="specifications">
                      <strong>Specifications:</strong> {computer.specifications}
                    </div>
                  )}
                </div>
                <div className="card-actions">
                  <button className="edit" onClick={() => handleOpenFormModal(computer)}>
                    <FaPencilAlt />
                  </button>
                  <button className="delete" onClick={() => handleOpenDeleteModal(computer)}>
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))}
          </List>
        </InfiniteScroll>
      ) : (
        <WarnNonContent />
      )}

      {selectedComputer && (
        <ConfirmDeleteModal
          show={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteComputer}
          computer={selectedComputer}
        />
      )}

      <ComputerFormModal
        show={isFormModalOpen}
        onClose={handleCloseFormModal}
        computer={selectedComputer || undefined}
        onSave={handleSaveComputer}
      />
    </>
  );
};

export default Table;
