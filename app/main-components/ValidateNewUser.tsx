"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import addUserToWorkflow from "../actions/testActions/addUserToWorkflows";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
export default function ValidateNewUser(props: { userData: userData }) {
  const router = useRouter()
  const userData = props.userData;
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const validationSchema = Yup.object().shape({
    password: Yup.string().min(6).required("Password is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords don't match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const validateUser = async (formData: any) => {
    const { password } = formData;
    const { firstName, lastName, emailAddress, phoneNumber } = userData;
    //console.log(formData)
    //console.log(password)
   
    const newUser = {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      password,
      role: "Normal User",
    }

    const createUserResponse = await addUserToWorkflow(newUser)

   try{
    if(createUserResponse.success){
      setError("");
      router.push('/validatesuccess')
  }

  else{
    setError("Error in creating user");
    window.scrollTo({ top: 10, behavior: 'smooth' });
  }
   }

   catch(err){
    setError(`Error in creating user ${err}`);
    window.scrollTo({ top: 10, behavior: 'smooth' });
   }
  };

  try {
    return (
      <div className="flex items-center flex-col">

{error && <div role="alert" className="alert alert-error max-w-xl">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span> {error} </span>
</div>}
        {!userData.validated ? (
          <form onSubmit={handleSubmit(validateUser)} className="max-w-xl">
            <div className="join join-vertical flex ">
              <h1 className="flex text-xl text-center">
                Vaildate Your Information and passwords to access your account
              </h1>
              <label className="form-control max-w-xl my-4 join-item">
                <p className="my-2"> First Name</p>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  value={userData.firstName}
                  disabled
                />
              </label>
              <label className="form-control max-w-xl my-4 join-item">
                <p className="my-2"> Last Name</p>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  value={userData.lastName}
                  disabled
                />
              </label>
              <label className="form-control max-w-xl my-4 join-item">
                <p className="my-2"> Date of Birth</p>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  value={userData.dob.toUTCString().slice(0, -12)}
                  disabled
                />
              </label>
              <label className="form-control max-w-xl my-4 join-item">
                <p className="my-2"> Physical Address</p>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  value={userData.townAddress}
                  disabled
                />
              </label>

              <label className="form-control max-w-xl my-4 join-item">
                <p className="my-2"> Phone Number</p>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  value={userData.phoneNumber}
                  disabled
                />
              </label>

              <label className="form-control max-w-xl my-4 join-item">
                <p className="my-2"> Email Address</p>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  value={userData.emailAddress}
                  disabled
                />
              </label>

              <label className="form-control max-w-xl my-4 join-item">
                <p className="my-2"> Organization Email</p>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  value={userData.emailAddress}
                  disabled
                />
                <p className="text-md">
                  {" "}
                  This email will be used to access your workflows in your
                  Organization{" "}
                </p>
              </label>

              <p className="text-lg mt-4">
                Add a Password to Access your Workflow
              </p>
              <label className="form-control max-w-xl my-4 join-item">
                <p className="my-2"> Organization Email</p>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  {...register("password")}
                />
                <p className="text-sm text-error">
                  {" "}
                  {errors.password?.message}{" "}
                </p>
              </label>
              <label className="form-control max-w-xl my-4 join-item">
                <p className="my-2"> Organization Email</p>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("confirmPassword")}
                  onBlur={() => trigger("confirmPassword")}
                />
                <p className="text-sm text-error">
                  {" "}
                  {errors.confirmPassword?.message}{" "}
                </p>
              </label>

              <label className="flex cursor-pointer">
                <span className="label-text me-4 mb-4">Show Passwords</span>
                <input
                  type="checkbox"
                  checked={showPassword}
                  className="checkbox"
                  onChange={() => setShowPassword(!showPassword)}
                />
              </label>
              <button className="btn btn-success mb-10 mt-2" type="submit">
                {" "}
                Validate your account
              </button>
            </div>
          </form>
        ) : (
          <p className="text-error">
            {" "}
            The resource you have requested does not exist{" "}
          </p>
        )}
      </div>
    );
  } catch {
    return (
      <h1 className="mt-10 text-error text-center justify-center">
        Error!! Invalid Request
      </h1>
    );
  }
}
