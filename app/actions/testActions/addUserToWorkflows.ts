"use server"

import prisma from "@/app/db/prismadb";
import { hash } from "bcrypt";

interface userData {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    role: string;
    password:string;
  }

  //miltevakno@gufum.com
  //nuydehutre@gufum.com

export default async function addUserToWorkflow(formData : userData , userId:string){
 

  try{
    const existingEmail= await prisma.users.findUnique({
        where:{
          emailAddress:formData.emailAddress
        }
    })

    if(existingEmail){
        return {user:null, message:"The user with this email already exists", success:false}
    }
    
    const encryptedPassword= await hash(formData.password, 10)
   

    const newUser= await prisma.users.create({
        data:{
            firstName:formData.firstName,
            lastName:formData.lastName,
            emailAddress:formData.emailAddress,
            phoneNumber:parseInt(formData.phoneNumber),
            role:formData.role,
            hashedPassword:encryptedPassword

        }
    })

    
    const updatedUser = await prisma.testPerson.update({
      where: { userId: userId },
      data: {
        validated: true,
        // Other fields you want to update...
      },
    });
    return { success:true, message:"User Created Successfully"}
}

catch(err){
    console.error('Error creating customer:', err);
    return {success:false, message:"Fatal Error"}
}
}