
import { authOptions } from '@/utilities/authOptions'
import { getServerSession } from 'next-auth'

export default async function Dashboard() {

  const session= await getServerSession(authOptions)
  //console.log(session);
  
  return (
    
    <h1 className="text-3xl text-center mt-5 ms-5"> Welcome To Your Dashboard {session?.user.firstName}  </h1>
  )
}
