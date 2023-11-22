import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const {userId} = auth()
        const {title} = await req.json()

        if(!title) {
            return new NextResponse("Missing title", { status: 400 })
        }
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const course = await db.course.create({
            data: {
                userId,
                title
            }
        })

        return NextResponse.json(course)
    } catch (err) {
        console.log("[COURSES]",err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}