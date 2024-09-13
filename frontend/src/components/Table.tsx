import React from 'react';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';
import { List } from '../styles/components/List';
import WarnNonContent from './WarnNonContent';
import { TableHooks } from '@/interfaces/TableHooks';

const Table: React.FC<TableHooks & { loadMoreData: () => void; hasMore: boolean }> = ({
  computers,
  loadMoreData,
  hasMore,
  openFormModal,
  openDeleteModal,
}) => {
  const defaultImage = '/default-computer.jpeg';

  const getImageSrc = (imageURL: string | undefined) => {
    return imageURL || defaultImage;
  };

  const getWarrantyColor = (warrantyExpiryDate: string): string => {
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
                      {new Date(computer.purchaseDate).toLocaleDateString('en-GB', { timeZone: 'UTC' })}
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
                        {new Date(computer.warrantyExpiryDate).toLocaleDateString('en-GB', { timeZone: 'UTC' })}
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
                  <button className="edit" onClick={() => openFormModal(computer)}>
                    <FaPencilAlt />
                  </button>
                  <button className="delete" onClick={() => openDeleteModal(computer)}>
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
    </>
  );
};

export default Table;
