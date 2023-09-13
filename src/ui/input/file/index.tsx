import React, { ChangeEvent, useState } from 'react';
import s from './file.module.css';

interface FileInputProps {
  onFileSelect: (file: File | null) => void;
  label: string;
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelect, label }) => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
    onFileSelect(file);
  };

  return (
    <label className={s.label}>
      {file?.name ?? label}
      <input className={s.file} type="file" onChange={handleFileChange} />
    </label>
  );
};

export default FileInput;
