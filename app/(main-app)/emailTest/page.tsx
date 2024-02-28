"use client"
import sendEmail from '@/app/actions/testActions/validateEmail'
import React from 'react'

export default function page() {
  return (
    <div className='mx-auto w-[350px]'>
      <p className='text-lg font-bold my-6'>Testing Emailjs</p>
      <button className="btn btn-info mx-auto" onClick={()=> console.log("Sent")} >Send Email</button>
    </div>
  )
}
