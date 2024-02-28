
import { BsThreeDots } from 'react-icons/bs'
import ThemeProvider from './ThemeProvider'
import SignOut from './SignOut'


export default async function Navbar() {
  

  return (
    <div className="navbar bg-base-100 ">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Elegance  </a>
  </div>
  <div className="flex-none">
  <div className="dropdown">
  <label tabIndex={0} className="btn bg-transparent border-0 text-2xl"> <BsThreeDots/> </label>
  <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-52 -ms-24 ">
    <li><a> Profile</a></li>
    <li><div className="divider my-0 hover:bg-transparent"></div></li>
    <li> <SignOut/> </li>
  </ul>
</div>
  </div>
  <div className="flex-none">
  <ThemeProvider/>
  </div>
</div>
  )
}
