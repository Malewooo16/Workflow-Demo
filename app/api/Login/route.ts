import prisma from "@/app/db/prismadb"
import { NextResponse } from "next/server"
import { hash, compare} from 'bcrypt'

export async function POST(req:Request){
    const requestBody= await req.json()
    const {userName, password}= requestBody
    if(!userName && !password){
        return
    }
    try{
        const existingUser= await prisma.users.findUnique({
            where:{emailAddress:userName}
        })
    
        if(!existingUser){
            return NextResponse.json({user:null, message:"User Doesn't exist"}, {status:408})
        }
    
       const comparePassword= await compare(password, existingUser.hashedPassword)
       if(!comparePassword){
        return NextResponse.json({user:null, message:"Invalid Password"}, {status:409})
    }
       
        return NextResponse.json({ user:existingUser, message:"User Found"})
    }

    catch(err){
        console.error('Error creating customer:', err);
        return NextResponse.json({message:"Fatal Error"}, {status:500})
    }
}