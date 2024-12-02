'use client';

import { Inbox } from 'lucide-react';
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
    <>
    <Inbox className='w-10 h-10 text-blue-700'/>
    <p className='mt-2 text-sm text-slate-400 font-medium'> Upload PDF Here </p>
    </>
  </div>
</div>

  );
};

export default FileUpload;
