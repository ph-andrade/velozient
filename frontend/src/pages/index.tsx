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
import ComputerFormModal from '@/components/ComputerFormModal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

const Home: React.FC = () => {
  const [computers, setComputers] = useState<Computer[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedComputer, setSelectedComputer] = useState<Computer | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const openDeleteModal = (computer: Computer) => {
    setSelectedComputer(computer);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedComputer(null);
  };

  const handleSaveComputer = async (computerData: Computer, computerId: number) => {
    try {
      if (computerId) {
        const response = await api.put(`/computers/${computerId}`, computerData);
        setComputers(prevComputers =>
          prevComputers.map(computer =>
            computer.id === computerId ? response.data : computer
          )
        );
      } else {
        const response = await api.post('/computers', computerData);
        setComputers(prevComputers => [...prevComputers, response.data]);
      }
      closeFormModal();
    } catch (error) {
      NotifyError('Error saving computer');
    }
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
        closeDeleteModal();
      }
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
            openDeleteModal={openDeleteModal}
          />
        </Layout>
      )}

      <ComputerFormModal
        show={isFormModalOpen}
        onClose={closeFormModal}
        computer={selectedComputer || undefined}
        onSave={handleSaveComputer}
      />

      {selectedComputer && (
        <ConfirmDeleteModal
          show={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteComputer}
          computer={selectedComputer}
        />
      )}
    </>
  );
};

export default Home;
