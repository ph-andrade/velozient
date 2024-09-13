import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Container } from '../styles/components/Header';
import { Computer } from '@/interfaces/Computer';

interface HeaderProps {
  openFormModal: (computer: Computer | null) => void;
}

const Header: React.FC<HeaderProps> = ({ openFormModal }) => {
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
