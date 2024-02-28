import { getServerSession } from "next-auth";

import prisma from "@/app/db/prismadb";
import { revalidatePath } from "next/cache";
import Link from "next/link";

interface Workflow {
    workflowId: string;
    workflowTitle: string;
    workflowDescription: string;
    firstName: string;
    lastName: string;
    creatorEmail: string;
    suggestedDeadline: Date;
    collaborators: string;
  }

  interface FileInfo{
    fileName:string;
    location:string;
  }
  
  interface NewWorkflow {
    workflowId: string;
    workflowTitle: string;
    workflowDescription: string;
    firstName: string;
    lastName: string;
    creatorEmail: string;
    suggestedDeadline: Date;
    collaborators: string;
    filesLocation:string[]; //It's in JSON refer to Interface FileInfo
  }
export  default async function Workflows({params}: {params:{workflowId:string}}) {

    "use server"
    const workflow: NewWorkflow = await prisma.workflowTest.findUnique({
        where:{
            workflowId:params.workflowId
        },

    })

    
    
revalidatePath('/')
    return(
        <div className="container mx-auto mt-2">
      <h1 className="text-3xl font-bold mb-4">{workflow.workflowTitle}</h1>
      <p className="text-gray-600 mb-4">{workflow.workflowDescription}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Workflow Information</h2>
          <ul className="list-disc pl-4">
            <li>
              <strong>Creator:</strong> {workflow.firstName} {workflow.lastName}
            </li>
            <li>
              <strong>Email:</strong> {workflow.creatorEmail}
            </li>
            <li>
              <strong>Deadline:</strong> {workflow.suggestedDeadline.toString()}
            </li>
            <li>
              <strong>Collaborators:</strong> {workflow.collaborators}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Related Files</h2>
          <ul className="list-disc pl-4">
            {workflow.filesLocation.map((fileLocation, index) => {
              const fileInfo: FileInfo = JSON.parse(fileLocation);

              return (
                <li key={fileInfo.fileName}>
                <Link href={fileInfo.location} target="_blank" rel="noopener noreferrer">
                    <p className="text-blue-500 hover:underline" >
                      {fileInfo.fileName}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
          
        </div>
      </div>

      <div> 
      <h2 className="text-xl font-bold mt-4 mb-2">Actions</h2>
      <div className="flex justify-between">
      <button className="btn btn-info"> View in Scheduler </button>
      <button className="btn btn-warning"> View in Scheduler </button>
      <button className="btn btn-error"> View in Scheduler </button>
      </div>
      </div>
    </div>
  );

    //console.log(params.workflowId)
 
    
}