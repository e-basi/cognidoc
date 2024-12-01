'use client';

import React from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {};

const FileUpload = (props: Props) => {
  const { getRootProps, getInputProps } = useDropzone();

  return (
    <div
      {...getRootProps()}
      className="p-4 bg-gray-100 border border-dashed border-gray-300 rounded-lg"
    >
      <input {...getInputProps()} />
      <p className="text-gray-500">Drag & drop files here, or click to select files</p>
    </div>
  );
};

export default FileUpload;
