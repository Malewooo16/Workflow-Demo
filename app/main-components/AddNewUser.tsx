"use client"

import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { addNewUser } from "@/app/actions/testActions/addUser";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "@/store/cartSlice";


interface UserData {
  firstName: string;
  lastName: string;
  dob: string;
  townAddress: string;
  emailAddress: string;
  phoneNumber:string;
}

export default function AddNewUser( props : {nextStep:number , setNextStep:()=>void}) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Title is required'),
        lastName: Yup.string().required('Description is required'),
        townAddress: Yup.string().required('Deadline is required'),
        phoneNumber:Yup.string().required('Phone Number is required'),
        emailAddress: Yup.string().required('Collaborators are required'),
        dob:Yup.string().required("Add Date of Birth")
      
      });

      const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
      });

      const uploadUser = async (formData:UserData)=>{

        
            try{
               const result = await addNewUser(formData);
               if (result.success) {
                dispatch(setUserData({
                  userId:result.validateTkn,
                  userEmail:result.userEmail
                }))
                props.setNextStep();

              } else {
                if (result.type === 'validation') {
                  // Handle validation error
                  console.log('Validation error:', result.error);
                } else {
                  // Handle generic error
                  setError(result.error)
                  window.scrollTo({ top: 10, behavior: 'smooth'});
                  console.log('Generic error:', result.error);
                }
              }

            }

            catch (err:any){
              setError(err)
                  window.scrollTo({ top: 10, behavior: 'smooth'});
            }
      }
  return (
    <div>
    <form onSubmit={handleSubmit(uploadUser)}>
    <div className="join join-vertical flex max-w-xl">
    {error && <div role="alert" className="alert alert-error max-w-xl">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span> {error} </span>
</div>}
    <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> First Name</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("firstName")}/>
       <p className="text-error text-sm"> {errors.lastName?.message} </p>
        </label>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Last Name</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("lastName")}/>
       <p className="text-error text-sm"> {errors.firstName?.message} </p>
        </label>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Email Address</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("emailAddress")}/>
       <p className="text-error text-sm"> {errors.lastName?.message} </p>
        </label>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Phone Number</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("phoneNumber")}/>
       <p className="text-error text-sm"> {errors.townAddress?.message} </p>
        </label>
        <label className='form-control max-w-xl my-4 join-item'>
           <p className="my-2"> Town Address</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("townAddress")}/>
       <p className="text-error text-sm"> {errors.townAddress?.message} </p>
        </label>
        <label className='form-control max-w-xl mt-4 mb-10 join-item'>
        <p className="my-2"> Date of Birth</p>
        <input type="date"  max={"2007-12-31"} placeholder="Type here" className="input input-bordered w-full "  {...register("dob")}/>
        <p className="text-error text-sm"> {errors.dob?.message} </p>
        </label>

      <button className="btn btn-success my-10" type="submit"> Add User Details {props.nextStep}</button>
        
    </div>
    </form>
    
    </div>
  )
}