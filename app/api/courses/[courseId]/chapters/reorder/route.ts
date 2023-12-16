import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PUT(
    req: Request,
    {params}: {params: {courseId: string}}
){
    try {
        const {userId} = auth();
        const {list} = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized Access", {status: 401})
        }

        const ownCourse = await db.course.findUnique({
            where:{
                id:params.courseId,
                userId:userId
            }
        })

        if(!ownCourse){
            return new NextResponse("You didn't create this course", {status: 401})
        }

        for(let item of list){
           await db.chapter.update({
               where:{id:item.id},
               data:{position:item.position}
           }) 
        }
        return new NextResponse("Reordered", {status: 200})
    } catch(err){
        console.error("[REORDER]",err)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}