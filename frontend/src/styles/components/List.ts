import styled from 'styled-components';

export const List = styled.div<{ selectable?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
  padding: 0;
  background: transparent;

  .card {
    background: #fff;
    border-radius: 30px;
    overflow: hidden;
    display: flex;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
    flex-direction: row;

    .card-image {
      width: 150px;
      height: 150px;
      margin-right: 15px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      img {
        height: auto;
        object-fit: cover;
        align-items: center;
      }
    }
    
    .card-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;

      .info-row {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        margin-bottom: 8px;

        & > div {
          width: 48%;
        }
      }

      .specifications {
        font-size: 14px;
        margin-top: 16px;
      }
    }

    .card-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-left: auto;
      align-items: center;
      margin-top: 16px;

      button {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background-color: #ddd;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #d2d2d2;
        }

        svg {
          font-size: 20px;
        }

        &.edit {
          color: #007bff;
        }

        &.delete {
          color: #dc3545;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .card {
      flex-direction: column;
      align-items: center;
      text-align: center;

      .card-image {
        margin-right: 0;
        margin-bottom: 16px;
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        img {
          object-fit: cover;
          height: auto;
          align-items: center;
        }
      }
      

      .card-actions {
        margin-left: 0;
      }
    }
  }

  @media (max-width: 480px) {
    .card {
      padding: 8px;
    }

    .card-actions {
      button {
        width: 30px;
        height: 30px;
        svg {
          font-size: 18px;
        }
      }
    }
  }
`;
