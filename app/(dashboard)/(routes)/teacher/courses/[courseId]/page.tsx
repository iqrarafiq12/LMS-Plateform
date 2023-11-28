import { auth } from "@clerk/nextjs"
import {redirect} from "next/navigation"

import { db } from "@/lib/db"
import { IconBadge } from "@/components/icon-badge"
import { LayoutDashboard } from "lucide-react"


const CourseIdPage = async ({
  params
}: {
  params: { courseId: string}
}) => {

  const { userId } = auth();
if (!userId){
  return redirect("/");
}

const course = await db.course.findUnique({
  where: {
    id: params.courseId
  }
});
if(!course) {
  return redirect("/");
}

// ARRAY FOR REQUIRED FIELD
const requiredFields = [
  course.title,
  course.description,
  course.imageUrl,
  course.price,
  course.categoryId
];

const totalFields = requiredFields.length;
const completedField = requiredFields.filter(Boolean).length;

const completionText = `(${completedField}/${totalFields})`

  return(
    <div className="p-6">
      <div className="flex items-center justify-between">
<div className="flex flex-col gap-y-2">
  <h1 className="text-2xl font-medium">Course Setup</h1>
  <span className="text-sm text-slate-500">complete all field {completionText}</span>
</div>
      </div>
      {/* 2ND DIV */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
  <div>
    <div className="flex items-center gap-x-2">
      <IconBadge  icon={LayoutDashboard} />
<h2 className="text-xl">
  Costmize your course
</h2>
    </div>
  </div>
 </div>
    </div>
  )
}

export default CourseIdPage;