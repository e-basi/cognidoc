'use client';

import { uploadToS3 } from '@/lib/s3';
import { Inbox } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {};

const FileUpload = (props: Props) => {
  const { getRootProps, getInputProps } = useDropzone( {
    accept: {"application/pdf": [".pdf"]},
    maxFiles: 1,
    onDrop: async (accceptedFiles) => {
        console.log(accceptedFiles);
        const file = accceptedFiles[0];
        if (file.size > 12 * 1024 * 1024){
          alert('please upload a smaller file');
          return;
        }

        try{
          const data = await uploadToS3(file);
          console.log("data", data)
        } catch (error) {
          console.log(error);
        }
    },
  });
       

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
