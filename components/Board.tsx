export default function Board({
   heading,
   children
}: {
   heading: string;
   children: React.ReactNode;
}) {
   return (
      <div className="flex flex-col gap-3 p-3 h-screen">
         {/* header */}
         <div className="bg-white text-emerald-700 text-3xl font-bold p-3 shadow rounded">
            <h1>{heading}</h1>
         </div>

         <div className="shadow bg-white rounded h-full overflow-auto">{children}</div>
      </div>
   );
}

// {/*
//   {
//     user &&

//     <div className="bg-transparent hover:bg-slate-50 h-20 fixed right-0 top-0 hover:left-0 hover:text-red-500">
//       <FaPowerOff
//         className="m-7 float-right"
//         title="Logout"
//         onClick={logout}
//       />
//       +
//     </div>
//   } */}
