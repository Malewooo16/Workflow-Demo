import Link from 'next/link'


export default function ValidateSuccess() {
  return (
    <div>
        <div className="flex items-center justify-center h-screen">
    <div className="bg-base-200 p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Authentication Successful!</h1>
      <p className="text-gray-700 mb-4">
        Welcome back! You have successfully authenticated. Feel free to explore your account.
      </p>
      <button
        className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 text-lg font-bold"
        
      >
       <Link href={"/"}>Login</Link>
      </button>
    </div>
  </div>
    </div>
  )
}
