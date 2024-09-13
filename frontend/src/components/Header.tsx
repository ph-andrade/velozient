import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Container } from '../styles/components/Header';
import { HeaderHooks } from '@/interfaces/HeaderHooks';

const Header: React.FC<HeaderHooks> = ({ openFormModal }) => {
  return (
    <Container>
      <h1>Velozient Computers</h1>
      <button onClick={() => openFormModal(null)}>
        <AiOutlinePlus /> Add Computer
      </button>
    </Container>
  );
};

export default Header;
