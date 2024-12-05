'use client';

import axios from "axios";
import { uploadToS3 } from '@/lib/s3';
import { useMutation } from '@tanstack/react-query';
import { Inbox } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {};

const FileUpload = (props: Props) => {
  const { mutate } = useMutation({
    mutationFn: async ({ file_key, file_name }: { file_key: string; file_name: string }) => {
      console.log("Sending to /api/chat-creation:", { file_key, file_name });
      const response = await axios.post('/api/chat-creation', { file_key, file_name });
      return response.data;
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert("An error occurred while creating the chat.");
    },
    onSuccess: (data) => {
      console.log("Mutation successful:", data);
      alert("File uploaded and chat created successfully!");
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log("Accepted files:", acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 12 * 1024 * 1024) {
        alert("Please upload a smaller file");
        return;
      }

      try {
        const data = await uploadToS3(file);
        console.log("S3 Response:", data);

        const file_key = data.fileKey;
        const file_name = data.fileName;

        mutate({ file_key, file_name });
      } catch (error) {
        console.error("Error during file upload:", error);
        alert("File upload failed. Please try again.");
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
          <Inbox className="w-10 h-10 text-blue-700" />
          <p className="mt-2 text-sm text-slate-400 font-medium">Upload PDF Here</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
