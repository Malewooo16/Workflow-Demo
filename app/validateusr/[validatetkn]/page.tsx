import fetchPersonalUserInfo from "@/app/actions/testActions/fetchPersonalUserInfo";
import Navbar from "@/app/main-components/Navbar";
import ValidateNewUser from "@/app/main-components/ValidateNewUser";
import Link from "next/link";

interface userData {
  userId: string;
  firstName: string;
  lastName: string;
  townAddress: string;
  dob: Date;
  emailAddress: string;
  pictureURL: string;
  phoneNumber: string;
  validated: Boolean;
  createdAt: Date;
}
export default async function Validate({params}: {params:{validatetkn:string}}){
  const userData:userData = await fetchPersonalUserInfo(params.validatetkn)
  //console.log(userData)
    return(
        <div>
            <Navbar />
            <>
           
          {params.validatetkn === "validatesuccess" ? <div className="flex items-center justify-center h-screen">
    <div className="bg-base-200 p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Authentication Successful!</h1>
      <p className="text-gray-700 mb-4">
        Welcome back! You have successfully authenticated. Feel free to explore your account.
      </p>
      <button
        className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 text-lg font-bold"
        
      >
       <Link href={"/"}>Login</Link>
      </button>
    </div>
  </div>:<ValidateNewUser userData={userData} /> }
          </>
    
        </div>
    )
    }