import styled from 'styled-components';

export const Container = styled.header`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.primary};
  margin-bottom: 30px;

  h1 {
    color: #fff;
    font-size: 2rem;
  }

  button {
    border: 2px solid gray;
    color: #5A5A5A;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    background-color: green;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &:hover {
      opacity: 0.6;
    }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }

    @media (max-width: 768px) {
      padding: 6px 14px;
      font-size: 14px;
    }

    @media (max-width: 480px) {
      padding: 4px 12px;
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    height: 80px;
    padding: 8px 16px;

    h1 {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    height: 60px;
    padding: 6px 12px;

    h1 {
      font-size: 0.8rem;
    }
  }
`;
