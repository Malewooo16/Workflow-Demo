import prisma from "@/app/db/prismadb"
import { authOptions } from "@/utilities/authOptions"
import { getServerSession } from "next-auth"
import Image from 'next/image'

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  townAddress: string;
  dob: Date;
  emailAddress: string;
  pictureURL: string;
  phoneNumber: string;
  validated: Boolean;
  createdAt: Date;
  role:string;
}

export default async function page({params} :{params:{email:string}}) {
  const user = async()=>{
    "use server"
    try {
      if (!params.email) {
          throw new Error ( "Email address cannot be empty")
      }

      const userData = await prisma.users.findUnique({
          where: {
             id:parseInt(params.email)
          }
      });

      
      return userData;
      
  
  } catch (error) {
      console.error("Error fetching userData:", error);
      return 
  }
  
  }

  const userData:UserData = await user()

  if (!userData) {
    // Handle the case when user data is not available
    return <div>User not found</div>;
  }
  return (
    <div>
        <div className="max-w-2xl mx-auto p-8 bg-gray-50 shadow-md rounded-md">
      <div className="flex items-center justify-center mb-4">
        <Image
          src={userData.pictureURL}
          alt="Profile"
          width={250}
          height={250}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h2 className="text-xl font-bold">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-gray-600">{userData.emailAddress}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
        <ul>
          <li>
            <strong>DOB:</strong> {userData.dob.toDateString()}
          </li>
          <li>
            <strong>Address:</strong> {userData.townAddress}
          </li>
          <li>
            <strong>Phone Number:</strong> {userData.phoneNumber}
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Org Details</h3>
        <ul>
          <li>
            <strong>User ID:</strong> {userData.id}
          </li>
          <li>
            <strong>Role:</strong> {userData.role}
          </li>
          <li>
            <strong>Validation Status:</strong>{" "}
            {userData.validated ? "Validated" : "Not Validated"}
          </li>
        </ul>
      </div>
    </div>
    </div>
  )
}
