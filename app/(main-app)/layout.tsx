import Link from "next/link";
import Navbar from "../main-components/Navbar";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import RedirectToLogin from "../main-components/RedirectToLogin";
import ThemeProvider from "../main-components/ThemeProvider";
import LoginForm from "../main-components/LoginForm";
import { authOptions } from "@/utilities/authOptions";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  //console.log(session?.user)

  if (session?.user) {
    return (
      <section className=" mt-2">
        <div className="sticky top-0 z-20">
          <Navbar />
        </div>
        <div className="flex ">
          <div>
            <ul className="hidden lg:flex menu  w-48 rounded-box sticky top-14 ms-1 ">
              <li>
                {" "}
                <Link href={`/dashboard`} className="mb-3">
                  {" "}
                  Dashboard{" "}
                </Link>{" "}
              </li>
              <li>
                <Link href={`/workflows`} className="mb-3">
                  {" "}
                  Workflows{" "}
                </Link>{" "}
              </li>
              <li>
                <Link href={`/analytics`} className="mb-3">
                  {" "}
                  Analytics{" "}
                </Link>{" "}
              </li>
              <li>
                <Link href={`/calender`} className="mb-3">
                  {" "}
                  Calender{" "}
                </Link>{" "}
              </li>

              
              <li>
                <Link href={`/teams`} className="mb-3">
                  {" "}
                  Teams{" "}
                </Link>{" "}
              </li>
              {session.user.role === "super admin" && 
                <div className="flex flex-col justify-end mt-20">
                  <h2 className="text-lg">Admin Actions</h2>
                 <li> <Link href={`/fileuploadTest/moreTests`}> Add Users </Link></li>
                </div>
                
                }
            </ul>
          </div>
          <div className="flex-1 mx-4">{children}</div>
          {/* <div>
            {" "}
            <div className="hidden sticky top-14 lg:flex flex-col p-4 me-4 w-52 hover:bg-neutral">
              <p className="text-lg ">Right Sidebar</p>
              <p> Another sidebar </p>
            </div>
          </div> */}
        </div>
      </section>
    );
  } else {
    return (
      <main className="flex flex-col  ">
        <div className="flex justify-end w-full">
          <ThemeProvider />
        </div>
        <h1 className="text-center text-lg text-error">
          {" "}
          Error!! Login to Gain acesss{" "}
        </h1>
        <div className="flex justify-center h-[90vh]  items-center">
          <LoginForm />
        </div>
      </main>
    );
  }
}
