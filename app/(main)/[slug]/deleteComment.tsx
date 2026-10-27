'use client'
import { DeleteCommentAction } from "@/actions/delete-comment-action"
import { useMutation } from "@tanstack/react-query"

const DeleteComment = ({commentId}:{commentId: string}) => {

const {mutate} = useMutation({
    mutationFn: DeleteCommentAction
})
    return (
        <div onClick={() => mutate(commentId)} className="button-secondary">Delete Comment {commentId}</div>
    )
}

export default DeleteComment