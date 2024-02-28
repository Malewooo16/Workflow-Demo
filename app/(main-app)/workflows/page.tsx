import fetchWorkflowsPerUser from "@/app/main-components/UserWorkflows";
import Link from "next/link";
import { getServerSession } from "next-auth";
import fetchTestWorkflowsPerUser from "@/app/actions/testActions/testFetchWorkflows";
import { revalidatePath } from 'next/cache'
import { authOptions } from "@/utilities/authOptions";


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
  fileLocation:string;
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
  fileInfo : FileInfo[];
}



export default async  function page() {
  revalidatePath('/workflows')
  const session = await getServerSession(authOptions)
 // const userWorkflows: Workflow[] = await fetchWorkflowsPerUser(session?.user.email)
  const newWorkflow:NewWorkflow[] = await fetchTestWorkflowsPerUser(session?.user.email)
 // console.log(process.env.BASE_URL)
  
  return (
    <div className="flex-1">
  <p className="text-2xl">Your Workflows</p>
  <div className="flex justify-center my-6">
    <Link href={`/workflows/new-flows`}>
      <button className="btn btn-success mt-4">Add a new workflow</button>
    </Link>
  </div>

  {newWorkflow && newWorkflow.length > 0 ? (
    <div className="grid grid-cols-1 place-items-center md:grid-cols-2 md:place-items-start my-3 px-2">
      {newWorkflow.reverse().map((w) => (
        <Link href={`/workflows/${w.workflowId}`} key={w.workflowId}>
          <div className="card w-96 h-36 bg-base-100 shadow-lg p-4 border border-base-300 mb-4">
            <ul className="mb-2">
              <>
                <li>{w.workflowTitle}</li>
                <li>{`By ${w.firstName} ${w.lastName}`}</li>
                <li>Deadline {w.suggestedDeadline.toDateString()}</li>
              </>
            </ul>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <p className="text-center text-lg">No workflows available.</p>
  )}
</div>
  )
}
