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

export default async function addUserToWorkflow(formData : userData ){
 console.log(formData)

  try{
    const existingEmail= await prisma.users.findUnique({
        where:{
          emailAddress:formData.emailAddress
        }
    })

    if(!existingEmail){
        return {user:null, message:"Such user doesn't exists", success:false}
    }
    
    const encryptedPassword= await hash(formData.password, 10)
   

    const newUser= await prisma.users.update({
      where:{
          emailAddress:formData.emailAddress
      },
        data:{
            hashedPassword:encryptedPassword,
            validated:true

        }
    })

    console.log(newUser)


    return { success:true, message:"User Created Successfully"}
}

catch(err){
    console.error('Error creating customer:', err);
    return {success:false, message:"Fatal Error"}
}
}