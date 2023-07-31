import getSections from "./getSections";

export const GET = async (request: Request, {params}: {params: {id: string}}) => {
   const id = params.id;
   return await getSections(id);
};
