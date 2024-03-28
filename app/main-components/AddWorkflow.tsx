"use client"

import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import React, { useState, ChangeEvent } from 'react';
import { useRouter } from "next/navigation";
import { addNewWorkflowB2Test } from "@/app/actions/testActions/workflowB2Test";
import {useDispatch, useSelector} from "react-redux"
import { setValue } from "@/store/cartSlice";
import FileUploadModal from "@/app/main-components/FileUploadModal";
import toB2Test from "@/app/actions/testActions/toB2Test";
import ServerBtn from "@/app/main-components/ServerBtn";
import AgendaTracker from "./AgendaAdder";

interface Agenda {
  title: string;
  startTime: string;
  endTime: string;
}

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
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [newAgenda, setNewAgenda] = useState<Agenda>({
    title: '',
    startTime: '',
    endTime: '',
  });

  const validationSchema = Yup.object().shape({
    workflowTitle: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    deadline: Yup.string().required('Deadline is required'),
    with: Yup.string().required('Collaborators are required'),
  
  });


  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
  

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setNewAgenda((prevAgenda) => ({
      ...prevAgenda,
      [name]: value,
    }));
  };

  const handleAddAgenda = (): void => {
    if (newAgenda.title && newAgenda.startTime && newAgenda.endTime) {
      setAgendas((prevAgendas) => [...prevAgendas, newAgenda]);
      setNewAgenda({
        title: '',
        startTime: '',
        endTime: '',
      });
    } else {
      alert('Please fill in all fields');
    }
  };


  async function createNewWorkflowTestB2(formData: { workflowTitle: string; description: string; deadline: string; with: string;}){
    
    
    try{
      setIsLoading(true)
      const result = await addNewWorkflowB2Test(formData , agendas);

    if(result.success == true){
      setError(false)
      setIsLoading(false)
       const workflowId = result.workflowId;
       dispatch(setValue(workflowId))
        reset()
        window.scrollTo({ top: 10, behavior: 'smooth'});
        setModal(true);
        
    }
    else if (result.success==false){
      setIsLoading(false)
      setError(true)
      setErrorMesssage(result.error)
      window.scrollTo({ top: 10, behavior: 'smooth' });
    }
  }

  catch(error){
    setIsLoading(false)
    setErrorMesssage(error)
  }
    }

    async function uploadFiles(formData : FormData){
      
      const uploadResponse = await toB2Test(formData, workflowIdValue);

     try{
      if(uploadResponse?.success === true){
        setSuccess(true)
        setTimeout(()=>{
          setModal(false);
          //router.push("/workflows",{scroll:false});
        }, 1500)
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

<div className="max-w-2xl mb-6 mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Agendas for the Workflow</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Title:</label>
        <input
          type="text"
          name="title"
          value={newAgenda.title}
          onChange={handleInputChange}
          className="border rounded py-2 px-3 w-full"
        />
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <label className="block text-gray-700">Start Time:</label>
        <input
          type="datetime-local"  
          min={new Date().toISOString().slice(0,16)} 
          name="startTime"
          value={newAgenda.startTime}
          onChange={handleInputChange}
          className="border rounded py-2 px-3"
        />

        <label className="block text-gray-700">End Time:</label>
        <input
         type="datetime-local" 
         min={new Date().toISOString().slice(0,16)} 
          name="endTime"
          value={newAgenda.endTime}
          onChange={handleInputChange}
          className="border rounded py-2 px-3"
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleAddAgenda}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Agenda
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Agendas:</h3>
        <ul>
          {agendas.length>0 ? agendas.map((agenda, index) => (
            <li key={index} className="mb-2">
            {agenda.title} - {agenda.startTime} to {agenda.endTime}
          </li>
          )) : <li>No Agendas added!!!</li> }
        </ul>
      </div>
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
    <input type="file" className="file-input file-input-bordered w-full max-w-xs" name='related-files' required />
  </label>
 
      <ServerBtn/>
        </form>
           </div>
         </FileUploadModal>
         
  
    </div>

  )
}

