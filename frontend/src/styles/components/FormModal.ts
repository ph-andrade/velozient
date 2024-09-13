// components/ModalStyles.tsx
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 15px;
      font-weight: bold;
      display: flex;
      flex-direction: column;
    }

    input, textarea {
      margin-top: 5px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 100%;
    }

    textarea {
      height: 100px;
    }

    .button-group {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 20px;

      button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:first-of-type {
          background: #007bff;
          &:hover {
            background: #0056b3;
          }
        }

        &:last-of-type {
          background: #dc3545; /* Cor avermelhada para o botão Cancel */
          &:hover {
            background: #c82333;
          }
        }
      }
    }
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    color: #000; /* Cor preta para o botão de fechar */
    font-size: 24px;
    cursor: pointer;

    &:hover {
      color: #333; /* Cor preta um pouco mais escura ao passar o mouse */
    }
  }

  @media (max-width: 768px) {
    padding: 15px;

    h2 {
      font-size: 18px;
    }

    label {
      font-size: 12px;
    }

    input, textarea {
      padding: 2px;
      font-size: 10px;
      max-height: 25px;
    }

    .button-group {
      flex-direction: column;
      gap: 10px;

      button {
        width: 100%;
        font-size: 14px;
      }
    }
  }
  
  @media (max-width: 480px) {
    max-width: 200px;
    max-height: 500px;
    padding: 8px;

    h2 {
      font-size: 16px;
    }

    label {
      font-size: 10px;
    }

    input, textarea {
      font-size: 8px;
      max-height: 20px;
      padding: 1px;
    }

    .button-group {
      button {
        font-size: 12px;
      }
    }
  }
`;
