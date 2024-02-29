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
        return ;
    }
    
   // console.log(workflows)
   const bundledTimeLines = workflows
  .filter((item:any) => item.timeLines && item.timeLines.length > 0)
  .flatMap((item:any) => JSON.parse(item.timeLines[0]))
  .map((item:any) => ({
    title: item.title,
    startDate: new Date(item.startTime),
    endDate: new Date(item.endTime),
  }));

console.log(bundledTimeLines);


    return bundledTimeLines;
   }

   catch(error){
    console.log(error)
   }

}