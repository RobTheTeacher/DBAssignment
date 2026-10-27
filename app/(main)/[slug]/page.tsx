import { getPostComments, getSinglePost } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"
import DeleteButton from "./deleteButton"
import Link from "next/link"
import Comments from "./comments"
import AddComment from "./addComment"

const PostPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await getSinglePost(slug)
    const isAuthor: boolean = user && data && user.id === data.author.id ? true : false

    return (
        <div className="pb-10">
            {data &&
               <> <div className="border-sushi border p-4 rounded-2xl mt-8 max-w-md m-auto">
                    <h1 className="heading">{data.title}</h1>
                    {data.image && <img src={data.image} alt={data.title} />}
                    {data.content && <p>{data.content}</p>}
                    <p className="text-right">Created by {data.author.username}</p>
                    {isAuthor &&
                        <div className="flex justify-between">
                            <DeleteButton id={data.id} />
                            <Link className="button-secondary" href={`/${slug}/edit`}>Edit Post</Link>
                        </div>
                    }
                </div>
                <Comments postid={data.id} isAuthor={isAuthor} userId={user ? user.id : null} />
              </> 
            }
             {user && <AddComment postId={data!.id} />}
                
        </div>
    )
}

export default PostPage