import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Layout } from '../styles/components/Layout';
import Header from '@/components/Header';
import Table from '@/components/Table';
import { Loading } from '@/styles/components/Loading';
import api from '@/services/api';
import { NotifyError } from '@/utils/notify';
import { Computer } from '@/interfaces/Computer';
import ComputerFormModal from '@/components/ComputerFormModal'; // Importa o modal

const Home: React.FC = () => {
  const [computers, setComputers] = useState<Computer[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedComputer, setSelectedComputer] = useState<Computer | null>(null);

  async function loadSellers(currentPage: number) {
    setLoading(true);
    try {
      const response = await api.get('/computers', { params: { page: currentPage } });
      
      if (response.status === 200) {
        const newComputers = response.data;

        if (newComputers.length === 0) {
          setHasMore(false);
        } else {
          setComputers((prevComputers) => [...prevComputers, ...newComputers]);
        }
      } else {
        NotifyError(response.data?.message || 'Unexpected Error');
      }
    } catch (err) {
      NotifyError('Unexpected Error');
    }

    setLoading(false);
  }

  useEffect(() => {
    loadSellers(page);
  }, [page]);

  const loadMoreData = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const openFormModal = (computer: Computer | null) => {
    setSelectedComputer(computer);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedComputer(null);
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
      closeFormModal();
    } catch (error) {
      NotifyError('Error saving computer');
    }
  };

  return (
    <>
      <Header openFormModal={openFormModal} />
      <Head>
        <title>Velozient</title>
      </Head>
      <ToastContainer />
      {loading && page === 1 ? (
        <Loading>
          <AiOutlineLoading3Quarters size={200} />
        </Loading>
      ) : (
        <Layout>
          <Table
            computers={computers}
            setComputers={setComputers}
            loadMoreData={loadMoreData}
            hasMore={hasMore}
            openFormModal={openFormModal}
          />
        </Layout>
      )}

      <ComputerFormModal
        show={isFormModalOpen}
        onClose={closeFormModal}
        computer={selectedComputer || undefined}
        onSave={handleSaveComputer}
      />
    </>
  );
};

export default Home;
