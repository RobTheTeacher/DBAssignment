import { getSinglePost } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import EditPageForm from "./form"

const EditPostPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await getSinglePost(slug)
    if (user && data && user.id !== data.author.id)
        redirect("/")

    return (
        <>
            {data &&
                <div className="border-sushi border p-4 rounded-2xl mt-8 max-w-md m-auto">
                    <h1 className="heading">Edit: {data.title}</h1>
                    <EditPageForm initialValues={ {title: data.title, content: data.content, image: data.image}} postId={data.id} />
                </div>
            }
        </>
    )
}

export default EditPostPage