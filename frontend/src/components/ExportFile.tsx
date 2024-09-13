import { ExportFileHooks } from '@/interfaces/ExportFileHooks';
import api from '@/services/api';
import { CenterContainer } from '@/styles/components/CenterContainer';
import { NotifyError, NotifySucess } from '@/utils/notify';
import React, { useState } from 'react'

import { FileForm } from '../styles/components/ExportFile'

const ExportFile: React.FC<ExportFileHooks> = ({
  loadSellers,
  setLoading, 
}) => {
  const [file, setFile] = useState<any>();
  
  function setSelectedFile(selectedFile?: File){
    setFile(selectedFile);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", "file");
    formData.append("file", file);

    try {
      const response = await api.post('transaction/import', formData);

      if(response.status === 200) {
        const { totalRows, failedRows } = response.data;
        const successfulRows = totalRows - failedRows.length;
        NotifySucess(
          `Successful rows ${successfulRows}, failed rows: "${
            failedRows.map((rowNumber: number) => ` ${rowNumber}`)
          }"`
        );
        loadSellers();
      }
    } catch (err: any) {
      NotifyError(err?.response?.data?.message || 'Unexpected Error')
    }

    setLoading(false);
  };


  return (
    <FileForm onSubmit={handleSubmit}>
      <CenterContainer>
        <input 
          type="file" 
          onChange={(e) => setSelectedFile(e.target?.files?.[0])} 
        />
        <button disabled={!file}>Upload a file</button>
      </CenterContainer>
    </FileForm>
  )
}

export default ExportFile