"use server"

import prisma from "@/app/db/prismadb";

export default async function fetchWorkflowTimelines(creatorEmail:any){
  if(!creatorEmail || creatorEmail.trim() === '')
   return

   try{
    const workflows = await prisma.workflowTest.findMany({
        where: {
           creatorEmail
        },

        select:{
            timeLines:true
        }
        
    });

    if (!workflows || workflows.length === 0) {
        return { error: "No TimeLines available", success:false };
    }
    
   // console.log(workflows)
   const bundledTimeLines = workflows
  .filter((item:any) => item.timeLines && item.timeLines.length > 0)
  .flatMap((item:any) => JSON.parse(item.timeLines[0]));

console.log(bundledTimeLines);


    return bundledTimeLines;
   }

   catch(error){
    console.log(error)
   }

}