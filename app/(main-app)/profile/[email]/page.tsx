import { authOptions } from "@/utilities/authOptions"
import { getServerSession } from "next-auth"


export default function page({params} :{params:{email:string}}) {
  console.log(getServerSession(authOptions))
  return (
    <div>
        <h1>{params.email}</h1>
    </div>
  )
}
