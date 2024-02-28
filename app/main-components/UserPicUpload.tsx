"use client"

import { useState } from "react";
import Image from 'next/image'
import { useSelector } from "react-redux";
import userPicUpload from "../actions/testActions/testPictureUpload";


export default function UserPicUpload(props : {nextStep:number , setNextStep : ()=> void}) {

   const [base64String, setBase64String] = useState <string | null>('')
   const [error, setError] = useState('')
   const [success, setSuccess] = useState('')
   const userId = useSelector((state:any)=>state.cart.userData.userId)
    const handleFileChange = (event:any) => {
        const file = event.target.files[0];
    
        if (file) {
          // Read the file as a data URL
          const reader = new FileReader();
    
          reader.onloadend = () => {
            // Set the Base64 string in the state
            const base64 = reader.result as string
            setBase64String(base64);
          };
    
          reader.readAsDataURL(file);
        }

       
      };

      const toFinalStep =async(formData :FormData) =>{
        const response = await userPicUpload(formData, userId)
        try{
          if(response?.success){
            setError('')
            setSuccess(response.message)
            props.setNextStep()
          }
          else{
            setError("Failed to Upload user Picture")
          }
        }
        catch (err){
          setError("Failed to Upload user Picture")
        }
      }
 

  return (
    <div>
      {success && <div role="alert" className="alert alert-success">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span> {success} </span>
</div>}
{error && <div role="alert" className="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span> {error} </span>
</div>}
        <h2 className="text-lg my-4">Upload User Pic</h2>
        <form action={toFinalStep}>
        <p> {userId} </p>
        <input type="file" className="file-input file-input-bordered w-full" name="userPic" onChange={handleFileChange} required />
        <p>Preview:</p>
        {base64String && <Image className="my-4" src={base64String} alt="preview" width={250} height={250} /> }
        <button className="btn btn-success my-2" type="submit">Upload</button>
        </form>
    </div>
  )
}
