import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: flex;
  margin-top: 30vh;
  justify-content: center;

  svg {
    color: #eee;
    animation: ${rotate} 2s linear infinite;
  }
`;