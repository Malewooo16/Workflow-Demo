"use server"

import { getServerSession } from "next-auth";
import prisma from "@/app/db/prismadb";
import toB2Test from "./toB2Test";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/utilities/authOptions";

interface SuccessResponse {
  success: true;
  message?: string;
  workflowId:string;
}

interface ErrorResponse {
  success: false;
  error: string;
}

export async function addNewWorkflowB2Test(formData: { workflowTitle: string; description: string; deadline: string; with: string;  } , agendas: any): Promise<SuccessResponse | ErrorResponse> {
  try {
    const session = await getServerSession(authOptions);

    const rawFormData = {
      collaborators: formData.with,
      workflowTitle: formData.workflowTitle,
      workflowDescription: formData.description,
      suggestedDeadline: formData.deadline,
   
    };

    // Create a FormData instance

   

    // Parse the deadline string into a JavaScript Date object
    const deadlineDate = new Date(rawFormData.suggestedDeadline);

   console.log(agendas)
    const updatedData = {
      collaborators: rawFormData.collaborators,
      workflowTitle: rawFormData.workflowTitle,
      workflowDescription: rawFormData.workflowDescription,
      suggestedDeadline: deadlineDate,
      timeLines: [JSON.stringify(agendas)],
      creatorEmail: session?.user.email,
      firstName: session?.user.firstName,
      lastName: session?.user.lastName,
     
    };

    const prismaResponse = await prisma.workflowTest.create({
      data: updatedData,
    });


   const workflowId = prismaResponse.workflowId as string;
   revalidatePath(`/workflows`);
  
    return { success: true, message: "Workflow created successfully." , workflowId };
  } catch (error) {
    console.error('Error creating workflow:', error);

    return { success: false, error: "Failed to create workflow." };
  }
  
}

