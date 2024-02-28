

export default function page({params} :{params:{email:string}}) {
  return (
    <div>
        <h1>{params.email}</h1>
    </div>
  )
}
