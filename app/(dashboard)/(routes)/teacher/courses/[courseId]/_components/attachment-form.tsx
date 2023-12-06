// I THINK ERROR ISME HAI USKE ILAWA ROTES.TS MAIN  BH CHECK KR LENA PLEASEEEEEE
//  SRF ERROR KA CODE THEEK KRKE PUSH KR DENA TAAKE AAGE SE KAMA MAIN WAPIS SE START KR LO 


"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & {attachments: Attachment[] };
  courseId: string;
};

const formSchema = z.object({
url: z.string().min(1),
});

const ImageForm = ({
  initialData,
  courseId
}: AttachmentFormProps) => {
  
  
  
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing &&  (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an File
            </>
          )}

        </Button>
      </div>
      {!isEditing && (
<>
{initialData.attachments.length === 0 && (
  <p className="text-sm mt-2 text-slate-500 italic">
    No attechments yet
  </p>
)}
</>
)}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
         Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageForm