"use client"

import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addNewWorkflowB2Test } from "@/app/actions/testActions/workflowB2Test";
import {useDispatch, useSelector} from "react-redux"
import { setValue } from "@/store/cartSlice";
import FileUploadModal from "@/app/main-components/FileUploadModal";
import toB2Test from "@/app/actions/testActions/toB2Test";
import ServerBtn from "@/app/main-components/ServerBtn";



export default  function AddWorkflow() {
  const [error,setError] = useState(false);
  const [success,setSuccess] = useState(false);
  const [showModal, setModal] = useState(false)
  const [errorMessage,setErrorMesssage] = useState <any>('');
  const [isLoading, setIsLoading] = useState(false)
  const [file , setFile] = useState <File | null> (null);
  const router = useRouter();
  const dispatch = useDispatch();
  const workflowIdValue = useSelector((state: any) => state.cart.value) as string;


  const validationSchema = Yup.object().shape({
    workflowTitle: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    deadline: Yup.string().required('Deadline is required'),
    with: Yup.string().required('Collaborators are required'),
  
  });


  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
  async function createNewWorkflowTestB2(formData: { workflowTitle: string; description: string; deadline: string; with: string; }){
    
    
  //   try{
  //     setIsLoading(true)
  //     /// Will Update the test function
  //     const result = true;

  //   if(result.success == true){
  //     setError(false)
  //     setIsLoading(false)
  //      const workflowId = result.workflowId;
  //      dispatch(setValue(workflowId))
  //       reset()
  //       window.scrollTo({ top: 10, behavior: 'smooth'});
  //       setModal(true);
        
  //   }
  //   else if (result.success==false){
  //     setIsLoading(false)
  //     setError(true)
  //     setErrorMesssage(result.error)
  //     window.scrollTo({ top: 10, behavior: 'smooth' });
  //   }
  // }

  // catch(error){
  //   setIsLoading(false)
  //   setErrorMesssage(error)
  // }
    }

    async function uploadFiles(formData : FormData){
      
      const uploadResponse = await toB2Test(formData, workflowIdValue);

     try{
      if(uploadResponse?.success === true){
        setSuccess(true)
        setTimeout(()=>{
          setModal(false);
          router.push("/workflows",{scroll:false});
        }, 1000)
      }

     }
     catch(err){
       setErrorMesssage(err)
     }
    }
  
  return (
    <div className ={`my-3 mx-8  sm:mx-4 flex-1 max-w-xl `}>
        
        
        <form onSubmit={handleSubmit(createNewWorkflowTestB2)}>
        
<h1 className="text-2xl"> Create Workflow </h1>
{error && <div role="alert" className="alert alert-error max-w-xl">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span> {errorMessage} </span>
</div>}
        <div className="join join-vertical flex max-w-xl">
        <label className='form-control  my-4 join-item'>
           <p className="my-2"> Title</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full "  {...register("workflowTitle")}/>
       <p className="text-error text-sm"> {errors.workflowTitle?.message} </p>
        </label>
        <label className='form-control  my-4 join-item'>
        <p className="my-2"> Description</p>
        <textarea  placeholder="Type here" className="input input-bordered w-full h-60 " {...register("description")} /> 
        <p className="text-error text-sm"> {errors.description?.message} </p>
        </label>
        <label className='form-control  my-4 join-item'>
        <p className="my-2"> Additionals</p>
        <input type="text" placeholder="Type here" className="input input-bordered w-full " name="additonals" />
        </label>
        <label className='form-control  my-4 join-item'>
        <p className="my-2"> Deadline</p>
        <input type="datetime-local"  min={new Date().toISOString().slice(0,16)} placeholder="Type here" className="input input-bordered w-full "  {...register("deadline")}/>
        <p className="text-error text-sm"> {errors.deadline?.message} </p>
        </label>
        <label className='form-control  my-4 join-item'>
        <p className="my-2"> Collaborators</p>
        <select className="select select-bordered w-full"  {...register("with")}>
        <option value="" selected disabled>Select a collaborator</option>
  <option>Homer</option>
  <option>Marge</option>
  <option>Bart</option>
  <option>Lisa</option>
  <option>Maggie</option>
</select>
<p className="text-error text-sm"> {errors.with?.message} </p>
        </label>
                
</div>
{!isLoading ? <button className="btn btn-success" type="submit"> Create </button> : <button className="btn btn-success" > <span className="loading loading-bars loading-sm"></span> </button>  }
        </form>

         <FileUploadModal isOpen={showModal} onClose={() => setModal(false)}>
          <div>
          {success&& <div role="alert" className="alert alert-success max-w-xl">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span> {`Files Uploaded Successfully`} </span>
</div>}
          <form action={uploadFiles}>
        <p className="text-xl my-4"> Your Workflow has been added! Upload Files related to this workflow </p>
        <label className='form-control max-w-xl my-4 join-item'>
    <p className="my-2"> Upload Files related to the workflow</p>
    <input type="file" className="file-input file-input-bordered w-full max-w-xs" name='related-files' />
  </label>
 
      <ServerBtn/>
        </form>
           </div>
         </FileUploadModal>
         
  
    </div>

  )
}

