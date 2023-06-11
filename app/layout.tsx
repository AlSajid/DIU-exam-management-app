import "./globals.css";
import {Open_Sans} from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import ContextProvider from "@/contexts/ContextProvider";
import {Toaster} from "react-hot-toast";

const font = Open_Sans({
	weight: ["300", "400", "500", "600", "700", "800"],
	subsets: ["latin"],
	display: "swap"
});

export const metadata = {
	title: "DIU Exam Management System"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<body className={"bg-slate-100 " + font.className}>
				<div className="text-xl font-semibold">
					<Toaster
						position="top-right"
						reverseOrder={true}
					/>
				</div>
				<ContextProvider>
					<div className="flex justify-between h-screen w-full">
						<Navigation />
						<div className="grow">{children}</div>
					</div>
				</ContextProvider>
				<div className="md:invisible visible flex items-center text-center text-white justify-center font-serif text-3xl flex-col bg-red-400 h-full w-full fixed top-0 right-0 bottom-0 left-0">
					<h1 className="text-9xl">Sorry!</h1> <br />
					<h2>this site is only accessible from Tablet/PC</h2>
				</div>
			</body>
		</html>
	);
}
