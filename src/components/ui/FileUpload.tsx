'use client';

import axios from "axios";
import { uploadToS3 } from '@/lib/s3'; 
import { useMutation } from '@tanstack/react-query';
import { Inbox, Loader2 } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import toast from "react-hot-toast";

type Props = {};

const FileUpload = (props: Props) => {
  const [uploading, setUploading] = React.useState(false); // State to handle S3 upload loading
  const mutation = useMutation({
    mutationFn: async ({ file_key, file_name }: { file_key: string; file_name: string }) => {
      console.log("Sending to /api/chat-creation:", { file_key, file_name });
      const response = await axios.post('/api/chat-creation', { file_key, file_name });
      return response.data;
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      toast.error("An error occurred while creating the chat.");
    },
    onSuccess: (data) => {
      console.log("Mutation successful:", data);
      toast.success("chat created successfully!");
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log("Accepted files:", acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 12 * 1024 * 1024) {
        toast.error("File too large");
        return;
      }

      try {
        setUploading(true); // Start S3 upload loading
        const data = await uploadToS3(file);
        console.log("S3 Response:", data);

        const file_key = data.fileKey;
        const file_name = data.fileName;

        mutation.mutate({ file_key, file_name }); // Use mutate method
      } catch (error) {
        console.error("Error during file upload:", error);
        toast.error("File upload failed. Please try again.");
      } finally {
        setUploading(false); // End S3 upload loading
      }
    },
  });

  const isMutationLoading = mutation.status === "pending"; // Correct comparison to "pending"

  return (
    <div className="p-4 bg-white rounded-xl shadow-md flex justify-center items-center">
      <div
        {...getRootProps()}
        className="w-72 h-36 border-dashed border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 flex justify-center items-center flex-col"
      >
        <input {...getInputProps()} />
        {uploading || isMutationLoading ? ( // Use derived loading state
          <>
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">Uploading File...</p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-700" />
            <p className="mt-2 text-sm text-slate-400 font-medium">Upload PDF Here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
