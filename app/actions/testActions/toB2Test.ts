"use server";
import prisma from "@/app/db/prismadb";
import AWS from "aws-sdk";
//import { promises as fsPromises } from 'fs';

const b2Credentials = {
  accessKeyId: '005a22d462ac6d30000000006',
  secretAccessKey: 'K005S4WF3Aa6kcIQ5vKfFu0fPC1hyKk',
  endpoint: 'https://s3.us-east-005.backblazeb2.com',
  s3ForcePathStyle: true,
};

const s3 = new AWS.S3(b2Credentials);

// Upload function
export default async function toB2Test(formData: FormData, workflowID:string) {
  
  const fileData = formData.get('related-files') as File
  if (!fileData) return;
  if(fileData.size == 0){
    console.log("File Not Detected")
    return
  }
  try {
    // Read the file content
    const buffer = Buffer.from(await fileData.arrayBuffer())

    // Set the parameters for the S3 upload
    const params = {
      Bucket: 'WMA-File-Test',
      Key: fileData.name,
      Body: buffer,
      ContentType: 'application/pdf',
      
    };

    // Upload the file to S3-compatible storage
    const response = await s3.upload(params).promise();

    console.log('File uploaded successfully:', response);

    const prismaData = await prisma.workflowTest.findUnique({
      where:{
        workflowId: workflowID,
      }
    })
    const updatedLoactionArr = [...prismaData.filesLocation, JSON.stringify({fileName:fileData.name, location:response.Location})]
    const updatedFile = await prisma.workflowTest.update({
      where: {
        workflowId: workflowID,
      },
      data: {
        filesLocation: updatedLoactionArr,
      },
    });
    return {
      success: true,
      message: "Success",
      location: response.Location
      
    };
  } catch (error) {
    console.error('Error uploading file to S3-compatible storage:', error);
    return {
      success: false,
      message: "Upload Failed"
    };
  }
}

// Helper function to read file content asynchronously
// async function readFileAsync(file: File): Promise<Buffer> {
//   const fileBuffer = await fsPromises.readFile(file.path);
//   return fileBuffer;
// }

// async function readFileAsync(file: File): Promise<Buffer> {
//   const fileBuffer = await fsPromises.readFile(file.path);
//   return fileBuffer;
// }
