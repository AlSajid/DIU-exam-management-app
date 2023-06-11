import {NextResponse} from "next/server";
import {JSDOM} from "jsdom";
import errorHandler from "@/utils/errorHandler";

export const GET = async (request: Request) => {
	const {searchParams} = new URL(request.url);
	const url = searchParams.get("url") || "";

	try {
		const html = await fetch(url);
		const body = await html.text();
		const dom = new JSDOM(body);

		const info = {
			name: dom.window.document.querySelectorAll(".profile-row-right")[0].innerHTML,
			employeeID: dom.window.document.querySelectorAll(".profile-row-right")[1].innerHTML,
			designation: dom.window.document.querySelectorAll(".profile-row-right")[2].innerHTML,
			department: dom.window.document.querySelectorAll(".profile-row-right")[3].innerHTML,
			email: dom.window.document.querySelectorAll(".profile-row-right")[6].innerHTML,
			phone: dom.window.document.querySelectorAll(".profile-row-right")[8].innerHTML
		};

		return NextResponse.json(info);
	} catch (error: any) {
		const message = errorHandler(error);
		return NextResponse.json({message}, {status: 500});
	}
};
