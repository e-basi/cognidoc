'use client';

import React from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {};

const FileUpload = (props: Props) => {
  const { getRootProps, getInputProps } = useDropzone();

  return (
    <div className="p-4 bg-white rounded-xl shadow-md flex justify-center items-center">
  <div
    {...getRootProps()}
    className="w-72 h-36 border-dashed border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 flex justify-center items-center flex-col"
  >
    <input {...getInputProps()} />
    <p className="text-gray-500 text-center">
      Drag & drop files here, or click to select files
    </p>
  </div>
</div>

  );
};

export default FileUpload;
