"use server"

import { getServerSession } from "next-auth";

import prisma from "../db/prismadb";
import { authOptions } from "@/utilities/authOptions";

interface SuccessResponse {
  success: true;
  message?: string;
}

interface ErrorResponse {
  success: false;
  error: string;
}

export async function addNewWorkflow(formData: { workflowTitle: string; description: string; deadline: string; with: string; }): Promise<SuccessResponse | ErrorResponse> {
  try {
    const session = await getServerSession(authOptions);

    const rawFormData = {
      collaborators: formData.with,
      workflowTitle: formData.workflowTitle,
      workflowDescription: formData.description,
      suggestedDeadline: formData.deadline,
      
    };
    const { suggestedDeadline } = rawFormData;

    // Parse the deadline string into a JavaScript Date object
    const deadlineDate = new Date(suggestedDeadline);

    const updatedData = {
      ...rawFormData,
      suggestedDeadline: deadlineDate,
      creatorEmail: session?.user.email,
      firstName: session?.user.firstName,
      lastName: session?.user.lastName,
    };

    await prisma.theWorkflow.create({
      data: updatedData,
    });

    console.log(updatedData);

    return { success: true, message: "Workflow created successfully." };
  } catch (error) {
    console.error('Error creating workflow:', error);

    return { success: false, error: "Failed to create workflow." };
  }
}
