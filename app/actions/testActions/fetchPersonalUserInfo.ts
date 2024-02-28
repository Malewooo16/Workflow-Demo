import prisma from "@/app/db/prismadb";
import { revalidatePath } from "next/cache";


async function fetchPersonalUserInfo(userId: string ) {
    try {
        if (!userId || userId.trim() === '') {
            throw new Error ( "Email address cannot be empty")
        }

        const userData = await prisma.testPerson.findUnique({
            where: {
               userId
            }
        });

        
        return userData;
        
    
    } catch (error) {
        console.error("Error fetching userData:", error);
        return { error: "Internal Server Error", success:false };
    }

    
}

export default fetchPersonalUserInfo;
