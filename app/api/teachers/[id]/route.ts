import Teacher from "@/db/models/teachers";
import getData from "@/db/utils/getData";

export const GET = async (request: Request, {params}: {params: {id: string}}) => {
	const id = params.id;
	return await getData(Teacher, {_id: id});
};
