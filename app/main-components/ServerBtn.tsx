
import {
  useFormStatus
} from "react-dom";

export default function ServerBtn() {
  const {pending} = useFormStatus()
  return (
    <>
  { !pending ? <button className="btn btn-success" type="submit"> Upload </button> : <button className="btn btn-success" > <span className="loading loading-bars loading-sm"></span> </button>  }
    </>
  )
}
