
"use server"
import { getServerSession } from "next-auth";



import prisma from "@/app/db/prismadb";
import toB2Test from "./toB2Test";
import imgUpload from "./testPictureUpload";
import * as Yup from 'yup';

interface SuccessResponse {
  success: true;
  message?: string;
  validateTkn: string;
  userEmail:string;
}

interface ErrorResponse {
  type:string;
  success: false;
  error: string;
}


interface UserData {
  firstName: string;
  lastName: string;
  dob: string;
  townAddress: string;
  emailAddress: string;
  phoneNumber: string;
}

const validationSchema = Yup.object().shape({
  lastName: Yup.string().required('Last Name is required'),
  firstName: Yup.string().required('First Name is required'),
  emailAddress: Yup.string().email('Invalid email address').required('Email Address is required'),
  townAddress: Yup.string().required('Town Address is required'),
  dob: Yup.date().required('Date of Birth is required').typeError('Invalid Date'),
  
});

export async function addNewUser(formData: UserData ): Promise<SuccessResponse | ErrorResponse > {
  try {
    await validationSchema.validate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob,
      townAddress: formData.townAddress,
      emailAddress:formData.emailAddress
      
    }, { abortEarly: false });

    const rawFormData: UserData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob,
      townAddress: formData.townAddress,
      emailAddress:formData.emailAddress,
      phoneNumber:formData.phoneNumber
    }
    // Create a FormData instance

    // Parse the deadline string into a JavaScript Date object
    const updatedDob = new Date(rawFormData.dob);
   
    const updatedData = {
      firstName: rawFormData.firstName,
      lastName: rawFormData.lastName,
      emailAddress: rawFormData.emailAddress,
      townAddress: rawFormData.townAddress,
      phoneNumber: rawFormData.phoneNumber,
      role:"Normal user",
      hashedPassword:"1234",
      dob: updatedDob,
      pictureURL:""
      
    };

    const prismaResponse = await prisma.users.create({
      data: updatedData,
    });

    console.log(prismaResponse);

    return { success: true, message: "User created successfully.", validateTkn:prismaResponse.validateTkn, userEmail:prismaResponse.emailAddress };
  } catch (error) {
    console.error('Error creating user:', error);

    if (error instanceof Yup.ValidationError) {
      // Yup validation error
      const validationErrors = error.inner.map(err => ({
        field: err.path,
        message: err.message,
      }));
      console.log(validationErrors);
      return { type:"validation", success: false, error: JSON.stringify(validationErrors) };
    }
    
    return { type: "generic", success: false, error: "Failed to create user." };
  }
}
