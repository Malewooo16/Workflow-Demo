import fetchWorkflowTimelines from '@/app/actions/testActions/fetchTimeLines'

import CalenderDemo from '@/app/main-components/Calender'
import PureCalender from '@/app/main-components/PureCalender'
import { authOptions } from '@/utilities/authOptions'
import { getServerSession } from 'next-auth'


export default async function page() {

  const session = await getServerSession(authOptions) 
  const email = session?.user.email
  const timeLines = await fetchWorkflowTimelines(email) as any
 console.log(timeLines)
  
if(!timeLines){
  return(
   <PureCalender />
   
  )
}
 
  
  return (
    <div>
        <CalenderDemo timeLines={timeLines}/>
    </div>
  )
}
