import React, { useRef } from 'react';
import { Upload, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useDataset } from '@/contexts/DatasetContext';
import { parseCSVData, limitDatasetSize, type UploadedDataset } from '@/utils/mockData';

const DatasetUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { uploadedDataset, setUploadedDataset, isDatasetUploaded } = useDataset();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: 'Invalid File',
        description: 'Please upload a CSV file',
        variant: 'destructive',
      });
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Please upload a file smaller than 5MB',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        let parsedData = parseCSVData(csvText);

        if (parsedData.length === 0) {
          toast({
            title: 'Empty Dataset',
            description: 'The CSV file contains no valid data',
            variant: 'destructive',
          });
          return;
        }

        // Limit dataset size for performance
        const originalLength = parsedData.length;
        parsedData = limitDatasetSize(parsedData, 1000);

        const dataset: UploadedDataset = {
          fileName: file.name,
          uploadDate: new Date(),
          rowCount: parsedData.length,
          data: parsedData
        };

        setUploadedDataset(dataset);
        
        const message = originalLength > 1000 
          ? `Loaded ${parsedData.length} of ${originalLength} records (limited for performance)`
          : `Successfully loaded ${parsedData.length} records`;

        toast({
          title: 'Dataset Uploaded',
          description: message,
        });
      } catch (error) {
        toast({
          title: 'Upload Failed',
          description: error instanceof Error ? error.message : 'Failed to parse CSV file',
          variant: 'destructive',
        });
      }
    };

    reader.onerror = () => {
      toast({
        title: 'Upload Failed',
        description: 'Failed to read the file',
        variant: 'destructive',
      });
    };

    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClearDataset = () => {
    setUploadedDataset(null);
    toast({
      title: 'Dataset Cleared',
      description: 'Using default generated data',
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />

      {isDatasetUploaded ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-xs font-medium text-success">
              {uploadedDataset?.rowCount} records
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearDataset}
            className="w-8 h-8"
            aria-label="Clear dataset"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUploadClick}
          className="gap-2"
          aria-label="Upload dataset"
        >
          <Upload className="w-4 h-4" />
          <span className="hidden xl:inline">Upload Dataset</span>
        </Button>
      )}
    </div>
  );
};

export default DatasetUpload;
