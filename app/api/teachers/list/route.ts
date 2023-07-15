import {NextResponse} from "next/server";
import {JSDOM} from "jsdom";
import {data} from "autoprefixer";

const getDom: any = async (url: string) => {
   try {
      const html = await fetch(url);
      const body = await html.text();
      const dom = new JSDOM(body);
      return dom;
   } catch (error: any) {
      return false;
   }
};

const getProfile = async (dom: JSDOM) => {
   const data = dom.window.document.querySelectorAll(".profile-row-right");

   const info = {
      name: data[0].innerHTML,
      employeeID: data[1].innerHTML,
      designation: data[2].innerHTML,
      department: data[3].innerHTML,
      profile: data[5].innerHTML,
      email: data[6].innerHTML,
      phone: data[8].innerHTML
   };
   return info;
};

export const GET = async (request: Request) => {
   let serial = 0;
   const teachersProfile = [];
   let dataLength = -1;

   while (dataLength !== 0) {
      let url = `https://faculty.daffodilvarsity.edu.bd/teachers/cse/${serial}`;
      const dom = await getDom(url);

      dataLength = dom.window.document.querySelectorAll(".fox").length;

      if (dom !== false) {
         for (let i = 0; i < dataLength; i++) {
            const link = dom.window.document.querySelectorAll(".fox")[i].href;
            const profileDOM = await getDom(link);
            const profile = await getProfile(profileDOM);
            teachersProfile.push(profile);
            serial++;
         }
      }
   }

   return NextResponse.json(teachersProfile);
};
