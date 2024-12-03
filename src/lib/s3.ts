import { S3 } from '@aws-sdk/client-s3';

export async function uploadToS3(file: File) {
    try {
        const s3 = new S3({
            region: 'us-east-2',
            credentials: {
                accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
                secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
            },
        });

        const fileKey = 'uploads/' + Date.now().toString() + file.name.replace(' ', '-');

        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: fileKey,
            Body: file,
        };

        // Perform the upload
        await s3.putObject(params);
        console.log('File successfully uploaded to S3:', fileKey);
        return fileKey; // Return the key if needed
    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw error; // Re-throw error for further handling
    }
}