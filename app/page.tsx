import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="bg-slate-50 h-screen">
      <Header />

      <main className="bg-white container mx-auto py-7 shadow">
        <div>
          <h1 className="text-4xl text-center font-semibold  my-7 font-mono">
            {/* <span className="text-emerald-500">{user.displayName}</span> */}
            <span>, Welcome to your Dashboard</span>
          </h1>
        </div>

        <div className="container mx-auto h-1/2 place-items-center
                    grid gap-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {/* {options.map((option, i) => (
            <NavLink
              to={option.name.toLowerCase()}
              icon={option.icon}
              key={i}
            />
          ))} */}
        </div>
      </main>
    </div>
  );
}
