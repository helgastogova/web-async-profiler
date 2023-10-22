import React, { useState } from 'react';
import { Button, Input } from '@ui';

interface UploadWidgetProps {
  onUpload: (file: File) => void;
}

const UploadWidget: React.FC<UploadWidgetProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUploadClick = () => {
    if (file) {
      onUpload(file);
      setFile(null);
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUploadClick}>Upload</Button>
    </div>
  );
};

export default UploadWidget;
