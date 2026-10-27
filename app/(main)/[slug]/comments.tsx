import { CommentsType, getPostComments } from "@/lib/supabase/queries";
import DeleteComment from "./deleteComment";

const Comments = async ({ postid, isAuthor, userId }: { postid: string, isAuthor: boolean, userId: string | null }) => {
    const comments = await getPostComments(postid)

    return (
        <div className="border-sushi border p-4 rounded-2xl mt-8 max-w-md m-auto">
            {comments && comments.length ? comments.map(comment => (
                <div key={comment.id} className="border-sushi border p-4 rounded-2xl mt-8 max-w-md m-auto">
                    <p>{comment.content}</p>
                    <p className="text-right">by {comment.userid.username}</p>
                    {(isAuthor || (userId === comment.userid.id )) && <DeleteComment commentId={comment.id} /> }
                </div>
            ))
                : <h2 className="font-bold">Start the conversation</h2>}
        </div>
    )
}

export default Comments