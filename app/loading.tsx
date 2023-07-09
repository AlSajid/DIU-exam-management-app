import Image from "next/image";
import logo from "@/public/logo.png";
import Loader from "@/components/Loader";

export default function Loading() {
	return (
		<div className="flex justify-center items-center flex-col h-full">
			<Image src={logo} alt="logo" />
			<Loader msg="Rendering" />
		</div>
	);
}
