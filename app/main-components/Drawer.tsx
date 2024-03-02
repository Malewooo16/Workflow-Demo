"use client"

import Link from "next/link"
import { IoMdMenu } from "react-icons/io";

export default function Drawer (){
    return(
        <div className="drawer lg:hidden">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn "><IoMdMenu /></label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <h1 className="text-lg my-2"> Elegance </h1>
      <li> <Link href={`/dashboard`} onClick={() => {document.getElementById("my-drawer")?.click()}}>Dashboard</Link> </li>
      <li> <Link href={`/workflows`} onClick={() => {document.getElementById("my-drawer")?.click()}}>Workflows</Link> </li>
      <li> <Link href={`/analytics`} onClick={() => {document.getElementById("my-drawer")?.click()}}>Analytics</Link> </li>
      <li> <Link href={`/calender`} onClick={() => {document.getElementById("my-drawer")?.click()}}>Calender</Link> </li>
      <li> <Link href={`/teams`} onClick={() => {document.getElementById("my-drawer")?.click()}}>Teams</Link> </li>
      
    </ul>
  </div>
</div>
    )
}