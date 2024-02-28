import Link from 'next/link'


export default function page() {
  return (

    <div className="flex items-center justify-center h-screen bg-green-50">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Authentication Successful!</h1>
      <p className="text-gray-700 mb-4">
        Welcome back! You have successfully authenticated. Feel free to explore your account.
      </p>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        
      >
       <Link href={"/"}>Login</Link>
      </button>
    </div>
  </div>
  )
}
