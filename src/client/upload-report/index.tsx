import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@client/hooks/use-auth';
import { FileInput, Button, Layout, Loader } from '@ui';

import s from './upload-report.module.css';

export const UploadReport: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { session, loading: userLoading } = useAuth();

  if (userLoading) return <Loader />;
  if (!session) return <div>Unauthorized</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      console.error('No file selected');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/api/upload-reports', formData, {
        user: session?.user,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Report uploaded:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Error Message: ${error.message}`);
        console.error(`Status Code: ${error.response?.status}`);
        console.error(`Data: ${JSON.stringify(error.response?.data)}`);
        console.error(`Config: ${JSON.stringify(error.config)}`);
      } else {
        console.error('An unexpected error occurred:', error);
      }
      console.error('Error uploading report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      const fileSizeInMb = file.size / (1024 * 1024 * 15);
      if (fileSizeInMb > 15) {
        console.error('File size exceeds 15 MB.');
        return;
      }
      setFile(file);
    }
  };

  return (
    <>
      <Layout.Title>Upload Report</Layout.Title>
      <form onSubmit={handleSubmit} className={s.form}>
        <FileInput label="Choose a file" onFileSelect={handleFileChange} />
        <Button type="submit" disabled={loading || !file}>
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
    </>
  );
};
