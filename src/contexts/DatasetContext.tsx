import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UploadedDataset } from '@/utils/mockData';

interface DatasetContextType {
  uploadedDataset: UploadedDataset | null;
  setUploadedDataset: (dataset: UploadedDataset | null) => void;
  isDatasetUploaded: boolean;
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined);

export const DatasetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uploadedDataset, setUploadedDataset] = useState<UploadedDataset | null>(null);

  const value = {
    uploadedDataset,
    setUploadedDataset,
    isDatasetUploaded: uploadedDataset !== null,
  };

  return (
    <DatasetContext.Provider value={value}>
      {children}
    </DatasetContext.Provider>
  );
};

export const useDataset = () => {
  const context = useContext(DatasetContext);
  if (context === undefined) {
    throw new Error('useDataset must be used within a DatasetProvider');
  }
  return context;
};
