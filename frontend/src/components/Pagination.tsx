import { PaginationHooks } from '@/interfaces/PaginationHooks'
import React from 'react'
import { AiFillBackward, AiFillForward } from 'react-icons/ai'


const Pagination: React.FC<PaginationHooks> = ({ 
    page,
    setPage
  }) => {
    function pagination(amount: number) {
      const newPage = page - amount;
      setPage(newPage >= 0 ? newPage : 0)
    }
  return (
    <div>
      <button type='button' disabled={page === 0} onClick={() => pagination(1)}><AiFillBackward /></button>  
      <span>{page}</span>
      <button type='button' onClick={() => pagination(-1)}><AiFillForward /></button> 
    </div>
  )
}

export default Pagination