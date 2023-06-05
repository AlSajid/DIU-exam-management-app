import Link from "next/link";

export default function Header() {
    return (
        <Link href="/">
        <div className="bg-slate-700 w-full text-white text-3xl p-3 shadow py-5 sticky top-0">
          <h1 className="font-serif">DIU Exam Management System</h1>
{/*   
          {
            user &&
  
            <div className="bg-transparent hover:bg-slate-50 h-20 fixed right-0 top-0 hover:left-0 hover:text-red-500">
              <FaPowerOff
                className="m-7 float-right"
                title="Logout"
                onClick={logout}
              />
            </div>
          } */}
        </div>
      </Link>
    )
}