import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@client/hooks/use-auth';

export const UploadReport: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { session, loading: userLoading } = useAuth();

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
      const response = await axios.post(
        'http://localhost:3000/api/reports',
        formData,
        {
          headers: {
            Authorization: session?.user ?? undefined,
          },
          maxContentLength: 15 * 1024 * 1024, // 15 MB
          maxBodyLength: 15 * 1024 * 1024, // 15 MB
        },
      );

      console.log('Report uploaded:', response.data);
    } catch (error) {
      console.error('Error uploading report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileSizeInMb = files[0].size / (1024 * 1024);
      if (fileSizeInMb > 15) {
        console.error('File size exceeds 15 MB.');
        return;
      }
      setFile(files[0]);
    }
  };

  return (
    <div>
      <h1>Upload Report</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Upload File</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};
