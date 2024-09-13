/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import { TransactionTableHooks } from '@/interfaces/TransactionTableHooks';
import { OptionContainer } from '@/styles/components/OptionContainer';
import React, { useEffect, useState } from 'react'

import { List } from '../styles/components/List'
import WarnNonContent from './WarnNonContent';
import Pagination from './Pagination';
import { Seller } from '@/interfaces/Seller';

const TransactionTable: React.FC<TransactionTableHooks> = ({
  selectedSeller,
  setSelectedSeller
}) => {
  const [page, setPage] = useState<number>(0);
  const [transactions, setTransactions] = useState<Seller['transactions']>([]);
  const limit = 10;

  function getTransactionsByPage(currentPage: number){
    const referenceValue = currentPage * limit;
    const currentTransactions = selectedSeller?.transactions.slice(
      referenceValue, 
      referenceValue + limit
    ) || [];

    setTransactions(currentTransactions);
  }

  function formatDate(date: string): string {
    return dayjs(date).format('YYYY/MM/DD HH:mm')
  }
 
  function getTransactionType(type: number) {
    switch (type) {
      case 1:
        return 'producer sale';
      case 2: 
        return 'affiliated sale'
      case 3: 
        return 'paid commission'
      case 4: 
        return 'take commission'
      default:
        return 'unknown'
    }
  }

  useEffect(() => {
    getTransactionsByPage(page);
  }, [page])

  return (
    <>
      {transactions.length ? (
        <List>
          <div>
            <span style={{width: "150px"}}>Date</span>
            <span style={{width: "150px"}}>Products</span>
            <span>Type</span>
            <span>Value</span>
          </div>
          {transactions.map((transaction) => (
              <li key={transaction.id}>
                <span>{formatDate(transaction.date)}</span>
                <span style={{width: "250px"}}>{transaction.product}</span>
                <span>{getTransactionType(transaction.type)}</span>
                <span>{transaction.value}</span>  
              </li>
            ))
          }
       
        </List>
      ): <WarnNonContent />}
      <OptionContainer>
        <button type='button' onClick={() => setSelectedSeller(undefined)}>Back</button>
        <Pagination 
          page={page}
          setPage={setPage}
        />
      </OptionContainer>
    </>
  )
}

export default TransactionTable