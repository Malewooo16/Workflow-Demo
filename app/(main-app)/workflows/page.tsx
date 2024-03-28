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

interface Workflow {
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



export default async  function page({searchParams} : {searchParams:any}) {
  revalidatePath('/workflows')
  console.log("Search Params", searchParams)
  const session = await getServerSession(authOptions)
 // const userWorkflows: Workflow[] = await fetchWorkflowsPerUser(session?.user.email)
  let workflow:Workflow[] = await fetchTestWorkflowsPerUser(session?.user.email)

 // console.log(process.env.BASE_URL)
  if(searchParams && searchParams.deadline === "week"){
    const currentDate = new Date();

    // Calculate the date for one week from now
    const oneWeekLater = new Date(currentDate);
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    
    // Filter the dates for the next week
     const filteredWorkflow = workflow.filter((w:Workflow) => w.suggestedDeadline >= currentDate && w.suggestedDeadline <= oneWeekLater);

     workflow = filteredWorkflow
  }
  return (
    <div className="flex-1">
  <p className="text-2xl">Your Workflows</p>
  <div className="flex justify-between my-6 w-[90%] mx-4">
    <Link href={`/workflows/new-flows`}>
      <button className="btn btn-success mt-4">Add a new workflow</button>
    </Link>

    <div className="dropdown">
  <div tabIndex={0} role="button" className="btn mt-4">Click</div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
  </div>

  {workflow && workflow.length > 0 ? (
    <div className="grid grid-cols-1 place-items-center md:grid-cols-2 md:place-items-start my-3 px-2">
      {workflow.reverse().map((w) => (
        <Link href={`/workflows/${w.workflowId}`} key={w.workflowId}>
          <div className="card w-auto lg:w-[90%] h-36 bg-base-100 shadow-lg p-4 border border-base-300 mb-4">
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
