import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect} from "next/navigation"

import { IconBadge } from "@/components/icon-badge"
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react"

import { TitleForm } from "./_components/title-form"
import { DescriptionForm } from "./_components/description-form"

import ImageForm from "./_components/image-form"
import { CategoryForm } from "./_components/categoryform"
import { PriceForm } from "./_components/priceform"

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string }
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    }
  });
  const category = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });
  
  if (!course) {
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

  return (
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
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">
              Costmize your course
            </h2>
          </div>

          <TitleForm
            initialData={course}
            courseId={course.id}
          />
          <DescriptionForm
            initialData={course}
            courseId={course.id}
          />
        
          <ImageForm
            initialData={course}
            courseId={course.id}
          />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={category.map((category) => ({
              value: category.id,
              label: category.name
            }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-3">
              <IconBadge icon={ListChecks} />
              <h2>Course Chapeter</h2>
            </div>
            <div>
              TODO: Chapters
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2>Sell your Course</h2>
            </div>
          </div>
          <PriceForm initialData={course} courseId={course.id}/>
        </div>
      </div>
    </div>
  )
}

export default CourseIdPage;