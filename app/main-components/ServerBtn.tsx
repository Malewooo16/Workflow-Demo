
import {useFormStatus} from "react-dom"; //use in dev


//import {experimental_useFormStatus} from "react-dom"; // use in prod

export default function ServerBtn() {
  
  const {pending} = useFormStatus()
  return (
    <>
  { !pending ? <button className="btn btn-success" type="submit"> Upload </button> : <button className="btn btn-success" > <span className="loading loading-bars loading-sm"></span> </button>  }
    </>
  )
}
