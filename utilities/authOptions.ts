import prisma from "@/app/db/prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcrypt"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions:NextAuthOptions={
    adapter: PrismaAdapter(prisma) ,
    secret: process.env.NEXTAUTH_SECRET ,
    session:{
        strategy:"jwt"
    },
    pages:{
      signIn:"/",
      
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
           if(!credentials?.username || !credentials?.password ){
            return null
           }
            const existingUser=await prisma.users.findUnique({
                where:{emailAddress:credentials.username}
            })

            if(!existingUser){
                return null
            }
            const passwordMatch = await compare(credentials.password, existingUser.hashedPassword)
             
            if(!passwordMatch){
                return null
            }
            return{ 
                id: `${existingUser.id}`,
                firstName:existingUser.firstName,
                lastName:existingUser.lastName,
                email:existingUser.emailAddress,
                role:existingUser.role,

                
            }
          }
        })
      ],
      callbacks:{
          async jwt({ token, user }) {
            if(user){
                return{
                    ...token,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    role:user.role,
                    email:user.email,
                    id:user.id
                }
                
            }
            return token
          },
          async session({ session,  token }) {
            return {
                ...session,
            user:{
                ...session.user,
                firstName:token.firstName,
                lastName:token.lastName,
                email:token.email,
                role:token.role,
                id:token.id
            }
            }
          },
      }
}

