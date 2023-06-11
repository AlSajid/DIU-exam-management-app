import connect from "@/db/connect";
import Section from "@/db/models/sections";
import errorHandler from "@/utils/errorHandler";
import {NextResponse} from "next/server";

export const GET = async () => {
	try {
		await connect();
		const sections = await Section.find();
		return NextResponse.json(sections);
	} catch (error:any) {
		const message = errorHandler(error);
		return NextResponse.json({message}, {status: 500});
    }
};


// router.post('/', async function (request, response, next) {
//     const info = request.body;

//     try {
//         const result = await sections.insertOne(info);
//         response.send(result);
//     } catch (error) {
//         response.send(error)
//     }

// });

// router.delete('/:id', async function (request, response, next) {
//     const id = request.params.id;
//     const query = { _id: new mongodb.ObjectId(id) };
//     console.log(query)

//     try {
//         const result = await sections.deleteOne(query);
//         response.send(result);
//     } catch (error) {
//         response.send(error);
//     }

// });

// export default router;
