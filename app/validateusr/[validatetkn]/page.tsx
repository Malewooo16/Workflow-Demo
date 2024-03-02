import fetchPersonalUserInfo from "@/app/actions/testActions/fetchPersonalUserInfo";
import Navbar from "@/app/main-components/Navbar";
import ValidateNewUser from "@/app/main-components/ValidateNewUser";
import Link from "next/link";

interface userData {
  id: number;
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
           
         <ValidateNewUser userData={userData} /> 
          </>
    
        </div>
    )
    }