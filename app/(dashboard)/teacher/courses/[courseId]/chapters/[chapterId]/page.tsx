import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const ChapterIdPage = async({params}:{params:{courseId: string, chapterId: string}}) => {
    console.log(params.chapterId) // Msla yaha par tha chapterId jo hum yaha get krhay hai usi same name ka folder hona chayay: e.g [chapterId]. Is wja se hum ko ChapterId nhi mil parha tha aur bug arha tha
    console.log(params.courseId)
    const {userId} = auth(); 
    if(!userId){
        return redirect('/');
    }
    const chapter = await db.chapter.findUnique({
        where:{
            id: params.chapterId,
            courseId: params.courseId
        }, 
        include:{
            muxData: true
        },
    })
  if (!chapter) {
    return redirect("/")
  }
  return (
    <div>ChapterIdPage</div>
  )
}

export default ChapterIdPage